"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = exports.AppModule = void 0;
/* istanbul ignore next */
function AppModule(registry) {
    return function _AppModule(target) {
        return class extends target {
            constructor() {
                super();
                this.name = registry.name;
                this.observers = (registry.hasOwnProperty('observers') &&
                    typeof registry.observers !== 'undefined' &&
                    Array.isArray(registry.observers)) ? registry.observers : [];
                this.providers = (registry.hasOwnProperty('providers') &&
                    typeof registry.providers !== 'undefined') ? registry.providers : null;
                this.providersAsync = (registry.hasOwnProperty('providersAsync') &&
                    typeof registry.providersAsync !== 'undefined') ? registry.providersAsync : false;
                this.routes = (registry.hasOwnProperty('routes') &&
                    typeof registry.routes !== 'undefined') ? registry.routes : null;
                this.state = (registry.hasOwnProperty('state') &&
                    typeof registry.state !== 'undefined') ? registry.state : null;
            }
        };
    };
}
exports.AppModule = AppModule;
class Module {
    constructor() {
        this.name = '';
        this.observers = [];
        this.providers = null;
        this.providersAsync = false;
        this.routes = null;
        this.state = null;
    }
}
exports.Module = Module;
