/*
 * Copyright (c) 2021 Move Closer
 */

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractIntention = void 0;
const adapter_1 = require("./adapter");
/**
 * An intention is the inverted Adapter that translate model structure into api data structure.
 *
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
class AbstractIntention {
    constructor(payload) {
        this.payload = payload;
    }
    toModel() {
        return this.payload;
    }
    toRequest() {
        return (0, adapter_1.mapIntention)(this.payload, this.map);
    }
}
exports.AbstractIntention = AbstractIntention;
