import { IConfiguration } from "@/contracts/configuration"
import { Interfaces } from '@/contracts/container'
import { EventbusType, IEventbus } from '@/contracts/eventbus'
import { HttpType, IHttp } from '@/contracts/http'

import { DateTime, DateTimeType, IDateTime } from '@/services/datetime'
import { DocumentService, DocumentType, IDocument } from '@/services/document'
import { Eventbus } from '@/services/eventbus'
import { HttpConnector } from '@/services/http'

export const services = (config: IConfiguration) => {
  return (bind: Interfaces.Bind) => {
    // Datetime
    bind<IDateTime>(DateTimeType).to(DateTime)
    // Document
    bind<IDocument>(DocumentType).to(DocumentService).inSingletonScope()
    // Eventbus
    bind<IEventbus>(EventbusType).to(Eventbus).inSingletonScope()
    // Http
    bind<IHttp>(HttpType).toDynamicValue(() => {
      return new HttpConnector(
        config.byKey('http.drivers'),
        config.byKey('http.default')
      )
    }).inSingletonScope()
  }
}

export default services
