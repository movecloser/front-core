// Copyright (c) 2022 Move Closer

/* istanbul ignore file */
import {
  ApiConnectorFactory,
  ApiConnectorType,
  ConnectorMiddleware,
  IConnector
} from './contracts/connector'
import {
  AuthMiddlewareType,
  CSRFMiddlewareType,
  EventbusMiddlewareType,
  InternalServerErrorMiddlewareType,
  ValidationMiddlewareType
} from './contracts/middlewares'
import {
  DateTimeType,
  DocumentType,
  IDocument, ILegacyDateTime, IModal,
  IWindow, ModalConfig, ModalRegistry, ModalType,
  WindowType
} from './contracts/services'
import { EventbusType, IEventbus } from './contracts/eventbus'
import { HttpConnectorType, IHttpConnector, IHttpConstructors } from './contracts/http'
import { IConfiguration } from './contracts/configuration'
import { Interfaces } from './contracts/container'
import { IValidation, ValidationType } from './contracts/validation'
import { ProvidersFactory } from './contracts/bootstrapper'

import { ApiConnector } from './services/connector'
import { AuthMiddleware } from './services/resources/auth-middleware'
import { CSRFMiddleware } from "./services/csrf/middleware"
import { CSRFServiceType, ICSRFService } from "./contracts/csrf"
import { DateTime } from './services/datetime'
import { DocumentService } from './services/document'
import { Eventbus } from './services/eventbus'
import { EventbusMiddleware } from './services/resources/eventbus-middleware'
import { HttpConnector } from './services/http'
import { InternalServerErrorMiddleware } from './services/resources/internal-server-error-middleware'
import { Validation } from './services/validation'
import { ValidationMiddleware } from './services/resources/validation-middleware'
import { WindowService } from './services/window'
import { Authentication, AuthProvider, AuthServiceType, IUser } from './contracts'
import { AuthService } from './services/authorization'
import { ModalConnector } from './services/modal-connector'

/**
 * List of services included into movecloser/core
 * @licence MIT
 */
export const services: ProvidersFactory = (config: IConfiguration) => {
  return (bind: Interfaces.Bind) => {
    // Api Connector
    if (config.has('resources')) {
      bind<Interfaces.Factory<IConnector>>(ApiConnectorFactory)
        .toFactory((context: Interfaces.Context) => {
          return () => {
            return context.container.get<IConnector>(ApiConnectorType)
          }
        })

      bind<IConnector>(ApiConnectorType).toDynamicValue((context: Interfaces.Context) => {
        const middlewares: ConnectorMiddleware[] = []
        const stack = (config.has('middlewares')
          ? config.byFile<symbol[]>('middlewares') : [])

        for (const symbol of stack) {
          middlewares.push(
            context.container.get(symbol)
          )
        }

        return new ApiConnector(
          config.byFile('resources'),
          context.container.get<IHttpConnector>(HttpConnectorType),
          middlewares
        )
      }).inSingletonScope()
    }

    // Authentication
    if (config.has('auth')) {
      bind<ConnectorMiddleware>(AuthMiddlewareType).toDynamicValue((context: Interfaces.Context) => {
        return new AuthMiddleware(
          context.container.get<AuthProvider>(AuthServiceType)
        )
      })

      bind<Authentication<IUser>>(AuthServiceType).toDynamicValue((context: Interfaces.Context) => {
        return new AuthService(
          config.byFile('auth'),
          context.container.get<WindowService>(WindowType),
          context.container.get<ILegacyDateTime>(DateTimeType)
        )
      }).inSingletonScope()
    }

    // Document
    bind<IDocument>(DocumentType).to(DocumentService).inSingletonScope()
    // Eventbus
    bind<IEventbus>(EventbusType).to(Eventbus).inSingletonScope()
    // Http
    if (config.has('http')) {
      bind<IHttpConnector>(HttpConnectorType).toDynamicValue(() => {
        return new HttpConnector(
          config.byKey('http.drivers') as IHttpConstructors,
          config.byKey<string>('http.default')
        )
      }).inSingletonScope()
    }

    // Middlewares
    if (config.has('resources')) {
      if (config.has('csrf')) {
        bind<ConnectorMiddleware>(CSRFMiddlewareType)
          .toDynamicValue((context: Interfaces.Context) => {
            return new CSRFMiddleware(
              context.container.get<ICSRFService>(CSRFServiceType)
            )
          })
      }

      bind<ConnectorMiddleware>(EventbusMiddlewareType)
        .toDynamicValue((context: Interfaces.Context) => {
          return new EventbusMiddleware(
            context.container.get<IEventbus>(EventbusType)
          )
        })

      bind<ConnectorMiddleware>(InternalServerErrorMiddlewareType).to(InternalServerErrorMiddleware)

      bind<ConnectorMiddleware>(ValidationMiddlewareType)
        .toDynamicValue((context: Interfaces.Context) => {
          return new ValidationMiddleware(
            context.container.get<IValidation>(ValidationType)
          )
        })
    }

    // Modals
    if (config.has('modals')) {
      bind<IModal>(ModalType).toDynamicValue(() => {
        const registry = config.byFile<ModalRegistry<any>>('modals')
        const modalConfig = config.byFile('modalConfig') || {}

        type Keys = keyof typeof registry
        type Values = typeof registry[Keys]

        return new ModalConnector(
          registry as ModalRegistry<Values>,
          modalConfig as ModalConfig
        )
      }).inSingletonScope()
    }

    // Validation
    bind<IValidation>(ValidationType).to(Validation).inSingletonScope()
    // Window
    bind<IWindow>(WindowType).toDynamicValue((context: Interfaces.Context) => {
      return new WindowService(
        context.container.get<IDocument>(DocumentType)
      )
    }).inSingletonScope()
  }
}

export {
  ApiConnector,
  Authentication,
  AuthMiddleware,
  AuthService,
  DateTime,
  DocumentService,
  Eventbus,
  EventbusMiddleware,
  HttpConnector,
  InternalServerErrorMiddleware,
  ModalConnector,
  Validation,
  ValidationMiddleware,
  WindowService
}

export default services
