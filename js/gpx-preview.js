/*
 * GPX Preview and Trimming Functionality
 * Provides elevation chart preview and segment selection for GPX files
 */

// Global variables for GPX preview
var currentGpxData = null;
var currentGpxPoints = [];
var elevationChart = null;

/*
 * Load GPX file for preview when user uploads a file
 */
var loadGpxForPreview = function(fileInput) {
    if (fileInput.files.length === 0) {
        hideGpxPreview();
        return;
    }
    
    var file = fileInput.files[0];
    var reader = new FileReader();
    
    reader.onload = function(e) {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(e.target.result, "text/xml");
        
        if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
            Messages.error("无法解析GPX文件");
            hideGpxPreview();
            return;
        }
        
        parseGpxForPreview(xmlDoc);
    };
    
    reader.readAsText(file);
};

/*
 * Load sample GPX file for preview
 */
var loadSampleGpxForPreview = function() {
    var sampleSelect = document.getElementById('gpxsample');
    var sampleValue = parseInt(sampleSelect.value);
    
    var sampleUrl;
    if (sampleValue === 0) {
        sampleUrl = "gpx/SouthMtn.gpx";
    } else if (sampleValue === 1) {
        sampleUrl = "gpx/VXX.gpx";
    } else {
        hideGpxPreview();
        return;
    }
    
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            if (!req.responseXML) {
                Messages.error("无法加载示例GPX文件");
                hideGpxPreview();
                return;
            }
            parseGpxForPreview(req.responseXML);
        }
    };
    
    req.open('GET', sampleUrl, true);
    req.overrideMimeType("text/xml");
    req.send();
};

/*
 * Parse GPX XML and extract track points for preview
 */
var parseGpxForPreview = function(xmlDoc) {
    var trackPoints = [];
    var tracks = xmlDoc.getElementsByTagName('trk');
    
    if (tracks.length === 0) {
        Messages.error("GPX文件中未找到轨迹数据");
        hideGpxPreview();
        return;
    }
    
    var track = tracks[0]; // Use first track
    var segments = track.getElementsByTagName('trkseg');
    
    if (segments.length === 0) {
        Messages.error("GPX轨迹中未找到轨迹段");
        hideGpxPreview();
        return;
    }
    
    // Extract points from all segments
    for (var s = 0; s < segments.length; s++) {
        var points = segments[s].getElementsByTagName('trkpt');
        
        for (var i = 0; i < points.length; i++) {
            var point = points[i];
            var lat = parseFloat(point.getAttribute('lat'));
            var lon = parseFloat(point.getAttribute('lon'));
            
            var ele = 0;
            var eleNodes = point.getElementsByTagName('ele');
            if (eleNodes.length > 0) {
                ele = parseFloat(eleNodes[0].textContent);
            }
            
            trackPoints.push({
                lat: lat,
                lon: lon,
                ele: ele,
                index: trackPoints.length
            });
        }
    }
    
    if (trackPoints.length < 2) {
        Messages.error("GPX文件中的轨迹点太少");
        hideGpxPreview();
        return;
    }
    
    currentGpxPoints = trackPoints;
    calculateDistances();
    showGpxPreview();
    drawElevationChart();
    updateGpxInfo();
};

/*
 * Calculate cumulative distances between points
 */
var calculateDistances = function() {
    if (currentGpxPoints.length < 2) return;
    
    var totalDistance = 0;
    currentGpxPoints[0].distance = 0;
    
    for (var i = 1; i < currentGpxPoints.length; i++) {
        var prev = currentGpxPoints[i - 1];
        var curr = currentGpxPoints[i];
        
        // Use Vincenty formula for distance calculation
        var segmentDistance = distVincenty(prev.lat, prev.lon, curr.lat, curr.lon);
        totalDistance += segmentDistance;
        curr.distance = totalDistance;
    }
};

/*
 * Show GPX preview section
 */
var showGpxPreview = function() {
    var previewSection = document.getElementById('gpx-preview-section');
    previewSection.style.display = 'block';
    previewSection.open = true;
    
    // Initialize dual range slider after showing the preview
    setTimeout(function() {
        initializeDualRangeSlider();
    }, 100);
};

/*
 * Hide GPX preview section
 */
var hideGpxPreview = function() {
    var previewSection = document.getElementById('gpx-preview-section');
    previewSection.style.display = 'none';
    currentGpxPoints = [];
    currentGpxData = null;
};

/*
 * Draw elevation chart on canvas
 */
var drawElevationChart = function() {
    if (currentGpxPoints.length === 0) return;
    
    var canvas = document.getElementById('elevation-canvas');
    var ctx = canvas.getContext('2d');
    
    // Set canvas size to match display size
    var rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate elevation range
    var minEle = Math.min.apply(Math, currentGpxPoints.map(function(p) { return p.ele; }));
    var maxEle = Math.max.apply(Math, currentGpxPoints.map(function(p) { return p.ele; }));
    var eleRange = maxEle - minEle;
    
    if (eleRange === 0) {
        eleRange = 1; // Avoid division by zero
    }
    
    // Drawing parameters
    var padding = 20;
    var chartWidth = canvas.width - 2 * padding;
    var chartHeight = canvas.height - 2 * padding;
    
    // Draw grid lines
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines (elevation)
    for (var i = 0; i <= 5; i++) {
        var y = padding + (chartHeight * i / 5);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(padding + chartWidth, y);
        ctx.stroke();
    }
    
    // Vertical grid lines (distance)
    for (var i = 0; i <= 10; i++) {
        var x = padding + (chartWidth * i / 10);
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, padding + chartHeight);
        ctx.stroke();
    }
    
    // Draw elevation profile
    ctx.strokeStyle = '#2196F3';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    var totalDistance = currentGpxPoints[currentGpxPoints.length - 1].distance;
    
    for (var i = 0; i < currentGpxPoints.length; i++) {
        var point = currentGpxPoints[i];
        var x = padding + (point.distance / totalDistance) * chartWidth;
        var y = padding + chartHeight - ((point.ele - minEle) / eleRange) * chartHeight;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();
    
    // Draw selection overlay
    drawSelectionOverlay(ctx, padding, chartWidth, chartHeight);
    
    // Draw elevation labels
    ctx.fillStyle = '#666';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'right';
    
    for (var i = 0; i <= 5; i++) {
        var ele = minEle + (eleRange * (5 - i) / 5);
        var y = padding + (chartHeight * i / 5) + 4;
        ctx.fillText(Math.round(ele) + 'm', padding - 5, y);
    }
    
    // Draw distance labels
    ctx.textAlign = 'center';
    for (var i = 0; i <= 5; i++) {
        var dist = (totalDistance / 1000) * (i / 5);
        var x = padding + (chartWidth * i / 5);
        ctx.fillText(dist.toFixed(1) + 'km', x, canvas.height - 5);
    }
};

/*
 * Draw selection overlay on elevation chart
 */
var drawSelectionOverlay = function(ctx, padding, chartWidth, chartHeight) {
    var slider = document.getElementById('range-slider');
    
    if (!slider || !slider.noUiSlider) return;
    
    var values = slider.noUiSlider.get();
    var startPercent = parseFloat(values[0]) / 100;
    var endPercent = parseFloat(values[1]) / 100;
    
    var startX = padding + startPercent * chartWidth;
    var endX = padding + endPercent * chartWidth;
    
    // Draw unselected areas with overlay
    ctx.fillStyle = 'rgba(200, 200, 200, 0.5)';
    
    // Left unselected area
    if (startPercent > 0) {
        ctx.fillRect(padding, padding, startX - padding, chartHeight);
    }
    
    // Right unselected area
    if (endPercent < 1) {
        ctx.fillRect(endX, padding, padding + chartWidth - endX, chartHeight);
    }
    
    // Draw selection boundaries
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 2;
    
    // Start line
    ctx.beginPath();
    ctx.moveTo(startX, padding);
    ctx.lineTo(startX, padding + chartHeight);
    ctx.stroke();
    
    // End line
    ctx.beginPath();
    ctx.moveTo(endX, padding);
    ctx.lineTo(endX, padding + chartHeight);
    ctx.stroke();
};

/*
 * Initialize noUiSlider dual range slider
 */
var initializeDualRangeSlider = function() {
    var slider = document.getElementById('range-slider');
    
    if (!slider || typeof noUiSlider === 'undefined') return;
    
    // Create the slider
    noUiSlider.create(slider, {
        start: [0, 100],
        connect: true,
        range: {
            'min': 0,
            'max': 100
        },
        step: 1,
        format: {
            to: function(value) {
                return Math.round(value);
            },
            from: function(value) {
                return Number(value);
            }
        }
    });
    
    // Update displays when slider changes
    slider.noUiSlider.on('update', function(values, handle) {
        var startPercent = Math.round(values[0]);
        var endPercent = Math.round(values[1]);
        
        // Update percentage displays
        document.getElementById('start-percent').textContent = startPercent + '%';
        document.getElementById('end-percent').textContent = endPercent + '%';
        
        // Update GPX info and redraw chart
        updateGpxInfo();
        drawElevationChart();
    });
};

/*
 * Update GPX information display
 */
var updateGpxInfo = function() {
    if (currentGpxPoints.length === 0) return;
    
    var totalDistance = currentGpxPoints[currentGpxPoints.length - 1].distance;
    var slider = document.getElementById('range-slider');
    
    if (!slider || !slider.noUiSlider) return;
    
    var values = slider.noUiSlider.get();
    var startPercent = parseFloat(values[0]) / 100;
    var endPercent = parseFloat(values[1]) / 100;
    
    var startIndex = Math.floor(startPercent * (currentGpxPoints.length - 1));
    var endIndex = Math.floor(endPercent * (currentGpxPoints.length - 1));
    
    var selectedDistance = currentGpxPoints[endIndex].distance - currentGpxPoints[startIndex].distance;
    
    // Calculate elevation range for selected segment
    var selectedPoints = currentGpxPoints.slice(startIndex, endIndex + 1);
    var minEle = Math.min.apply(Math, selectedPoints.map(function(p) { return p.ele; }));
    var maxEle = Math.max.apply(Math, selectedPoints.map(function(p) { return p.ele; }));
    
    document.getElementById('total-distance').textContent = (totalDistance / 1000).toFixed(2);
    document.getElementById('selected-distance').textContent = (selectedDistance / 1000).toFixed(2);
    document.getElementById('elevation-range').textContent = Math.round(minEle) + ' - ' + Math.round(maxEle);
};

/*
 * Get trimmed GPX points based on slider selection
 */
var getTrimmedGpxPoints = function() {
    if (currentGpxPoints.length === 0) return [];
    
    var slider = document.getElementById('range-slider');
    
    if (!slider || !slider.noUiSlider) return [];
    
    var values = slider.noUiSlider.get();
    var startPercent = parseFloat(values[0]) / 100;
    var endPercent = parseFloat(values[1]) / 100;
    
    var startIndex = Math.floor(startPercent * (currentGpxPoints.length - 1));
    var endIndex = Math.floor(endPercent * (currentGpxPoints.length - 1));
    
    return currentGpxPoints.slice(startIndex, endIndex + 1).map(function(point) {
        return [point.lon, point.lat, point.ele];
    });
};

/*
 * Check if user wants to use trimmed GPX
 */
var shouldUseTrimmedGpx = function() {
    var checkbox = document.getElementById('use-trimmed-gpx');
    return checkbox && checkbox.checked && currentGpxPoints.length > 0;
};
