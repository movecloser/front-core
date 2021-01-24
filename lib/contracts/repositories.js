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
    FilterOperator["Like"] = "lk";
    FilterOperator["Equal"] = "eq";
    FilterOperator["LessThan"] = "lt";
    FilterOperator["LessEqual"] = "le";
    FilterOperator["GreaterThan"] = "gt";
    FilterOperator["GreaterEqual"] = "ge";
})(FilterOperator = exports.FilterOperator || (exports.FilterOperator = {}));
