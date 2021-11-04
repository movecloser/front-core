"use strict";
/*
 * Copyright (c) 2021 Move Closer
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowService = exports.ValidationMiddleware = exports.Validation = exports.ModalConnector = exports.InternalServerErrorMiddleware = exports.HttpConnector = exports.EventbusMiddleware = exports.Eventbus = exports.DocumentService = exports.DateTime = exports.AuthService = exports.AuthMiddleware = exports.ApiConnector = exports.services = void 0;
/* istanbul ignore file */
const connector_1 = require("./contracts/connector");
const middlewares_1 = require("./contracts/middlewares");
const services_1 = require("./contracts/services");
const eventbus_1 = require("./contracts/eventbus");
const http_1 = require("./contracts/http");
const validation_1 = require("./contracts/validation");
const connector_2 = require("./services/connector");
Object.defineProperty(exports, "ApiConnector", { enumerable: true, get: function () { return connector_2.ApiConnector; } });
const auth_middleware_1 = require("./services/resources/auth-middleware");
Object.defineProperty(exports, "AuthMiddleware", { enumerable: true, get: function () { return auth_middleware_1.AuthMiddleware; } });
const datetime_1 = require("./services/datetime");
Object.defineProperty(exports, "DateTime", { enumerable: true, get: function () { return datetime_1.DateTime; } });
const document_1 = require("./services/document");
Object.defineProperty(exports, "DocumentService", { enumerable: true, get: function () { return document_1.DocumentService; } });
const eventbus_2 = require("./services/eventbus");
Object.defineProperty(exports, "Eventbus", { enumerable: true, get: function () { return eventbus_2.Eventbus; } });
const eventbus_middleware_1 = require("./services/resources/eventbus-middleware");
Object.defineProperty(exports, "EventbusMiddleware", { enumerable: true, get: function () { return eventbus_middleware_1.EventbusMiddleware; } });
const http_2 = require("./services/http");
Object.defineProperty(exports, "HttpConnector", { enumerable: true, get: function () { return http_2.HttpConnector; } });
const internal_server_error_middleware_1 = require("./services/resources/internal-server-error-middleware");
Object.defineProperty(exports, "InternalServerErrorMiddleware", { enumerable: true, get: function () { return internal_server_error_middleware_1.InternalServerErrorMiddleware; } });
const validation_2 = require("./services/validation");
Object.defineProperty(exports, "Validation", { enumerable: true, get: function () { return validation_2.Validation; } });
const validation_middleware_1 = require("./services/resources/validation-middleware");
Object.defineProperty(exports, "ValidationMiddleware", { enumerable: true, get: function () { return validation_middleware_1.ValidationMiddleware; } });
const window_1 = require("./services/window");
Object.defineProperty(exports, "WindowService", { enumerable: true, get: function () { return window_1.WindowService; } });
const contracts_1 = require("./contracts");
const authorization_1 = require("./services/authorization");
Object.defineProperty(exports, "AuthService", { enumerable: true, get: function () { return authorization_1.AuthService; } });
const modal_connector_1 = require("./services/modal-connector");
Object.defineProperty(exports, "ModalConnector", { enumerable: true, get: function () { return modal_connector_1.ModalConnector; } });
/**
 * List of services included into movecloser/core
 * @licence MIT
 */
const services = (config) => {
    return (bind) => {
        // Api Connector
        if (config.has('resources')) {
            bind(connector_1.ApiConnectorFactory)
                .toFactory((context) => {
                return () => {
                    return context.container.get(connector_1.ApiConnectorType);
                };
            });
            bind(connector_1.ApiConnectorType).toDynamicValue((context) => {
                const middlewares = [];
                const stack = (config.has('middlewares')
                    ? config.byFile('middlewares') : []);
                for (const symbol of stack) {
                    middlewares.push(context.container.get(symbol));
                }
                return new connector_2.ApiConnector(config.byFile('resources'), context.container.get(http_1.HttpConnectorType), middlewares);
            }).inSingletonScope();
        }
        // Authentication
        if (config.has('auth')) {
            bind(middlewares_1.AuthMiddleareType).toDynamicValue((context) => {
                return new auth_middleware_1.AuthMiddleware(context.container.get(contracts_1.AuthServiceType));
            });
            bind(contracts_1.AuthServiceType).toDynamicValue((context) => {
                return new authorization_1.AuthService(config.byFile('auth'), context.container.get(services_1.WindowType));
            }).inSingletonScope();
        }
        // Datetime
        bind(services_1.DateTimeType).to(datetime_1.DateTime);
        // Document
        bind(services_1.DocumentType).to(document_1.DocumentService).inSingletonScope();
        // Eventbus
        bind(eventbus_1.EventbusType).to(eventbus_2.Eventbus).inSingletonScope();
        // Http
        if (config.has('http')) {
            bind(http_1.HttpConnectorType).toDynamicValue(() => {
                return new http_2.HttpConnector(config.byKey('http.drivers'), config.byKey('http.default'));
            }).inSingletonScope();
        }
        // Middlewares
        if (config.has('resources')) {
            bind(middlewares_1.EventbusMiddlewareType)
                .toDynamicValue((context) => {
                return new eventbus_middleware_1.EventbusMiddleware(context.container.get(eventbus_1.EventbusType));
            });
            bind(middlewares_1.InternalServerErrorMiddlewareType).to(internal_server_error_middleware_1.InternalServerErrorMiddleware);
            bind(middlewares_1.ValidationMiddlewareType)
                .toDynamicValue((context) => {
                return new validation_middleware_1.ValidationMiddleware(context.container.get(validation_1.ValidationType));
            });
        }
        // Modals
        if (config.has('modals')) {
            bind(services_1.ModalType).toDynamicValue(() => {
                const registry = config.byFile('modals');
                const modalConfig = config.byFile('modalConfig') || {};
                return new modal_connector_1.ModalConnector(registry, modalConfig);
            }).inSingletonScope();
        }
        // Validation
        bind(validation_1.ValidationType).to(validation_2.Validation).inSingletonScope();
        // Window
        bind(services_1.WindowType).toDynamicValue((context) => {
            return new window_1.WindowService(context.container.get(services_1.DocumentType));
        }).inSingletonScope();
    };
};
exports.services = services;
exports.default = exports.services;
