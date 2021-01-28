import { ApiConnectorFactory, ConnectorFactory, IConnector } from '../contracts/connector'
import { ICollection, IModel, ModelConstructor, ModelPayload } from '../contracts/models'
import { MappingConfig } from '../contracts/support'

import { Collection } from './collection'
import { Inject, Injectable } from '../container'
import { mapCollection, mapModel } from './adapter'
import { MappingError } from '../exceptions/errors'

/**
 * Repository is service class that provides loading data via store.
 *
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
@Injectable()
export abstract class Repository<M> {
  protected connector: IConnector
  protected map: MappingConfig = {}
  protected useAdapter: boolean = false

  protected constructor (@Inject(ApiConnectorFactory) connectorFactory: ConnectorFactory) {
    this.connector = connectorFactory()
  }

  /**
   * Compose collection based on mapping settings.
   */
  protected composeCollection (
    rawCollection: any[],
    modelConstructor: ModelConstructor<M>
  ): ICollection<IModel<M>> {
    if (this.useAdapter && Object.keys(this.map).length === 0) {
      throw new MappingError(`Mapping config must be provided when adapter is turned on.`)
    }

    return new Collection<IModel<M>>(
      (this.useAdapter ? mapCollection(rawCollection, this.map) : rawCollection)
        .map((item: any) => new modelConstructor(item))
    )
  }

  /**
   * Compose model based on mapping settings.
   */
  protected composeModel (
    rawModel: ModelPayload,
    modelConstructor: ModelConstructor<M>
  ): IModel<M> {
    if (this.useAdapter && Object.keys(this.map).length === 0) {
      throw new MappingError(`Mapping config must be provided when adapter is turned on.`)
    }

    return new modelConstructor(this.useAdapter ? mapModel(rawModel, this.map) : rawModel)
  }
}
