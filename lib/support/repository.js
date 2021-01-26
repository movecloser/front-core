"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const collection_1 = require("./collection");
const container_1 = require("../container");
const adapter_1 = require("./adapter");
const errors_1 = require("../exceptions/errors");
/**
 * Repository is service class that provides loading data via store.
 *
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
let Repository = class Repository {
    constructor(connector, useAdapter = true) {
        // TODO inject connector factory
        // https://github.com/inversify/InversifyJS/blob/master/wiki/factory_injection.md
        this.connector = connector;
        this.useAdapter = false;
        this.map = {};
        if (useAdapter) {
            this.useAdapter = useAdapter;
        }
    }
    /**
     * Compose collection based on mapping settings.
     */
    composeCollection(rawCollection, modelConstructor) {
        if (this.useAdapter && Object.keys(this.map).length === 0) {
            throw new errors_1.MappingError(`Mapping config must be provided when adapter is turned on.`);
        }
        return new collection_1.Collection((this.useAdapter ? adapter_1.mapCollection(rawCollection, this.map) : rawCollection)
            .map((item) => new modelConstructor(item)));
    }
    /**
     * Compose model based on mapping settings.
     */
    composeModel(rawModel, modelConstructor) {
        if (this.useAdapter && Object.keys(this.map).length === 0) {
            throw new errors_1.MappingError(`Mapping config must be provided when adapter is turned on.`);
        }
        return new modelConstructor(this.useAdapter ? adapter_1.mapModel(rawModel, this.map) : rawModel);
    }
};
Repository = __decorate([
    container_1.Injectable()
], Repository);
exports.Repository = Repository;
