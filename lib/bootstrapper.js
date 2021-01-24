"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bootstrapper = void 0;
var eventbus_1 = require("./contracts/eventbus");
var configuration_1 = require("./configuration");
var container_1 = require("./container");
var factories_1 = require("./bootstrap/factories");
var services_1 = require("./services");
/**
 * Bootstrapper is responsible for booting the app with entire dependencies & base setup.
 *
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
var Bootstrapper = /** @class */ (function () {
    function Bootstrapper(config) {
        this.config = new configuration_1.Configuration(config);
        this.container = this.createContainer();
        this.routerBootstrapper = factories_1.routerFactory(this.config.byFile('router'), this.container);
        this.storeBootstrapper = factories_1.storeFactory(this.config.byFile('state'), this.container);
    }
    /**
     * Bootstrapper init method.
     */
    Bootstrapper.prototype.boot = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, modules, router, store, providers, observers, useRouter, useStore, _i, modules_1, m, module_1, _b, providers_1, m, eventbus, _c, observers_1, observer;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this.config.toObject(), modules = _a.modules, router = _a.router, store = _a.store;
                        return [4 /*yield*/, this.container.loadModule(this.container.createModule(services_1.services(this.config)))];
                    case 1:
                        _d.sent();
                        providers = [];
                        observers = [];
                        useRouter = !!router;
                        useStore = !!store;
                        for (_i = 0, modules_1 = modules; _i < modules_1.length; _i++) {
                            m = modules_1[_i];
                            module_1 = new m();
                            if (module_1.providers) {
                                providers.push({
                                    binder: module_1.providers,
                                    async: module_1.providersAsync
                                });
                            }
                            if (module_1.observers) {
                                observers.push.apply(observers, module_1.observers);
                            }
                            if (useRouter && module_1.routes) {
                                this.routerBootstrapper.applyModule(module_1.name, module_1.routes);
                            }
                            if (useStore && module_1.state) {
                                this.storeBootstrapper.applyModule(module_1.name, module_1.state);
                            }
                        }
                        _b = 0, providers_1 = providers;
                        _d.label = 2;
                    case 2:
                        if (!(_b < providers_1.length)) return [3 /*break*/, 5];
                        m = providers_1[_b];
                        return [4 /*yield*/, this.container.loadModule(this.container.createModule(m.binder, m.async), m.async)];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        _b++;
                        return [3 /*break*/, 2];
                    case 5:
                        eventbus = this.container.get(eventbus_1.EventbusType);
                        for (_c = 0, observers_1 = observers; _c < observers_1.length; _c++) {
                            observer = observers_1[_c];
                            eventbus.observe(this.container.get(observer));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns app configuration.
     */
    Bootstrapper.prototype.getConfiguration = function () {
        return this.config;
    };
    /**
     * Returns Container instance.
     */
    Bootstrapper.prototype.getContainer = function () {
        return this.container;
    };
    /**
     * Returns Routes Stack object.
     */
    Bootstrapper.prototype.getRoutesStack = function () {
        return this.routerBootstrapper.stack();
    };
    /**
     * Returns Store Stack object.
     */
    Bootstrapper.prototype.getStoreStack = function () {
        return this.storeBootstrapper.stack();
    };
    /**
     * Creates new instance of Ioc Container.
     */
    Bootstrapper.prototype.createContainer = function () {
        var container = new container_1.Container();
        container.createContainer(this.config.has('container') ? this.config.byFile('container') : {});
        return container;
    };
    return Bootstrapper;
}());
exports.Bootstrapper = Bootstrapper;
