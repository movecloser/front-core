import { ConnectorFactory, IConnector } from '../contracts/connector';
import { ICollection, IMeta, IModel, MagicModel, ModelConstructor, ModelPayload } from '../contracts/models';
import { MappingConfig } from '../contracts/support';
/**
 * Repository is service class that provides loading data via store.
 *
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
export declare abstract class Repository<MData extends object, MClass extends IModel<MData> = IModel<MData>> {
    protected connector: IConnector;
    protected map: MappingConfig;
    protected useAdapter: boolean;
    constructor(connectorFactory: ConnectorFactory);
    /**
     * Compose collection based on mapping settings.
     */
    protected composeCollection(rawCollection: any[], modelConstructor: ModelConstructor<MData, MClass>, meta: IMeta): ICollection<MagicModel<MData, MClass>>;
    /**
     * Compose model based on mapping settings.
     */
    protected composeModel(rawModel: ModelPayload, modelConstructor: ModelConstructor<MData, MClass>): MagicModel<MData, MClass>;
}
