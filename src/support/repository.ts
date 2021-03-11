import { ApiConnectorFactory, ConnectorFactory, IConnector } from '../contracts/connector'
import {
  ICollection,
  IMeta,
  IModel,
  MagicModel,
  ModelConstructor,
  ModelPayload
} from '../contracts/models'
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
export abstract class Repository<MData extends object, MClass extends IModel<MData> = IModel<MData>> {
  protected connector: IConnector
  protected map: MappingConfig = {}
  protected useAdapter: boolean = false

  constructor (@Inject(ApiConnectorFactory) connectorFactory: ConnectorFactory) {
    this.connector = connectorFactory()
  }

  /**
   * Compose collection based on mapping settings.
   */
  protected composeCollection (
    rawCollection: any[],
    modelConstructor: ModelConstructor<MData, MClass>,
    meta: IMeta
  ): ICollection<MagicModel<MData, MClass>> {
    if (this.useAdapter && Object.keys(this.map).length === 0) {
      throw new MappingError(`Mapping config must be provided when adapter is turned on.`)
    }

    return new Collection<MagicModel<MData, MClass>>(
      (this.useAdapter ? mapCollection(rawCollection, this.map) : rawCollection)
        .map((item: any) => modelConstructor.hydrate(item)),
      meta
    )
  }

  /**
   * Compose model based on mapping settings.
   */
  protected composeModel (
    rawModel: ModelPayload,
    modelConstructor: ModelConstructor<MData, MClass>
  ): MagicModel<MData, MClass> {
    if (this.useAdapter && Object.keys(this.map).length === 0) {
      throw new MappingError(`Mapping config must be provided when adapter is turned on.`)
    }

    return modelConstructor.hydrate(this.useAdapter ? mapModel(rawModel, this.map) : rawModel)
  }
}
