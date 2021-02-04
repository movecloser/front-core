"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMiddleware = void 0;
const container_1 = require("../../container");
let ValidationMiddleware = class ValidationMiddleware {
    /**
     * Class Constructor.
     * @param validationService
     */
    constructor(validationService) {
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
    afterCall(response) {
        if (response.status === 422 && response.errors !== null) {
            this.validationService.pushErrors(this.formName, typeof response.errors.errors === 'object'
                ? response.errors.errors : {}, typeof response.errors.message === 'string' ? response.errors.message : null);
        }
    }
    /**
     * Method to be called before call execution.
     * It can transform headers and body for a given resource.
     */
    beforeCall(resource, headers, body) {
        this.formName = resource.shorthand;
        this.validationService.clearForm(this.formName);
        return { headers, body };
    }
};
ValidationMiddleware = __decorate([
    container_1.Injectable()
], ValidationMiddleware);
exports.ValidationMiddleware = ValidationMiddleware;
