"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowService = void 0;
var container_1 = require("../container");
/**
 * Provides window object access and functionalities.
 *
 * @author  Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 1.0.0
 */
var WindowService = /** @class */ (function () {
    function WindowService(document) {
        /**
         * Determine if window object is available (Client vs SSR).
         *
         * @var boolean
         */
        this._isDefined = true;
        this._document = document;
        if (!WindowService_1.isDefined) {
            this._isDefined = false;
        }
    }
    WindowService_1 = WindowService;
    /**
     * Add listener to document object (if defined)
     *
     * @return void
     */
    WindowService.prototype.addEventListener = function (name, handler, options) {
        if (this._isDefined) {
            window.addEventListener(name, handler, options);
        }
    };
    /**
     * Call method in parent object based on name.
     *
     * @param {String} method
     * @param {Array} params
     * @return any
     */
    WindowService.prototype.call = function (method, params) {
        if (this._isDefined && Object.prototype.hasOwnProperty.call(window, method)) {
            // @ts-ignore
            return window[method].apply(window, params);
        }
        return null;
    };
    Object.defineProperty(WindowService.prototype, "document", {
        /**
         * Return IDocument service.
         *
         * @return IDocument
         */
        get: function () {
            return this._document;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WindowService.prototype, "isClient", {
        /**
         * Determine if applications runs in web browser.
         *
         * @return boolean
         */
        get: function () {
            return this._isDefined;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WindowService.prototype, "native", {
        /**
         * Return native window object or null
         *
         * @return window | null
         */
        get: function () {
            return this._isDefined ? window : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WindowService, "isDefined", {
        /**
         * Determine if global window object is defined.
         *
         * @return boolean
         */
        get: function () {
            return typeof window !== 'undefined';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WindowService.prototype, "isDesktop", {
        /**
         * Determines whether the website is being viewed on the tablet screen.
         *
         * @return boolean
         */
        get: function () {
            if (this._isDefined) {
                return window.innerWidth >= 992;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WindowService.prototype, "isMobile", {
        /**
         * Determine if applications at mobile device
         *
         * @return boolean
         */
        get: function () {
            if (this._isDefined) {
                return window.innerWidth <= 768;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WindowService.prototype, "isPhone", {
        /**
         * Determines whether the website is being viewed on the phone screen.
         *
         * @return boolean
         */
        get: function () {
            if (this._isDefined) {
                return window.innerWidth < 768;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WindowService.prototype, "isServer", {
        /**
         * Determine if applications runs at server.
         *
         * @return boolean
         */
        get: function () {
            return !this._isDefined;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WindowService.prototype, "isTablet", {
        /**
         * Determines whether the website is being viewed on the tablet screen.
         *
         * @return boolean
         */
        get: function () {
            if (this._isDefined) {
                return window.innerWidth >= 768 && window.innerWidth < 992;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Redirects to given url
     *
     * @return void
     */
    WindowService.prototype.redirect = function (target) {
        if (this.isClient) {
            window.location.href = target;
        }
    };
    /**
     * Removes listener from document object (if defined)
     *
     * @return void
     */
    WindowService.prototype.removeEventListener = function (name, handler, options) {
        if (this._isDefined) {
            window.removeEventListener(name, handler, options);
        }
    };
    WindowService.prototype.scrollTo = function (options, y) {
        if (this._isDefined) {
            if (typeof options !== 'undefined') {
                if (typeof y === 'number') {
                    window.scrollTo(options, y);
                }
                else {
                    window.scrollTo(options);
                }
            }
        }
    };
    var WindowService_1;
    WindowService = WindowService_1 = __decorate([
        container_1.Injectable()
    ], WindowService);
    return WindowService;
}());
exports.WindowService = WindowService;
