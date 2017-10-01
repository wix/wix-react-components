
Object.defineProperty(exports, "__esModule", { value: true });
require("../../style/project.st.css");
module.exports.default = require("stylable/runtime").create(
    "root",
    "Slider3214609664",
    {"native-input":"Slider3214609664--native-input","root":"Slider3214609664--root","track":"Slider3214609664--track","progress":"Slider3214609664--progress","handle":"Slider3214609664--handle","markProgress":"Slider3214609664--markProgress","markTrack":"Slider3214609664--markTrack","tooltip":"Slider3214609664--tooltip","colorTrack":"#adbbc6","colorTrack_Hover":"#7d8c98","colorProgress":"#4a90e2","colorProgress_Hover":"#4a90e2","colorHandle":"#ffffff","colorHandle_Hover":"#edf7ff","colorHandle_Active":"#4a90e2","colorHandle_Focus":"rgba(92, 180, 255, 0.5)","colorHandleBorder":"#7d8c98","colorHandle_Disabled":"#f1f1f1","color_Error":"#d0011b","color_Disabled":"#c8c8c8","markSize":"8px","markRadius":"50%","markMiddleOfBar":"-2px","markMiddleOfDot":"-4px","focusSize":"4px","handleSize":"16px","handleWidth":"16px","handleHeight":"16px","handleRadius":"50%","handleBorder":"#7d8c98","handleBorderHover":"#4a90e2","trackSize":"4px","trackRadius":"0px","middleOfBar":"-6px","middleOfHandle":"-8px","minVerticalSliderHeight":"44px","clickableAreaRadius":"15px"},
    ".Slider3214609664--root .Slider3214609664--native-input {\n    position: absolute;\n    opacity: 0;\n    width: 0;\n    height: 0;\n    outline: none;\n}\n\n.Slider3214609664--root {\n    -st-states: active, disabled, error, x, x-reverse, y, y-reverse;\n\n    position: relative;\n    display: inline-block;\n    cursor: pointer;\n    outline: none;\n    user-select: none;\n    pointer-events: inherit;\n    touch-action: none;\n    -webkit-tap-highlight-color: rgba(0,0,0,0);\n    -webkit-touch-callout: none;\n}\n\n.Slider3214609664--root[data-slider3214609664-x] {\n    width: 100%;\n    padding: 15px 0;\n}\n\n.Slider3214609664--root[data-slider3214609664-x-reverse] {\n    width: 100%;\n    padding: 15px 0;\n}\n\n.Slider3214609664--root[data-slider3214609664-y] {\n    min-height: 44px;\n    height: 100%;\n    padding: 0 15px;\n}\n\n.Slider3214609664--root[data-slider3214609664-y-reverse] {\n    min-height: 44px;\n    height: 100%;\n    padding: 0 15px;\n}\n\n.Slider3214609664--root .Slider3214609664--track {\n    position: relative;\n    border-radius: 0px;\n    background-color: #adbbc6;\n}\n\n.Slider3214609664--root[data-slider3214609664-x] .Slider3214609664--track{\n    height: 4px;\n    width: 100%;\n}\n\n.Slider3214609664--root[data-slider3214609664-x-reverse] .Slider3214609664--track{\n    height: 4px;\n    width: 100%;\n}\n\n.Slider3214609664--root[data-slider3214609664-y] .Slider3214609664--track{\n    text-align: left;\n    width: 4px;\n    height: 100%;\n    min-height: 44px;\n}\n\n.Slider3214609664--root[data-slider3214609664-y-reverse] .Slider3214609664--track{\n    text-align: left;\n    width: 4px;\n    height: 100%;\n    min-height: 44px;\n}\n\n.Slider3214609664--root .Slider3214609664--progress {\n    position: absolute;\n    background-color: #4a90e2;\n    border-radius: 0px;\n}\n\n.Slider3214609664--root[data-slider3214609664-x] .Slider3214609664--progress{\n    left: 0;\n    height: inherit;\n}\n\n.Slider3214609664--root[data-slider3214609664-x-reverse] .Slider3214609664--progress{\n    right: 0;\n    height: inherit;\n}\n\n.Slider3214609664--root[data-slider3214609664-y] .Slider3214609664--progress{\n    bottom: 0;\n    width: inherit;\n}\n\n.Slider3214609664--root[data-slider3214609664-y-reverse] .Slider3214609664--progress{\n    top: 0;\n    width: inherit;\n}\n\n.Slider3214609664--root .Slider3214609664--handle {\n    position: absolute;\n    width: 16px;\n    height: 16px;\n    border-radius: 50%;\n    background-color: #ffffff;\n    border: solid 1px;\n    border-color: #7d8c98;\n    box-sizing: border-box;\n    z-index: 1;\n}\n\n.Slider3214609664--root[data-slider3214609664-x] .Slider3214609664--handle{\n    margin: -6px 0 0 -8px;\n}\n\n.Slider3214609664--root[data-slider3214609664-x-reverse] .Slider3214609664--handle{\n    margin: -6px -8px 0px 0px;\n}\n\n.Slider3214609664--root[data-slider3214609664-y] .Slider3214609664--handle{\n    margin: 0px 0px -8px -6px;\n}\n\n.Slider3214609664--root[data-slider3214609664-y-reverse] .Slider3214609664--handle{\n    margin: -8px 0px 0px -6px;\n}\n\n.Slider3214609664--root .Slider3214609664--markProgress,\n.Slider3214609664--root .Slider3214609664--markTrack\n{\n    width: 8px;\n    height: 8px;\n    position: absolute;\n    border-radius: 50%;\n}\n.Slider3214609664--root .Slider3214609664--markProgress{\n    background-color: #4a90e2;\n}\n.Slider3214609664--root .Slider3214609664--markTrack{\n    background-color: #adbbc6;\n}\n\n\n.Slider3214609664--root[data-slider3214609664-x] .Slider3214609664--markProgress,\n.Slider3214609664--root[data-slider3214609664-x] .Slider3214609664--markTrack\n{\n    margin: -2px 0 0 -4px;\n}\n\n.Slider3214609664--root[data-slider3214609664-x-reverse] .Slider3214609664--markProgress,\n.Slider3214609664--root[data-slider3214609664-x-reverse] .Slider3214609664--markTrack\n{\n    margin: -2px -4px 0 0;\n}\n\n.Slider3214609664--root[data-slider3214609664-y] .Slider3214609664--markProgress,\n.Slider3214609664--root[data-slider3214609664-y] .Slider3214609664--markTrack\n{\n    margin: 0 0 -4px -2px;\n}\n\n.Slider3214609664--root[data-slider3214609664-y-reverse] .Slider3214609664--markProgress,\n.Slider3214609664--root[data-slider3214609664-y-reverse] .Slider3214609664--markTrack\n{\n    margin: -4px 0 0 -2px;\n}\n\n.Slider3214609664--root .Slider3214609664--tooltip{\n    position: absolute;\n    text-align: center;\n    left: 50%;\n    bottom: 20px;\n}\n.Slider3214609664--root .Slider3214609664--tooltip > *{\n    display: inline-block;\n    position: relative;\n    left: -50%;\n}\n\n/* Hover state */\n.Slider3214609664--root:hover .Slider3214609664--track {\n    background-color: #7d8c98;\n}\n\n.Slider3214609664--root:hover .Slider3214609664--markTrack {\n    background-color: #7d8c98;\n}\n\n.Slider3214609664--root:hover .Slider3214609664--handle {\n    background-color: #edf7ff;\n    border-color: #4a90e2;\n}\n\n/* Focus state */\n.Slider3214609664--root .Slider3214609664--handle:focus {\n    box-shadow: 0 0 0 4px rgba(92, 180, 255, 0.5);\n    outline: none;\n}\n\n/* Active state */\n.Slider3214609664--root[data-slider3214609664-active] .Slider3214609664--handle,\n.Slider3214609664--root[data-slider3214609664-active]:hover .Slider3214609664--handle {\n    box-shadow: none;\n    background-color: #4a90e2;\n    border-color: #4a90e2;\n}\n\n.Slider3214609664--root[data-slider3214609664-active] .Slider3214609664--track {\n    background-color: #adbbc6;\n}\n\n.Slider3214609664--root[data-slider3214609664-active]:hover .Slider3214609664--track {\n    background-color: #adbbc6;\n}\n\n.Slider3214609664--root[data-slider3214609664-active] .Slider3214609664--markTrack {\n    background-color: #adbbc6;\n}\n\n.Slider3214609664--root[data-slider3214609664-active] .Slider3214609664--progress {\n    background-color: #4a90e2;\n}\n\n/* Disabled state */\n.Slider3214609664--root[data-slider3214609664-disabled] {\n    pointer-events: none;\n    cursor: not-allowed;\n}\n\n.Slider3214609664--root[data-slider3214609664-disabled] .Slider3214609664--handle {\n    border-color: #c8c8c8;\n    background-color: #f1f1f1;\n}\n\n.Slider3214609664--root[data-slider3214609664-disabled] .Slider3214609664--track {\n    background-color: #c8c8c8;\n}\n\n.Slider3214609664--root[data-slider3214609664-disabled] .Slider3214609664--markTrack {\n    background-color: #c8c8c8;\n}\n\n.Slider3214609664--root[data-slider3214609664-disabled] .Slider3214609664--progress {\n    background-color: transparent;\n}\n\n/* Error state */\n.Slider3214609664--root[data-slider3214609664-error] .Slider3214609664--markProgress,\n.Slider3214609664--root[data-slider3214609664-error] .Slider3214609664--progress\n{\n    background-color: #d0011b;\n}\n.Slider3214609664--root[data-slider3214609664-active][data-slider3214609664-error] .Slider3214609664--handle,\n.Slider3214609664--root[data-slider3214609664-active][data-slider3214609664-error]:hover .Slider3214609664--handle {\n    background-color: #d0011b;\n    border-color: #d0011b;\n}\n",
    module.id
);
