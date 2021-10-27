/*
 * Copyright (c) 2021 Move Closer
 */

import { ProvidersFactory } from './contracts/bootstrapper';
import { ApiConnector } from './services/connector';
import { AuthMiddleware } from './services/resources/auth-middleware';
import { DateTime } from './services/datetime';
import { DocumentService } from './services/document';
import { Eventbus } from './services/eventbus';
import { EventbusMiddleware } from './services/resources/eventbus-middleware';
import { HttpConnector } from './services/http';
import { InternalServerErrorMiddleware } from './services/resources/internal-server-error-middleware';
import { Validation } from './services/validation';
import { ValidationMiddleware } from './services/resources/validation-middleware';
import { WindowService } from './services/window';
import { Authentication } from './contracts';
import { AuthService } from './services/authorization';
import { ModalConnector } from './services/modal-connector';
/**
 * List of services included into movecloser/core
 * @licence MIT
 */
export declare const services: ProvidersFactory;
export { ApiConnector, Authentication, AuthMiddleware, AuthService, DateTime, DocumentService, Eventbus, EventbusMiddleware, HttpConnector, InternalServerErrorMiddleware, ModalConnector, Validation, ValidationMiddleware, WindowService };
export default services;
