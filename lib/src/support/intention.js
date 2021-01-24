"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractIntention = void 0;
var adapter_1 = require("./adapter");
/**
 * An intention is the inverted Adapter that translate model structure into api data structure.
 *
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
var AbstractIntention = /** @class */ (function () {
    function AbstractIntention(payload) {
        this.payload = payload;
    }
    AbstractIntention.prototype.toModel = function () {
        return this.payload;
    };
    AbstractIntention.prototype.toRequest = function () {
        return adapter_1.mapIntention(this.payload, this.map);
    };
    return AbstractIntention;
}());
exports.AbstractIntention = AbstractIntention;
