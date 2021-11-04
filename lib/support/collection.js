"use strict";
/*
 * Copyright (c) 2021 Move Closer
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
/**
 * Collection is an extension of classic Array with some new features and Model awareness.
 *
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
class Collection extends Array {
    /* istanbul ignore next */
    constructor(items, meta) {
        super(0);
        this._meta = {};
        Object.setPrototypeOf(this, Object.create(Collection.prototype));
        if (items) {
            this.push(...items);
        }
        if (meta) {
            this.meta = meta;
        }
    }
    /**
     * Meta property getter
     */
    get meta() {
        return this._meta;
    }
    /**
     * Meta property setter
     * @param meta
     */
    set meta(meta) {
        this._meta = meta;
    }
    /**
     * Method to retrieve first element of collection
     */
    first() {
        if (!this.length) {
            return false;
        }
        return this[0];
    }
    /**
     * Method to retrieve if collection contains specific element
     */
    getItem(callback) {
        const item = this.find((item, index) => {
            return callback(item, index);
        });
        return item || false;
    }
    /**
     * Method to check if collection contains specific element
     */
    hasItem(callback) {
        return !!this.getItem(callback);
    }
    /**
     * Method to check if collection contains any elements
     */
    hasItems() {
        return this.length > 0;
    }
    /**
     * Method to check if collection contains no elements
     */
    isEmpty() {
        return this.length === 0;
    }
    /**
     * Method to retrieve last element of collection
     */
    last() {
        if (!this.length) {
            return false;
        }
        return this[this.length - 1];
    }
}
exports.Collection = Collection;
