"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseType = exports.ApiConnectorFactory = exports.ApiConnectorType = void 0;
exports.ApiConnectorType = Symbol.for('IConnector');
exports.ApiConnectorFactory = Symbol.for('ApiConnectorFactory');
var ResponseType;
(function (ResponseType) {
    ResponseType["Arraybuffer"] = "arraybuffer";
    ResponseType["Blob"] = "blob";
    ResponseType["Document"] = "document";
    ResponseType["Json"] = "json";
    ResponseType["Text"] = "text";
    ResponseType["Stream"] = "stream";
})(ResponseType = exports.ResponseType || (exports.ResponseType = {}));
