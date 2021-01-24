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
exports.Collection = void 0;
/**
 * Collection is an extension of classic Array with some new features and Model awareness.
 *
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
var Collection = /** @class */ (function (_super) {
    __extends(Collection, _super);
    /* istanbul ignore next */
    function Collection(items, meta) {
        var _this = _super.apply(this, items) || this;
        _this._meta = {};
        if (meta) {
            _this.meta = meta;
        }
        Object.setPrototypeOf(_this, Object.create(Collection.prototype));
        return _this;
    }
    Object.defineProperty(Collection.prototype, "meta", {
        /**
         * Meta property getter
         */
        get: function () {
            return this._meta;
        },
        /**
         * Meta property setter
         * @param meta
         */
        set: function (meta) {
            this._meta = meta;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Method to retrieve first element of collection
     */
    Collection.prototype.first = function () {
        if (!this.length) {
            return false;
        }
        return this[0];
    };
    /**
     * Method to retrieve if collection contains specific element
     */
    Collection.prototype.getItem = function (callback) {
        var item = this.find(function (item, index) {
            return callback(item, index);
        });
        return item || false;
    };
    /**
     * Method to check if collection contains specific element
     */
    Collection.prototype.hasItem = function (callback) {
        return !!this.getItem(callback);
    };
    /**
     * Method to check if collection contains any elements
     */
    Collection.prototype.hasItems = function () {
        return this.length > 0;
    };
    /**
     * Method to check if collection contains no elements
     */
    Collection.prototype.isEmpty = function () {
        return this.length === 0;
    };
    /**
     * Method to retrieve last element of collection
     */
    Collection.prototype.last = function () {
        if (!this.length) {
            return false;
        }
        return this[this.length - 1];
    };
    return Collection;
}(Array));
exports.Collection = Collection;
