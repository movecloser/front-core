"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTime = void 0;
const moment = require("moment");
const container_1 = require("../container");
/**
 * DateTime is service class that parses Date to wanted format
 *
 * @author  Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
let DateTime = class DateTime {
    constructor() {
        moment.locale('pl');
    }
    /**
     * Calculate difference between two dates in sec.
     */
    difference(end, start = '') {
        const startDate = start.length ? moment(start) : moment();
        const endDate = moment(end);
        const duration = moment.duration(endDate.diff(startDate));
        return duration.asSeconds();
    }
    /**
     * Return now in moment.
     */
    get now() {
        return moment();
    }
    /**
     * Return now with given format.
     */
    nowToFormat(format = '') {
        return format.length ? moment().format(format) : moment().format();
    }
    /**
     * Parse date to instance of moment.
     */
    parse(date) {
        return moment(date);
    }
    /**
     * Returns date to specific format.
     */
    parseToFormat(date, format) {
        return moment(date).format(format);
    }
};
DateTime = __decorate([
    container_1.Injectable()
], DateTime);
exports.DateTime = DateTime;
