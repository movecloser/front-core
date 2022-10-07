"use strict";
// Copyright (c) 2022 Move Closer
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bootstrapper = void 0;
const configuration_1 = require("./configuration");
const container_1 = require("./container");
const factories_1 = require("./bootstrap/factories");
const services_1 = require("./services");
/**
 * Bootstrapper is responsible for booting the app with entire dependencies & base setup.
 *
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
class Bootstrapper {
    constructor(config) {
        this.config = new configuration_1.Configuration(config);
        this.container = this.createContainer();
        this.routerBootstrapper = (0, factories_1.routerFactory)(this.config.byFile('router'), this.container, this.config);
        this.storeBootstrapper = (0, factories_1.storeFactory)(this.config.byFile('store'), this.container, this.config);
    }
    /**
     * Bootstrapper init method.
     */
    async boot() {
        const { modules, router, store } = this.config.toObject();
        await this.container.loadModule(this.container.createModule((0, services_1.services)(this.config)));
        const bootMethods = [];
        const providers = [];
        const useRouter = !!router;
        const useStore = !!store;
        if (this.config.has('services')) {
            providers.push({
                binder: this.config.byFile('services')(this.config),
                async: false
            });
        }
        for (let m of modules) {
            const module = new m();
            // TODO: Test it.
            if (module.boot) {
                bootMethods.push(module.boot);
            }
            if (module.providers) {
                providers.push({
                    binder: module.providers(this.config),
                    async: module.providersAsync
                });
            }
            /* istanbul ignore else */
            if (useRouter && module.routes) {
                this.routerBootstrapper.applyModule(module.name, module.routes);
            }
            /* istanbul ignore else */
            if (useStore && module.state) {
                this.storeBootstrapper.applyModule(module.name, module.state);
            }
        }
        for (const m of providers) {
            await this.container.loadModule(this.container.createModule(m.binder, m.async), m.async);
        }
        // TODO: Test it.
        for (const boot of bootMethods) {
            boot(this.container, this.config);
        }
    }
    /**
     * Returns app configuration.
     */
    getConfiguration() {
        return this.config;
    }
    /**
     * Returns Container instance.
     */
    getContainer() {
        return this.container;
    }
    /**
     * Returns Routes Stack object.
     */
    getRoutesStack() {
        return this.routerBootstrapper.stack();
    }
    /**
     * Returns Store Stack object.
     */
    getStoreStack() {
        return this.storeBootstrapper.stack();
    }
    /**
     * Creates new instance of Ioc Container.
     */
    createContainer() {
        const container = new container_1.Container();
        container.createContainer(this.config.has('container') ? this.config.byFile('container') : {});
        return container;
    }
}
exports.Bootstrapper = Bootstrapper;
