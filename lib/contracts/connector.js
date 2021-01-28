"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseType = exports.ApiConnectorFactory = exports.ApiConnectorType = void 0;
exports.ApiConnectorType = Symbol.for('IConnector');
exports.ApiConnectorFactory = Symbol.for('ApiConnectorFactory');
var ResponseType;
(function (ResponseType) {
    ResponseType["Blob"] = "blob";
    ResponseType["Json"] = "json";
})(ResponseType = exports.ResponseType || (exports.ResponseType = {}));
