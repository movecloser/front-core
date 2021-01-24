"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentService = void 0;
var container_1 = require("../container");
var window_1 = require("./window");
/**
 * Provides window object access and functionalities.
 *
 * @author  Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 1.0.0
 */
var DocumentService = /** @class */ (function () {
    function DocumentService() {
        /**
         * Determine if window object is available (Client vs SSR).
         *
         * @var boolean
         */
        this._isDefined = true;
        if (!window_1.WindowService.isDefined) {
            this._isDefined = false;
        }
    }
    /**
     * Add listener to document object (if defined)
     *
     * @return void
     */
    DocumentService.prototype.addEventListener = function (name, handler, options) {
        if (this._isDefined) {
            document.addEventListener(name, handler, options);
        }
    };
    /**
     * Call method in parent object based on name.
     *
     * @param {String} method
     * @param {Array} params
     * @return any
     */
    DocumentService.prototype.call = function (method, params) {
        if (this._isDefined) {
            try {
                // @ts-ignore
                return document[method].apply(document, params);
            }
            catch (error) {
                throw new Error(error);
            }
        }
        return null;
    };
    /**
     * Removes listener from document object (if defined)
     *
     * @return void
     */
    DocumentService.prototype.removeEventListener = function (name, handler, options) {
        if (this._isDefined) {
            document.removeEventListener(name, handler, options);
        }
    };
    DocumentService = __decorate([
        container_1.Injectable()
    ], DocumentService);
    return DocumentService;
}());
exports.DocumentService = DocumentService;
