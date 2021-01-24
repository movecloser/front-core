"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clockStreamFactory = void 0;
var rxjs_1 = require("rxjs");
exports.clockStreamFactory = function () {
    return rxjs_1.interval(1000);
};
