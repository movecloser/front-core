"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.services = void 0;
var connector_1 = require("./contracts/connector");
var middlewares_1 = require("./contracts/middlewares");
var services_1 = require("./contracts/services");
var eventbus_1 = require("./contracts/eventbus");
var http_1 = require("./contracts/http");
var validation_1 = require("./contracts/validation");
var connector_2 = require("./services/connector");
var datetime_1 = require("./services/datetime");
var document_1 = require("./services/document");
var eventbus_2 = require("./services/eventbus");
var eventbus_middleware_1 = require("./services/resources/eventbus-middleware");
var http_2 = require("./services/http");
var internal_server_error_middleware_1 = require("./services/resources/internal-server-error-middleware");
var validation_2 = require("./services/validation");
var validation_middleware_1 = require("./services/resources/validation-middleware");
var window_1 = require("./services/window");
/**
 * List of services included into movecloser/core
 * @licence MIT
 */
exports.services = function (config) {
    return function (bind) {
        // Api Connector
        if (config.has('resources')) {
            bind(connector_1.ApiConnectorType).toDynamicValue(function (context) {
                var middlewares = [];
                var stack = (config.has('middleware')
                    ? config.byFile('middleware') : []);
                for (var _i = 0, stack_1 = stack; _i < stack_1.length; _i++) {
                    var symbol = stack_1[_i];
                    middlewares.push(context.container.get(symbol));
                }
                return new connector_2.ApiConnector(config.byFile('resources'), context.container.get(http_1.HttpConnectorType), middlewares);
            });
        }
        // Datetime
        bind(services_1.DateTimeType).to(datetime_1.DateTime);
        // Document
        bind(services_1.DocumentType).to(document_1.DocumentService).inSingletonScope();
        // Eventbus
        bind(eventbus_1.EventbusType).to(eventbus_2.Eventbus).inSingletonScope();
        // Http
        if (config.has('http')) {
            bind(http_1.HttpConnectorType).toDynamicValue(function () {
                return new http_2.HttpConnector(config.byKey('http.drivers'), config.byKey('http.default'));
            }).inSingletonScope();
        }
        // Middlewares
        if (config.has('resources')) {
            bind(middlewares_1.EventbusMiddlewareType)
                .toDynamicValue(function (context) {
                return new eventbus_middleware_1.EventbusMiddleware(context.container.get(eventbus_1.EventbusType));
            });
            bind(middlewares_1.InternalServerErrorMiddlewareType).to(internal_server_error_middleware_1.InternalServerErrorMiddleware);
            bind(middlewares_1.ValidationMiddlewareType)
                .toDynamicValue(function (context) {
                return new validation_middleware_1.ValidationMiddleware(context.container.get(validation_1.ValidationType));
            });
        }
        // Validation
        bind(validation_1.ValidationType).to(validation_2.Validation).inSingletonScope();
        // Window
        bind(services_1.WindowType).toDynamicValue(function (context) {
            return new window_1.WindowService(context.container.get(services_1.DocumentType));
        }).inSingletonScope();
    };
};
exports.default = exports.services;
