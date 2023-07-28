"use strict";
// Copyright (c) 2021 Move Closer
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeLocalStorageProvider = void 0;
const container_1 = require("../../container");
const support_1 = require("../../support");
let NativeLocalStorageProvider = class NativeLocalStorageProvider {
    constructor(_config) {
        this._config = _config;
    }
    get(key) {
        return support_1.LocalStorage.get(key);
    }
    isSet(key) {
        return support_1.LocalStorage.isSet(key);
    }
    remove(key) {
        return support_1.LocalStorage.remove(key);
    }
    set(key, value) {
        return support_1.LocalStorage.set(key, value);
    }
};
NativeLocalStorageProvider = __decorate([
    (0, container_1.Injectable)()
], NativeLocalStorageProvider);
exports.NativeLocalStorageProvider = NativeLocalStorageProvider;
