import { IIntention, MappingConfig } from '../contracts/support';
/**
 * An intention is the inverted Adapter that translate model structure into api data structure.
 *
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
export declare abstract class AbstractIntention<T> implements IIntention<T> {
    protected abstract map: MappingConfig;
    protected payload: T;
    constructor(payload: T);
    toModel(): T;
    toRequest(): any;
}
