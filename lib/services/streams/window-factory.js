/*
 * Copyright (c) 2021 Move Closer
 */

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.windowStreamFactory = void 0;
const rxjs_1 = require("rxjs");
const windowStreamFactory = function () {
    return (0, rxjs_1.fromEvent)(window, 'scroll');
};
exports.windowStreamFactory = windowStreamFactory;
