"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.services = void 0;
/* istanbul ignore file */
const connector_1 = require("./contracts/connector");
const middlewares_1 = require("./contracts/middlewares");
const services_1 = require("./contracts/services");
const eventbus_1 = require("./contracts/eventbus");
const http_1 = require("./contracts/http");
const validation_1 = require("./contracts/validation");
const connector_2 = require("./services/connector");
const datetime_1 = require("./services/datetime");
const document_1 = require("./services/document");
const eventbus_2 = require("./services/eventbus");
const eventbus_middleware_1 = require("./services/resources/eventbus-middleware");
const http_2 = require("./services/http");
const internal_server_error_middleware_1 = require("./services/resources/internal-server-error-middleware");
const validation_2 = require("./services/validation");
const validation_middleware_1 = require("./services/resources/validation-middleware");
const window_1 = require("./services/window");
const contracts_1 = require("./contracts");
const authorization_1 = require("./services/authorization");
const modal_connector_1 = require("./services/modal-connector");
/**
 * List of services included into movecloser/core
 * @licence MIT
 */
exports.services = (config) => {
    return (bind) => {
        // Api Connector
        if (config.has('resources')) {
            bind(connector_1.ApiConnectorFactory).toFactory((context) => {
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
            });
        }
        // Authentication
        if (config.has('auth')) {
            bind(contracts_1.AuthServiceType).toDynamicValue((context) => {
                return new authorization_1.AuthService(config.byFile('auth'), context.container.get(services_1.DateTimeType));
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
                return new modal_connector_1.ModalConnector(registry);
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
exports.default = exports.services;
