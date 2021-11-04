import { IModel, MagicModel, ModelConstructor, ModelPayload } from '../contracts/models';
import { IIntention } from '../contracts';
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
     * @author Łukasz Jakubowski <lukasz.jakubowski@movecloser.pl>
     *
     * @template T, Payload - model type, intention payload
     *
     * @param [intention] {IIntention<Payload>}
     * @returns {IModel<T>}
     */
    applyIntention<Payload extends object>(intention: IIntention<Payload>): void;
    /**
     * @author Łukasz Jakubowski <lukasz.jakubowski@movecloser.pl>
     *
     * @template T, - model type
     *
     * @returns {IModel<T>}
     */
    clone<T>(): T;
    /**
     * Model property getter
     * @param property
     * @param defaultValue
     */
    get(property: string, defaultValue?: any): any;
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
    __get(property: string, defaultValue: any): any;
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
    protected hasOne<R>(model: ModelConstructor<R>, value: ModelPayload): MagicModel<object, IModel<object>>;
    /**
     * Method to get collection related to given property
     * @param model
     * @param values
     * @protected
     */
    protected hasMany<R>(model: ModelConstructor<R>, values: ModelPayload[]): MagicModel<object, IModel<object>>[];
}
