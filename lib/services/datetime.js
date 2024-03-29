"use strict";
// Copyright (c) 2021 Move Closer
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTime = void 0;
const dayjs = require("dayjs");
const container_1 = require("../container");
/**
 * DateTime is service class that parses Date to wanted format
 *
 * @author  Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @author Łukasz Jakubowski <lukasz.jakubowski@movecloser.pl>
 * @version 1.0.0
 */
let DateTime = class DateTime {
    constructor() {
        dayjs.locale('pl');
    }
    /**
     * Calculate difference between two dates in sec.
     */
    difference(end, start = '') {
        const startDate = start.length ? dayjs(start) : dayjs();
        const endDate = dayjs(end);
        return endDate.diff(startDate, 'second');
    }
    /**
     * Return now with given format.
     */
    nowToFormat(format = '') {
        return format.length ? dayjs().format(format) : dayjs().format();
    }
    /**
     * Returns date to specific format.
     */
    parseToFormat(date, format) {
        return dayjs(date).format(format);
    }
};
DateTime = __decorate([
    (0, container_1.Injectable)()
], DateTime);
exports.DateTime = DateTime;
