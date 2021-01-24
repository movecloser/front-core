import { IModel, ModelConstructor, ModelPayload } from '../contracts/models';
/**
 * @author Kuba Fogel <kuba.foge@movecloser.pl>
 * @version 1.0.0
 */
export declare abstract class Model<T> implements IModel<T> {
    initialValues: ModelPayload;
    protected _data: ModelPayload;
    protected modelProperties: string[];
    constructor(payload?: ModelPayload);
    protected abstract boot(): void;
    /**
     * Model property getter
     * @param property
     */
    get(property: string): any;
    /**
     * Method to update incomplete properties on existing model instance
     * @param payload
     */
    static hydrate<T>(payload: ModelPayload): IModel<T>;
    /**
     * Model property setter
     * @param property
     * @param value
     */
    set(property: string, value: any): void;
    /**
     * Method to extract raw data from model
     */
    toObject(): T;
    /**
     * Method to get model related to given property
     * @param model
     * @param value
     * @protected
     */
    protected hasOne<R>(model: ModelConstructor<R>, value: ModelPayload): IModel<unknown>;
    /**
     * Method to get collection related to given property
     * @param model
     * @param values
     * @protected
     */
    protected hasMany<R>(model: ModelConstructor<R>, values: ModelPayload[]): IModel<unknown>[];
}
