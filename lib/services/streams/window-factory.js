"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.windowStreamFactory = void 0;
const rxjs_1 = require("rxjs");
const windowStreamFactory = function () {
    return rxjs_1.fromEvent(window, 'scroll');
};
exports.windowStreamFactory = windowStreamFactory;
