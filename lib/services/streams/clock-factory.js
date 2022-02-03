"use strict";
// Copyright (c) 2021 Move Closer
Object.defineProperty(exports, "__esModule", { value: true });
exports.clockStreamFactory = void 0;
const rxjs_1 = require("rxjs");
const clockStreamFactory = function () {
    return (0, rxjs_1.interval)(1000);
};
exports.clockStreamFactory = clockStreamFactory;
