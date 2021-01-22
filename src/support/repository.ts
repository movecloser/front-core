import { IConnector } from '@/contracts/connector.ts'
import { Injectable } from '@/container'
import { Collection } from '@/support/collection'
import { ICollection, IModel, ModelConstructor, ModelPayload } from '@/contracts/models'
import { mapCollection, mapModel, MappingConfig } from '@/support/adapter'
import { MappingError } from '@/exceptions/errors'

/**
 * Repository is service class that provides loading data via store.
 *
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
@Injectable()
  export abstract class Repository<M> {
    protected useAdapter: boolean = false

    protected map: MappingConfig = {}

     protected constructor (protected resources: IConnector, useAdapter: boolean = true) {
        if (useAdapter) {
            this.useAdapter = useAdapter
        }
    }

    protected composeCollection (rawCollection: any[], modelConstructor: ModelConstructor<M>): ICollection<M> {
      if (this.useAdapter && Object.keys(this.map).length === 0) {
        throw new MappingError(`Mapping config must be provided when adapter is turned on.`)
      }

      return new Collection<M>(
        (this.useAdapter ? mapCollection(rawCollection, this.map) : rawCollection)
          .map((item: any) => new modelConstructor(item))
      )
    }

    protected composeModel (rawModel: ModelPayload, modelConstructor: ModelConstructor<M>): IModel<M> {
      if (this.useAdapter && Object.keys(this.map).length === 0) {
        throw new MappingError(`Mapping config must be provided when adapter is turned on.`)
      }

      return new modelConstructor(this.useAdapter ? mapModel(rawModel, this.map) : rawModel)
    }
}
