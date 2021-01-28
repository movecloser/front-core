"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bootstrapper = void 0;
const eventbus_1 = require("./contracts/eventbus");
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
        this.routerBootstrapper = factories_1.routerFactory(this.config.byFile('router'), this.container);
        this.storeBootstrapper = factories_1.storeFactory(this.config.byFile('store'), this.container);
    }
    /**
     * Bootstrapper init method.
     */
    async boot() {
        const { modules, router, store } = this.config.toObject();
        await this.container.loadModule(this.container.createModule(services_1.services(this.config)));
        const providers = [];
        const observers = [];
        const useRouter = !!router;
        const useStore = !!store;
        if (this.config.has('services')) {
            providers.push({
                binder: this.config.byFile('services'),
                async: false
            });
        }
        for (let m of modules) {
            const module = new m();
            if (module.providers) {
                providers.push({
                    binder: module.providers(this.config),
                    async: module.providersAsync
                });
            }
            if (module.observers) {
                observers.push(...module.observers);
            }
            if (useRouter && module.routes) {
                this.routerBootstrapper.applyModule(module.name, module.routes);
            }
            if (useStore && module.state) {
                this.storeBootstrapper.applyModule(module.name, module.state);
            }
        }
        for (const m of providers) {
            await this.container.loadModule(this.container.createModule(m.binder, m.async), m.async);
        }
        const eventbus = this.container.get(eventbus_1.EventbusType);
        for (const observer of observers) {
            eventbus.observe(this.container.get(observer));
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