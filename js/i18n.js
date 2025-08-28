/*
 * Internationalization (i18n) module for GPXtruder
 * Supports English (default) and Chinese
 */

var I18n = {
    currentLanguage: 'zh',

    // Translation dictionary
    translations: {
        en: {
            // Page title and main headings
            'page_title': 'GPXtruder: Make 3D-printable elevation models of GPX tracks',
            'step1_title': 'Go for a run or a ride. Record your route with a GPS watch.',
            'step1_info': 'Alternatively, export a route from a site like Strava or MapMyRun. Add elevations with GPS Visualizer.',
            'step2_title': 'Use GPXtruder to convert your route to a 3D elevation map.',
            'step2_info': 'Upload a GPX file. Download an STL file or copy the output code to make a remix of your model.',
            'step3_title': 'Print your route model on a 3D printer. Show off those hills!',
            'step3_info': 'Don\'t have a printer? Check out 3D Hubs to find one near you, or try a service like Shapeways.',
            'project_info': 'GPXtruder is an open source project. Visit the project page for help, examples, and feedback.',

            // Input section
            'input_label': 'Input',
            'upload_gpx': 'Upload GPX:',
            'sample_gpx': 'Sample GPX:',
            'gpx_preview_title': 'GPX Path Preview and Trimming',
            'select_segment': 'Select path segment:',
            'start_point': 'Start',
            'end_point': 'End',
            'total_distance': 'Total distance',
            'selected_distance': 'Selected distance',
            'elevation_range': 'Elevation range',
            'use_trimmed': 'Generate STL from trimmed segment',

            // Options section
            'options_label': 'Options',
            'vertical_exaggeration': 'Vertical exaggeration:',
            'model_style': 'Model style:',
            'style_track': 'Track',
            'style_wall': 'Wall',
            'style_solid': 'Solid',
            'style_topo': 'Topo',
            'smoothing': 'Smoothing:',
            'smoothing_none': 'None',
            'smoothing_light': 'Light',
            'output_label': 'Output',
            'options_label': 'Options',
            'preview_label': 'Preview',
            'code_section': 'Code',

            // 消息
            'file_not_gpx': 'This doesn\'t appear to be a GPX file.',
            'no_tracks': 'This file does not appear to contain any tracks.<br />(Are you sure it is a GPX file?)',
            'using_trimmed': 'Using trimmed GPX path segment',
            'insufficient_points': 'Trimmed path segment has too few points, at least 2 points required',
            'browser_not_supported': 'Your browser does not support the HTML5 FileSystem API. Please try using Chrome.',
            'gpx_info_note': 'GPXtruder only processes the first track in a GPX file.',

            // 验证错误消息
            'error_vertical_exaggeration': 'Vertical exaggeration must be greater than or equal to 1.',
            'error_smoothing_interval': 'Minimum smoothing interval must be greater than or equal to 0.',
            'error_marker_interval': 'Marker interval must be greater than or equal to 1.',
            'error_bed_width': 'Bed width must be greater than or equal to 20.',
            'error_bed_height': 'Bed height must be greater than or equal to 20.',
            'error_path_width': 'Path width must be greater than or equal to 1.',
            'error_default_elevation': 'Default elevation must be greater than 0.',
            'error_base_height': 'Base height must be greater than or equal to 0.',
            'error_invalid_region': 'Invalid region extents.',
            'error_undefined_projection': 'Undefined map projection.',
            'error_no_gpx_selected': 'No GPX file selected.',
            'error_no_track_segments': 'This file does not appear to contain any track segments.<br />(Are you sure it is a valid GPX file?)',
            'error_insufficient_track_points': 'The primary track does not appear to contain enough points.<br />(At least two points are expected.)',
        },

        zh: {
            // 页面标题和主要标题
            'page_title': 'GPXtruder: 将GPX轨迹制作成3D可打印的高程模型',
            'step1_title': '去跑步或骑行，用GPS手表记录你的路线。',
            'step1_info': '或者，从Strava或MapMyRun等网站导出路线。使用GPS Visualizer添加高程数据。',
            'step2_title': '使用GPXtruder将你的路线转换为3D高程地图。',
            'step2_info': '上传GPX文件。下载STL文件或复制输出代码来制作你的模型。',
            'step3_title': '在3D打印机上打印你的路线模型。展示那些山丘！',
            'step3_info': '没有打印机？查看3D Hubs找到附近的打印机，或尝试Shapeways等服务。',
            'project_info': 'GPXtruder是一个开源项目。访问项目页面获取帮助、示例和反馈。',

            // 输入部分
            'input_label': '输入',
            'upload_gpx': '上传GPX:',
            'sample_gpx': '示例GPX:',
            'gpx_preview_title': 'GPX 路径预览和截取',
            'select_segment': '选择路径段：',
            'start_point': '起点',
            'end_point': '终点',
            'total_distance': '总距离',
            'selected_distance': '选中段距离',
            'elevation_range': '海拔范围',
            'use_trimmed': '使用截取的路径段生成STL',
            'trimmed_info': '勾选此选项将只使用滑块选择的路径段来生成3D模型。',

            // 路线选项部分
            'route_section': '路线',
            'vertical_exaggeration': '垂直倍数:',
            'vertical_exaggeration_info': '将垂直高度乘以此因子来增强地形效果。',
            'default_elevation': '默认高程:',
            'default_elevation_info': '对于未定义高程的点使用默认值。勾选"强制默认"将忽略GPX高程值。',
            'force_default': '强制默认:',

            // 模型选项部分
            'model_section': '模型',
            'model_style': '模型样式:',
            'style_track': '轨迹',
            'style_wall': '墙体',
            'style_solid': '实体',
            'style_topo': '等高线',
            'base_height': '基础高度:',
            'base_height_info': '模型底部厚度（毫米）。',
            'track_width': '轨迹宽度:',
            'track_width_info': '轨迹线宽度（毫米）。',
            'wall_height': '墙体高度:',
            'wall_height_info': '轨迹墙体高度（毫米）。',
            'topo_interval': '等高线间隔:',
            'topo_interval_info': '等高线之间的高程间隔（米）。',

            // 平滑选项
            'smoothing_section': '平滑',
            'smoothing': '平滑:',
            'smoothing_none': '无',
            'smoothing_light': '轻度',
            'smoothing_heavy': '重度',
            'smoothing_info': '平滑处理可以减少轨迹中的噪音和尖锐转弯。',

            // 输出部分
            'output_label': '输出',
            'processing': '处理中...',
            'generate_stl': '生成STL',
            'download': '下载',
            'viewer_section': '查看器',
            'code_section': '代码',

            // 消息
            'file_not_gpx': '这似乎不是一个GPX文件。',
            'no_tracks': '此文件似乎不包含任何轨迹。（你确定这是GPX文件吗？）',
            'using_trimmed': '使用截取的GPX路径段',
            'insufficient_points': '截取的路径段点数太少，至少需要2个点',
            'browser_not_supported': '你的浏览器不支持HTML5 FileSystem API。请尝试使用Chrome浏览器。',
            'gpx_info_note': 'GPXtruder只处理GPX文件中的第一条轨迹。',

            // 验证错误消息
            'error_vertical_exaggeration': '垂直夸大系数必须大于或等于1。',
            'error_smoothing_interval': '最小平滑间隔必须大于或等于0。',
            'error_marker_interval': '标记间隔必须大于或等于1。',
            'error_bed_width': '床宽度必须大于或等于20。',
            'error_bed_height': '床高度必须大于或等于20。',
            'error_path_width': '路径宽度必须大于或等于1。',
            'error_default_elevation': '默认海拔必须大于0。',
            'error_base_height': '基础高度必须大于或等于0。',
            'error_invalid_region': '无效的区域范围。',
            'error_undefined_projection': '未定义的地图投影。',
            'error_no_gpx_selected': '未选择GPX文件。',
            'error_no_track_segments': '此文件似乎不包含任何轨迹段。（你确定这是有效的GPX文件吗？）',
            'error_insufficient_track_points': '主轨迹似乎没有包含足够的点。（至少需要两个点。）',

            // 按钮和控件
            'submit_button': '挤出路线',
            'abort_button': '中止',
            'clear_button': '清除',
            'copy_button': '复制',
            'save_button': '保存',
            'extrude_info': '然后点击下面"输出"面板中的"生成STL"来下载3D模型。',
            'parametric_scripts': '参数化CAD脚本',
            'remix_info': '通过修改此代码来重新混合挤出的路线模型。不包含电池。',
            'select_all': '全选',
            'copy_paste_jscad': '，复制并粘贴到',
            'copy_paste_openscad': '，复制并粘贴到',

            // 单位
            'meters': '米',
            'millimeters': '毫米',
            'kilometers': '公里',

            // 额外的翻译
            'clip_elevation': '裁剪到最低海拔',
            'clip_elevation_info': '取消勾选以显示海平面以上的完整高程。如果勾选了"强制默认"则无效果。',
            'smoothing_auto': '自动',
            'smoothing_manual': '手动最小间隔:',
            'smoothing_info_detail': '通过丢弃距离较近的点来简化路线。自动平滑根据模型形状、大小和比例计算间隔。',

            // 模型样式
            'model_style_map': '地图',
            'model_style_linear': '线性',
            'model_style_ring': '环形',
            'model_style_info': '选择"地图"显示实际路线模型。选择"线性"显示直线高程剖面。选择"环形"显示环形高程剖面。',
            'map_projection': '地图投影:',
            'proj_google': 'Google地图',
            'proj_utm': 'UTM',
            'proj_custom': '自定义:',
            'proj_info': '底图仅在Google地图投影下显示。可指定Proj4js支持的自定义投影，格式为PROJ或WKT。',
            'fit_to_region': '适应区域:',
            'south': '南:',
            'west': '西:',
            'north': '北:',
            'east': '东:',
            'region_info': '如果启用，输出将缩放以适应区域到床面。坐标系取决于地图投影。（Google地图使用球面墨卡托米。）',
            'markers': '标记:',
            'marker_none': '无',
            'marker_km': '公里',
            'marker_mi': '英里',
            'marker_other': '其他间隔:',
            'marker_info': '如果启用，将生成表示每个英里或公里标记位置的辅助模型。',

            // 尺寸部分
            'size_section': '尺寸',
            'max_width': '最大宽度 (x):',
            'max_depth': '最大深度 (y):',
            'size_info': '输出将缩放以适应这些尺寸。区域轮廓在底图上显示为黑色边框。',
            'path_width': '路径宽度:',
            'path_width_info': '输出路径的厚度。',
            'base_height_info': '添加到路线模型底部的额外高度。'
        }
    },

    // Get translation for a key
    t: function (key) {
        return this.translations[this.currentLanguage][key] || this.translations['en'][key] || key;
    },

    // Initialize i18n system
    init: function () {
        // Get saved language from localStorage or default to Chinese
        var savedLang = localStorage.getItem('gpxtruder_language');
        this.currentLanguage = savedLang || 'zh';

        // Create language selector
        this.createLanguageSelector();

        // Apply translations
        this.applyTranslations();
    },

    // Create language selector in top-right corner
    createLanguageSelector: function () {
        var selector = document.createElement('div');
        selector.id = 'language-selector';
        selector.style.cssText = 'position: fixed; top: 10px; right: 10px; z-index: 1000; background: white; padding: 5px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);';

        var label = document.createElement('span');
        label.textContent = 'Language: ';
        label.style.fontSize = '12px';

        var select = document.createElement('select');
        select.id = 'language-select';
        select.style.fontSize = '12px';

        var enOption = document.createElement('option');
        enOption.value = 'en';
        enOption.textContent = 'English';

        var zhOption = document.createElement('option');
        zhOption.value = 'zh';
        zhOption.textContent = '中文';

        select.appendChild(enOption);
        select.appendChild(zhOption);
        select.value = this.currentLanguage;

        var self = this;
        select.onchange = function () {
            self.setLanguage(this.value);
        };

        selector.appendChild(label);
        selector.appendChild(select);

        document.body.appendChild(selector);
    },

    // Set language and apply translations
    setLanguage: function (lang) {
        localStorage.setItem('gpxtruder_language', lang);
        this.currentLanguage = lang;
        this.applyTranslations();
    },

    applyTranslations: function () {
        // Update elements with data-i18n attribute
        var elements = document.querySelectorAll('[data-i18n]');
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var key = element.getAttribute('data-i18n');
            if (element.tagName === 'INPUT' && (element.type === 'button' || element.type === 'submit')) {
                element.value = this.t(key);
            } else {
                element.textContent = this.t(key);
            }
        }

        // Update elements with data-i18n-html attribute (for HTML content)
        var htmlElements = document.querySelectorAll('[data-i18n-html]');
        for (var i = 0; i < htmlElements.length; i++) {
            var element = htmlElements[i];
            var key = element.getAttribute('data-i18n-html');
            element.innerHTML = this.t(key);
        }

        // Update placeholders
        var placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        for (var i = 0; i < placeholderElements.length; i++) {
            var element = placeholderElements[i];
            var key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        }
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    I18n.init();
});

// Global function for easy access
function t(key) {
    return I18n.t(key);
}
