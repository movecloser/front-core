import { injectable } from 'inversify'
import { IResources } from '@/contracts/resources'

/**
 * Repository is service class that provides loading data via store.
 *
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 1.0.0
 */
@injectable()
export abstract class Repository {
    protected useAdapter: boolean = false

    constructor (protected resources: IResources, useAdapter: boolean = true) {
        if (useAdapter) {
            this.useAdapter = useAdapter
        }
    }
}
