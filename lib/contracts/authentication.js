"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServiceType = exports.AuthEventType = void 0;
var AuthEventType;
(function (AuthEventType) {
    AuthEventType["Booted"] = "booted";
    AuthEventType["Booting"] = "booting";
    AuthEventType["Invalidated"] = "invalidated";
    AuthEventType["Refresh"] = "refresh";
})(AuthEventType = exports.AuthEventType || (exports.AuthEventType = {}));
exports.AuthServiceType = Symbol.for('Authentication');
