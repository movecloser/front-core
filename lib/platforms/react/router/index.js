"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesModule = exports.RoutesFactory = void 0;
__exportStar(require("./contracts"), exports);
var Factory_1 = require("./Factory");
Object.defineProperty(exports, "RoutesFactory", { enumerable: true, get: function () { return Factory_1.Factory; } });
var Module_1 = require("./Module");
Object.defineProperty(exports, "RoutesModule", { enumerable: true, get: function () { return Module_1.Module; } });
