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
    protected composeCollection<Data extends object = MData, Class extends IModel<Data> = IModel<Data>>(rawCollection: any[], modelConstructor: ModelConstructor<Data, Class>, meta: IMeta): ICollection<MagicModel<Data, Class>>;
    /**
     * Compose model based on mapping settings.
     */
    protected composeModel<Data extends object = MData, Class extends IModel<Data> = IModel<Data>>(rawModel: ModelPayload, modelConstructor: ModelConstructor<Data, Class>): MagicModel<Data, Class>;
}
