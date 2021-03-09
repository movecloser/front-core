import { Intersected, Proxable } from '../contracts/support'

declare global {
  interface ProxyConstructor {
    new<TSource extends object, TTarget extends object> (
      target: TSource,
      handler: ProxyHandler<TSource>
    ): Intersected<TSource, TTarget>;
  }
}

/**
 * This helper returns proxified class.
 *
 * @author  Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
export function createProxy<Source extends Proxable<any>, Target extends object> (target: any) {
  return new Proxy<Source, Target>(target, {
    /* istanbul ignore next */
    apply (target: Source, thisArg: any, argArray?: any): any {
      return target.__invoke(...argArray)
    },
    get (target: Source, p: PropertyKey): any {
      if (p in Reflect.getPrototypeOf(target)) {
        return function (...arg: any) {
          // @ts-ignore
          return target[p](...arg)
        }
      }

      return target.__get(p as string)
    },
    getOwnPropertyDescriptor (target: Source): PropertyDescriptor | undefined {
      return {
        value: target.__toObject(),
        enumerable: true,
        configurable: true
      }
    },
    ownKeys (target: Source): PropertyKey[] {
      return [ ...Object.keys(target.__toObject()) ]
    },
    set (target: Source, p: PropertyKey, value: any): boolean {
      return target.__set(p as string, value)
    }
  })
}
