import { Intersected, Proxable } from '../contracts/support';
declare global {
    interface ProxyConstructor {
        new <TSource extends object, TTarget extends object>(target: TSource, handler: ProxyHandler<TSource>): Intersected<TSource, TTarget>;
    }
}
/**
 * This helper returns proxified class.
 *
 * @author  Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
export declare function createProxy<Source extends Proxable<any>, Target extends object>(target: any): Intersected<Source, Target>;
