import { Injectable } from '@/contracts/container'
import { IConnector } from '@/contracts/connector.ts'

/**
 * Repository is service class that provides loading data via store.
 *
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
@Injectable()
export abstract class Repository {
    protected useAdapter: boolean = false

     protected constructor (protected resources: IConnector, useAdapter: boolean = true) {
        if (useAdapter) {
            this.useAdapter = useAdapter
        }
    }
}
