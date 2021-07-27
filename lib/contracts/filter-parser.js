"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterOperator = exports.ConjunctionOperator = void 0;
var ConjunctionOperator;
(function (ConjunctionOperator) {
    ConjunctionOperator["Or"] = "or";
    ConjunctionOperator["And"] = "and";
})(ConjunctionOperator = exports.ConjunctionOperator || (exports.ConjunctionOperator = {}));
var FilterOperator;
(function (FilterOperator) {
    FilterOperator["Equal"] = "eq";
    FilterOperator["GreaterEqual"] = "ge";
    FilterOperator["GreaterThan"] = "gt";
    FilterOperator["LessEqual"] = "le";
    FilterOperator["LessThan"] = "lt";
    FilterOperator["Like"] = "lk";
    FilterOperator["NotLike"] = "nl";
    FilterOperator["NotEqual"] = "ne";
})(FilterOperator = exports.FilterOperator || (exports.FilterOperator = {}));
