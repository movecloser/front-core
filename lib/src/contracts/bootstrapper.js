"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreDriver = exports.RouterDriver = void 0;
var RouterDriver;
(function (RouterDriver) {
    RouterDriver["None"] = "none";
    RouterDriver["VueRouter"] = "vue-router";
})(RouterDriver = exports.RouterDriver || (exports.RouterDriver = {}));
var StoreDriver;
(function (StoreDriver) {
    // Mobx = 'mobx',
    StoreDriver["None"] = "none";
    StoreDriver["Vuex"] = "vuex";
})(StoreDriver = exports.StoreDriver || (exports.StoreDriver = {}));
