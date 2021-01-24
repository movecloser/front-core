"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseType = exports.ApiConnectorType = void 0;
exports.ApiConnectorType = Symbol.for('IConnector');
var ResponseType;
(function (ResponseType) {
    ResponseType["Blob"] = "blob";
    ResponseType["Json"] = "json";
})(ResponseType = exports.ResponseType || (exports.ResponseType = {}));
