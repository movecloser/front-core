export interface IIntention<T> {
    toModel: () => T;
    toRequest: () => any;
}
export declare type Intersected<A, B> = A & B;
export declare type MappingConfig = {
    [key: string]: MappingInstruction | string;
};
interface MappingDriver {
    value?: MappingFunction | string;
    map?: MappingConfig;
    target?: string;
}
export declare type MappingFunction = (toMap: any) => any;
export interface MappingInstruction extends MappingDriver {
    type: MappingTypes;
}
export declare enum MappingTypes {
    Adapter = "adapter",
    Function = "function",
    Self = "self"
}
export interface Proxable<O> extends Object {
    __get(property: string, defaultValue: any): any;
    __invoke(...data: any): any;
    __set(property: string, value: any): boolean;
    __toObject(): O;
}
export {};
