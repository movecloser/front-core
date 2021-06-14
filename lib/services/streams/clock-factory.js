"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clockStreamFactory = void 0;
const rxjs_1 = require("rxjs");
const clockStreamFactory = function () {
    return rxjs_1.interval(1000);
};
exports.clockStreamFactory = clockStreamFactory;
