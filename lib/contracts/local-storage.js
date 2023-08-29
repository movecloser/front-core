"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorageType = exports.localStorageDriversMap = exports.LocalStorageDriver = void 0;
const local_storage_1 = require("../services/local-storage");
var LocalStorageDriver;
(function (LocalStorageDriver) {
    LocalStorageDriver["Native"] = "native";
    LocalStorageDriver["CrossDomain"] = "cross-domain";
})(LocalStorageDriver = exports.LocalStorageDriver || (exports.LocalStorageDriver = {}));
exports.localStorageDriversMap = {
    [LocalStorageDriver.Native]: local_storage_1.NativeLocalStorageProvider,
    [LocalStorageDriver.CrossDomain]: local_storage_1.CrossDomainLocalStorageProvider
};
exports.LocalStorageType = Symbol.for('LocalStorageType');
