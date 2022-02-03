"use strict";
// Copyright (c) 2021 Move Closer
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMiddlewareType = exports.InternalServerErrorMiddlewareType = exports.EventbusMiddlewareType = exports.CSRFMiddlewareType = exports.AuthMiddlewareType = void 0;
exports.AuthMiddlewareType = Symbol.for('AuthMiddleware');
exports.CSRFMiddlewareType = Symbol.for('CSRFMiddleware');
exports.EventbusMiddlewareType = Symbol.for('EventbusMiddleware');
exports.InternalServerErrorMiddlewareType = Symbol.for('InternalServerErrorMiddleware');
exports.ValidationMiddlewareType = Symbol.for('ValidationMiddleware');
