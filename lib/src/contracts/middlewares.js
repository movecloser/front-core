"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMiddlewareType = exports.InternalServerErrorMiddlewareType = exports.EventbusMiddlewareType = exports.AuthMiddleareType = void 0;
exports.AuthMiddleareType = Symbol.for('AuthMiddleware');
exports.EventbusMiddlewareType = Symbol.for('EventbusMiddleware');
exports.InternalServerErrorMiddlewareType = Symbol.for('InternalServerErrorMiddleware');
exports.ValidationMiddlewareType = Symbol.for('ValidationMiddleware');
