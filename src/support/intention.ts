import { IIntention } from '@/contracts/support'
import { mapIntention, MappingConfig } from '@/support/adapter'

/**
 * An intention is the inverted Adapter that translate model structure into api data structure.
 *
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
export abstract class AbstractIntention<T> implements IIntention<T>{
  protected abstract map: MappingConfig

  protected payload!: T

  constructor (payload: T) {
    this.payload = payload
  }

  public toModel (): T {
    return this.payload
  }

  public toRequest (): any {
    return mapIntention<any>(this.payload, this.map)
  }
}
