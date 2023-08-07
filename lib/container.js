"use strict";
// Copyright (c) 2021 Move Closer
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injectable = exports.Inject = exports.Container = void 0;
const inversify_1 = require("inversify");
/**
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
class Container {
    /**
     * Returns new instance of IOC container.
     * @param config
     */
    createContainer(config = {}) {
        this.container = new inversify_1.Container(config);
    }
    /**
     *
     * @param binder
     * @param async
     */
    createModule(binder, async = false) {
        if (async) {
            return new inversify_1.AsyncContainerModule(binder);
        }
        return new inversify_1.ContainerModule(binder);
    }
    /**
     * Returns instance of Service by its identifier.
     * @param identifier
     */
    /* istanbul ignore next */
    get(identifier) {
        return this.container.get(identifier);
    }
    /**
     * Returns instance of Service by its identifier with given tag.
     * @param identifier
     * @param tag
     */
    getNamed(identifier, tag) {
        return this.container.getNamed(identifier, tag);
    }
    /**
     * Returns instance of IOC container.
     */
    getContainer() {
        return this.container;
    }
    /**
     * Load module into the container.
     * @param module
     * @param async
     */
    async loadModule(module, async = false) {
        if (async) {
            await this.container.loadAsync(module);
        }
        else {
            this.container.load(module);
        }
    }
    /**
     * Unload module from the container.
     * @param module
     */
    unloadModule(module) {
        this.container.unload(module);
    }
}
exports.Container = Container;
var inversify_2 = require("inversify");
Object.defineProperty(exports, "Inject", { enumerable: true, get: function () { return inversify_2.inject; } });
Object.defineProperty(exports, "Injectable", { enumerable: true, get: function () { return inversify_2.injectable; } });
