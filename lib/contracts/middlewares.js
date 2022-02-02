"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMiddlewareType = exports.InternalServerErrorMiddlewareType = exports.EventbusMiddlewareType = exports.AuthMiddlewareType = void 0;
exports.AuthMiddlewareType = Symbol.for('AuthMiddleware');
exports.EventbusMiddlewareType = Symbol.for('EventbusMiddleware');
exports.InternalServerErrorMiddlewareType = Symbol.for('InternalServerErrorMiddleware');
exports.ValidationMiddlewareType = Symbol.for('ValidationMiddleware');
