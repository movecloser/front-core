"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMiddleware = void 0;
var container_1 = require("../../container");
var ValidationMiddleware = /** @class */ (function () {
    /**
     * Class Constructor.
     * @param validationService
     */
    function ValidationMiddleware(validationService) {
        /**
         * Name of form used in given request.
         * @protected
         */
        this.formName = '';
        this.validationService = validationService;
    }
    /**
     * Method to be called after call execution.
     * It handles side effects.
     */
    ValidationMiddleware.prototype.afterCall = function (response) {
        if (response.status === 422) {
            this.validationService.pushErrors(this.formName, response.errors !== null ? response.errors.errors : {});
        }
    };
    /**
     * Method to be called before call execution.
     * It can transform headers and body for a given resource.
     */
    ValidationMiddleware.prototype.beforeCall = function (resource, headers, body) {
        this.formName = resource.shorthand;
        this.validationService.clearForm(this.formName);
        return { headers: headers, body: body };
    };
    ValidationMiddleware = __decorate([
        container_1.Injectable()
    ], ValidationMiddleware);
    return ValidationMiddleware;
}());
exports.ValidationMiddleware = ValidationMiddleware;
