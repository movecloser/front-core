"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.windowStreamFactory = void 0;
var rxjs_1 = require("rxjs");
exports.windowStreamFactory = function () {
    return rxjs_1.fromEvent(window, 'scroll');
};
