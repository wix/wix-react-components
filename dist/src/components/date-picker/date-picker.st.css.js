
Object.defineProperty(exports, "__esModule", { value: true });
require("../../style/project.st.css");
module.exports.default = require("stylable/runtime").create(
    "root",
    "DatePicker2408660667",
    {"input":"DatePicker2408660667--input","icon":"DatePicker2408660667--icon","dropdownArrowWrapper":"DatePicker2408660667--dropdownArrowWrapper","dropdownArrow":"DatePicker2408660667--dropdownArrow","dropdown":"DatePicker2408660667--dropdown","header":"DatePicker2408660667--header","headerDate":"DatePicker2408660667--headerDate","arrowWrapper":"DatePicker2408660667--arrowWrapper","arrowWrapperPrev":"DatePicker2408660667--arrowWrapperPrev","arrowWrapperNext":"DatePicker2408660667--arrowWrapperNext","headerArrow":"DatePicker2408660667--headerArrow","headerArrowNext":"DatePicker2408660667--headerArrowNext","headerArrowPrev":"DatePicker2408660667--headerArrowPrev","calendar":"DatePicker2408660667--calendar","calendarItem":"DatePicker2408660667--calendarItem","dayName":"DatePicker2408660667--dayName","day":"DatePicker2408660667--day","root":"DatePicker2408660667--root","arrowThickness":"0.09em","headerHeight":"60px","dropdownWidth":"330px","dropdownArrowWidth":"11px","dropdownArrowHeight":"12px","iconWidth":"36px"},
    "/* The DatePicker Input */\n.DatePicker2408660667--root .DatePicker2408660667--input {\n    width: 192px;\n}\n\n.DatePicker2408660667--root .DatePicker2408660667--icon {\n    position: relative;\n    left: calc(192px - 36px);\n    top: -36px;\n    padding: 10px;\n    cursor: pointer;\n    width: 36px;\n    height: 36px;\n    fill: #3899EC;\n    border-left: solid 1px #d1d1d1;\n}\n\n.DatePicker2408660667--root .DatePicker2408660667--icon:hover {\n    background-color: rgb(240, 240, 240);\n    outline: solid 1px #d1d1d1;\n    outline-offset: -1px;\n}\n\n/* The dropdown arrow extends from the input and into the calendar view */\n.DatePicker2408660667--root .DatePicker2408660667--dropdownArrowWrapper {\n    /* Switch width to the calendar width to center with regards to the calendar */\n    width: 192px;\n}\n\n.DatePicker2408660667--root .DatePicker2408660667--dropdownArrow {\n    width: 0;\n    height: 0;\n    position: relative;\n    /* Center arrow with regards to the input */\n    left: calc(50% - 11px);\n    border-left: 11px solid transparent;\n    border-right: 11px solid transparent;\n    border-bottom: 12px solid #4990e2;\n}\n\n/* The dropdown contains everything but the input */\n.DatePicker2408660667--root .DatePicker2408660667--dropdown {\n    width: 330px;\n    outline: solid 1px #4990e2;\n}\n\n/* This contains the current month and year as well as the buttons to step between months */\n.DatePicker2408660667--root .DatePicker2408660667--header {\n    width: 100%;\n    height: 60px;\n    background-color: #4990e2;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin: 0;\n}\n\n/* Contains current month and year */\n.DatePicker2408660667--root .DatePicker2408660667--headerDate {\n    display: inline;\n    width: 150px;\n    height: 24px;\n    font-family: Arial;\n    font-size: 16px;\n    line-height: 1.5;\n    text-align: center;\n    color: #ffffff;\n}\n\n/* General styling for the month buttons */\n.DatePicker2408660667--root .DatePicker2408660667--arrowWrapper {\n    height: 100%;\n    width: 20%;\n    line-height: 58px;\n    cursor: pointer;\n}\n\n.DatePicker2408660667--root .DatePicker2408660667--arrowWrapperPrev {\n    text-align: left;\n}\n\n.DatePicker2408660667--root .DatePicker2408660667--arrowWrapperNext {\n    text-align: right;\n}\n\n/* General styles for both the prev and next month buttons */\n.DatePicker2408660667--root .DatePicker2408660667--headerArrow {\n    border: solid #ffffff;\n    border-width: 0 0.09em 0.09em 0;\n    display: inline-block;\n    padding: 0.26em;\n}\n\n/* Next month button */\n.DatePicker2408660667--root .DatePicker2408660667--headerArrowNext {\n    transform: rotate(-45deg);\n    margin-right: 24px;\n}\n\n/* Previous month button */\n.DatePicker2408660667--root .DatePicker2408660667--headerArrowPrev {\n    transform: rotate(135deg);\n    margin-left: 24px;\n}\n\n/* The calendar view contains the days of the month and days of the week */\n.DatePicker2408660667--root .DatePicker2408660667--calendar {\n    display: flex;\n    flex-wrap: wrap;\n    height: calc(100% - 60px);\n    width: 330px;\n    padding: 30px;\n    background-color: white;\n}\n\n/* Each item in the grid gets this style */\n.DatePicker2408660667--root .DatePicker2408660667--calendarItem {\n    /* 100/7 = 14.2857... show 7 items per row */\n    flex: 0 0 14.2857%;\n}\n\n/* Styling for the days of the week */\n.DatePicker2408660667--root .DatePicker2408660667--dayName {\n    font-family: Arial;\n    font-size: 14px;\n    font-weight: bold;\n    line-height: 1.29;\n    text-align: center;\n    color: #000000;\n    width: 36px;\n    height: 36px;\n    cursor: default;\n}\n\n/* Styling for the days of the month */\n.DatePicker2408660667--root .DatePicker2408660667--day {\n    -st-states: focused, selected, current, inactive;\n    font-family: Arial;\n    font-size: 14px;\n    text-align: center;\n    color: #000000;\n    width: 36px;\n    line-height: 36px;\n    cursor: pointer;\n}\n\n/* The current day, i.e. today's date */\n.DatePicker2408660667--root .DatePicker2408660667--day[data-datepicker2408660667-current] {\n    color: #4990e2;\n}\n\n/* The styles for keyboard navigation */\n.DatePicker2408660667--root .DatePicker2408660667--day[data-datepicker2408660667-focused] {\n    outline: solid 1px #5cb4ff;\n    outline-offset: -1px;\n}\n\n/* Styles for the user entered date */\n.DatePicker2408660667--root .DatePicker2408660667--day[data-datepicker2408660667-selected] {\n    color: #ffffff;\n    background-color: #4990e2;\n}\n\n/* Styles for the days of the previous and next month */\n.DatePicker2408660667--root .DatePicker2408660667--day[data-datepicker2408660667-inactive] {\n    color: #d8d8d8;\n    width: 36px;\n    line-height: 36px;\n    cursor: default;\n}\n\n/* Special case for when a user selected a date and then navigates to it using the keyboard */\n.DatePicker2408660667--root .DatePicker2408660667--day[data-datepicker2408660667-focused][data-datepicker2408660667-selected] {\n    color: #ffffff;\n    background-color: #5cb4ff;\n}\n\n/* Hover styles for normal days */\n.DatePicker2408660667--root .DatePicker2408660667--day:hover {\n    color: #000000;\n    background-color: #EDF7FF;\n}\n\n/* Hover styles for the days of the previous and next months */\n.DatePicker2408660667--root .DatePicker2408660667--day[data-datepicker2408660667-inactive]:hover {\n    color: #d8d8d8;\n    background-color: #ffffff;\n}\n\n/* root */\n.DatePicker2408660667--root {\n    display: inline-block;\n}\n",
    module.id
);
