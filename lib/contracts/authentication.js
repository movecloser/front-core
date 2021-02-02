"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServiceType = exports.AuthEventType = void 0;
var AuthEventType;
(function (AuthEventType) {
    AuthEventType["Authenticated"] = "authenticated";
    AuthEventType["Booted"] = "booted";
    AuthEventType["BootedWithToken"] = "booted_with_token";
    AuthEventType["Booting"] = "booting";
    AuthEventType["Invalidated"] = "invalidated";
    AuthEventType["Refresh"] = "refresh";
})(AuthEventType = exports.AuthEventType || (exports.AuthEventType = {}));
exports.AuthServiceType = Symbol.for('Authentication');
