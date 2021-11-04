"use strict";
/*
 * Copyright (c) 2021 Move Closer
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationEventType = exports.ValidationType = void 0;
exports.ValidationType = Symbol.for('IValidation');
var ValidationEventType;
(function (ValidationEventType) {
    ValidationEventType["Clear"] = "clear";
    ValidationEventType["Error"] = "error";
})(ValidationEventType = exports.ValidationEventType || (exports.ValidationEventType = {}));
