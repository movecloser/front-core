"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = exports.AppModule = void 0;
function AppModule(registry) {
    return function _AppModule(target) {
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var _this = _super.call(this) || this;
                _this.name = registry.name;
                _this.observers = (registry.hasOwnProperty('observers') &&
                    typeof registry.observers !== 'undefined' &&
                    Array.isArray(registry.observers)) ? registry.observers : [];
                _this.providers = (registry.hasOwnProperty('providers') &&
                    typeof registry.providers !== 'undefined') ? registry.providers : null;
                _this.routes = (registry.hasOwnProperty('routes') &&
                    typeof registry.routes !== 'undefined') ? registry.routes : null;
                _this.state = (registry.hasOwnProperty('state') &&
                    typeof registry.state !== 'undefined') ? registry.state : null;
                return _this;
            }
            return class_1;
        }(target));
    };
}
exports.AppModule = AppModule;
var Module = /** @class */ (function () {
    function Module() {
        this.name = '';
        this.observers = [];
        this.providers = null;
        this.providersAsync = false;
        this.routes = null;
        this.state = null;
    }
    return Module;
}());
exports.Module = Module;
