"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTime = void 0;
var moment = require("moment");
var container_1 = require("../container");
/**
 * DateTime is service class that parses Date to wanted format
 *
 * @author  Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
var DateTime = /** @class */ (function () {
    function DateTime() {
        moment.locale('pl');
    }
    /**
     * Calculate difference between two dates in sec.
     */
    DateTime.prototype.difference = function (end, start) {
        if (start === void 0) { start = ''; }
        var startDate = start.length ? moment(start) : moment();
        var endDate = moment(end);
        var duration = moment.duration(endDate.diff(startDate));
        return duration.asSeconds();
    };
    Object.defineProperty(DateTime.prototype, "now", {
        /**
         * Return now in moment.
         */
        get: function () {
            return moment();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Return now with given format.
     */
    DateTime.prototype.nowToFormat = function (format) {
        if (format === void 0) { format = ''; }
        return format.length ? moment().format(format) : moment().format();
    };
    /**
     * Parse date to instance of moment.
     */
    DateTime.prototype.parse = function (date) {
        return moment(date);
    };
    /**
     * Returns date to specific format.
     */
    DateTime.prototype.parseToFormat = function (date, format) {
        return moment(date).format(format);
    };
    DateTime = __decorate([
        container_1.Injectable()
    ], DateTime);
    return DateTime;
}());
exports.DateTime = DateTime;
