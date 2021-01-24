export interface IIntention<T> {
    toModel: () => T;
    toRequest: () => any;
}
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
    Function = "function"
}
export {};
