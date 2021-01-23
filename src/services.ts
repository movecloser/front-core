import { ApiConnectorType, ConnectorMiddleware, IConnector } from '@/contracts/connector'
import {
  DateTimeType,
  DocumentType,
  IDateTime,
  IDocument,
  IWindow,
  WindowType
} from '@/contracts/services'
import { EventbusType, IEventbus } from '@/contracts/eventbus'
import { HttpConnectorType, IHttpConnector, IHttpConstructors } from '@/contracts/http'
import { IConfiguration } from '@/contracts/configuration'
import { Interfaces } from '@/contracts/container'
import { IValidation, ValidationType } from '@/contracts/validation'
import { ProvidersFactory } from '@/contracts/bootstrapper'

import { ApiConnector } from '@/services/connector'
import { DateTime } from '@/services/datetime'
import { DocumentService } from '@/services/document'
import { Eventbus } from '@/services/eventbus'
import { HttpConnector } from '@/services/http'
import { Validation } from '@/services/validation'
import { WindowService } from '@/services/window'

/**
 * List of services included into movecloser/core
 * @licence MIT
 */
export const services: ProvidersFactory = (config: IConfiguration) => {
  return (bind: Interfaces.Bind) => {
    // Api Connector
    if (config.has('resources')) {
      bind<IConnector>(ApiConnectorType).toDynamicValue((context: Interfaces.Context) => {
        const middlewares: ConnectorMiddleware[] = []
        const stack = (config.has('middleware')
          ? config.byFile<symbol[]>('middleware') : [])

        for (const symbol of stack) {
          middlewares.push(
            context.container.get(symbol)
          )
        }

        return new ApiConnector(
          {},
          context.container.get<IHttpConnector>(HttpConnectorType),
          middlewares
        )
      })
    }

    // Datetime
    bind<IDateTime>(DateTimeType).to(DateTime)
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

export default services
