import { IModel, MagicModel, ModelConstructor, ModelPayload } from '../contracts/models';
/**
 * @author Kuba Fogel <kuba.foge@movecloser.pl>
 * @version 1.0.0
 */
export declare abstract class Model<T> implements IModel<T> {
    initialValues: ModelPayload;
    protected _data: ModelPayload;
    protected modelProperties: string[];
    constructor(payload?: ModelPayload);
    /**
     * Create instance of Model with Proxy involved.
     * @param payload
     */
    static create<T extends object, M extends IModel<T> = IModel<T>>(payload?: ModelPayload): MagicModel<T, M>;
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
    static hydrate<T extends object, M extends IModel<T> = IModel<T>>(payload: ModelPayload): MagicModel<T, M>;
    /**
     * Model property setter
     * @param property
     * @param value
     */
    set(property: string, value: any): boolean;
    /**
     * Method to extract raw data from model
     */
    toObject(): T;
    /**
     * Return value for given property due to it's accessor.
     */
    __get(property: string): any;
    /**
     * Throws when someone trying to invoke class.
     */
    __invoke(...data: any): any;
    /**
     * Set value for given property due to additional helper mutators.
     */
    __set(property: string, value: any): boolean;
    /**
     * Method to extract raw data from model
     */
    __toObject(): T;
    /**
     * Method to get model related to given property
     * @param model
     * @param value
     * @protected
     */
    protected hasOne<R>(model: ModelConstructor<R>, value: ModelPayload): import("..").Intersected<IModel<object>, object>;
    /**
     * Method to get collection related to given property
     * @param model
     * @param values
     * @protected
     */
    protected hasMany<R>(model: ModelConstructor<R>, values: ModelPayload[]): import("..").Intersected<IModel<object>, object>[];
}
