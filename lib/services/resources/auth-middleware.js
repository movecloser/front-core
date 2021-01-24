"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
var container_1 = require("../../container");
var AuthMiddleware = /** @class */ (function () {
    function AuthMiddleware(authService) {
        this.authService = authService;
    }
    /**
     * Method to be called after call execution.
     * It handles side effects.
     */
    AuthMiddleware.prototype.afterCall = function (response) { };
    /**
     * Method to be called before call execution.
     * It can transform headers and body for a given resource.
     */
    AuthMiddleware.prototype.beforeCall = function (resource, headers, body) {
        if (resource.auth || this.authService.check()) {
            headers = __assign(__assign({}, headers), this.authService.getAuthorizationHeader());
        }
        return { headers: headers, body: body };
    };
    AuthMiddleware = __decorate([
        container_1.Injectable()
    ], AuthMiddleware);
    return AuthMiddleware;
}());
exports.AuthMiddleware = AuthMiddleware;
