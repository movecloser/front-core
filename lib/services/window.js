"use strict";
/* istanbul ignore file */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WindowService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowService = void 0;
const container_1 = require("../container");
/**
 * Provides window object access and functionalities.
 *
 * @author  Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 1.0.0
 */
let WindowService = WindowService_1 = class WindowService {
    constructor(document) {
        /**
         * Determine if window object is available (Client vs SSR).
         *
         * @var boolean
         */
        this._isDefined = false;
        /**
         * Indicates whether window tab is focused.
         *
         * @var boolean
         */
        this.isActive = true;
        this._document = document;
        if (WindowService_1.isDefined) {
            this._isDefined = true;
            this.registerTabListeners();
        }
    }
    /**
     * Add listener to document object (if defined)
     *
     * @return void
     */
    addEventListener(name, handler, options) {
        if (this._isDefined) {
            window.addEventListener(name, handler, options);
        }
    }
    /**
     * Call method in parent object based on name.
     *
     * @param {String} method
     * @param {Array} params
     * @return any
     */
    call(method, params) {
        if (this._isDefined && Object.prototype.hasOwnProperty.call(window, method)) {
            // @ts-ignore
            return window[method](...params);
        }
        return null;
    }
    /**
     * Return IDocument service.
     *
     * @return IDocument
     */
    get document() {
        return this._document;
    }
    /**
     * Determine if applications runs in web browser.
     *
     * @return boolean
     */
    get isClient() {
        return this._isDefined;
    }
    /**
     * Return pathname from window location.
     */
    static get pathname() {
        return WindowService_1.isDefined ? window.location.pathname : '/';
    }
    /**
     * Return native window object or null
     *
     * @return window | null
     */
    get native() {
        return this._isDefined ? window : null;
    }
    /**
     * Determine if global window object is defined.
     *
     * @return boolean
     */
    static get isDefined() {
        return typeof window !== 'undefined';
    }
    /**
     * Determines whether the website is being viewed on the tablet screen.
     *
     * @return boolean
     */
    get isDesktop() {
        if (this._isDefined) {
            return window.innerWidth >= 992;
        }
        return false;
    }
    /**
     * Determine if applications at mobile device
     *
     * @return boolean
     */
    get isMobile() {
        if (this._isDefined) {
            return window.innerWidth <= 768;
        }
        return false;
    }
    /**
     * Determines whether the website is being viewed on the phone screen.
     *
     * @return boolean
     */
    get isPhone() {
        if (this._isDefined) {
            return window.innerWidth < 768;
        }
        return false;
    }
    /**
     * Determine if applications runs at server.
     *
     * @return boolean
     */
    get isServer() {
        return !this._isDefined;
    }
    /**
     * Determines whether the website is being viewed on the tablet screen.
     *
     * @return boolean
     */
    get isTablet() {
        if (this._isDefined) {
            return window.innerWidth >= 768 && window.innerWidth < 992;
        }
        return false;
    }
    /**
     * Redirects to given url
     *
     * @return void
     */
    redirect(target) {
        if (this.isClient) {
            window.location.href = target;
        }
    }
    /**
     * Register window focus/blur listeners.
     * @private
     */
    registerTabListeners() {
        window.onfocus = () => {
            this.isActive = true;
        };
        window.onblur = () => {
            this.isActive = false;
        };
    }
    /**
     * Removes listener from document object (if defined)
     *
     * @return void
     */
    removeEventListener(name, handler, options) {
        if (this._isDefined) {
            window.removeEventListener(name, handler, options);
        }
    }
    scrollTo(options, y) {
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
    }
};
WindowService = WindowService_1 = __decorate([
    container_1.Injectable()
], WindowService);
exports.WindowService = WindowService;
