"use strict";
// Copyright (c) 2021 Move Closer
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenDriversMap = void 0;
const contracts_1 = require("../../contracts");
const single_1 = require("./single");
const double_1 = require("./double");
const solid_1 = require("./solid");
exports.tokenDriversMap = {
    [contracts_1.TokenDriver.Single]: single_1.SingleToken,
    [contracts_1.TokenDriver.Double]: double_1.DoubleToken,
    [contracts_1.TokenDriver.Solid]: solid_1.SolidToken
};
