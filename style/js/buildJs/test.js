"use strict";

function getEndTime(endTime) {
    var startDate = new Date();
    var endDate = new Date(endTime);
    var t = endDate.getTime() - startDate.getTime();
    var d = 0;
    h = 0;
    m = 0;
    s = 0;
    if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24);
        h = Math.floor(t / 1000 / 60 / 60 % 24);
        m = Math.floor(t / 1000 / 60 % 60);
        s = Math.floor(t / 1000 % 60);
    }
    return "\u5269\u4F59\u65F6\u95F4" + d + "\u5929" + h + "\u5C0F\u65F6" + m + "\u5206\u949F" + s + "\u79D2\"";
}
console.log([1, 2, 3, 4].find(function (n) {
    return n > 2;
}));