"use strict";
// Copyright (c) 2021 Move Closer
Object.defineProperty(exports, "__esModule", { value: true });
exports.Methods = exports.HttpConnectorType = void 0;
exports.HttpConnectorType = Symbol.for('IHttpConnector');
var Methods;
(function (Methods) {
    Methods["Delete"] = "delete";
    Methods["Get"] = "get";
    Methods["Patch"] = "patch";
    Methods["Post"] = "post";
    Methods["Put"] = "put";
})(Methods = exports.Methods || (exports.Methods = {}));
