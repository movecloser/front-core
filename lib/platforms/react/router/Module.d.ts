/// <reference types="react" />
import { RoutesModuleProps } from './contracts';
/**
 * Compose valid router path by trimming trailling slashes & prevent againts
 * any slash duplication.
 */
export declare function composeValidPath(parts: string[]): string;
/**
 * This component renders single module taking guard function into consideration.
 *
 * @author Łukasz Jakubowski <lukasz.jakubowski@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @licence MIT
 */
export declare const Module: (props: RoutesModuleProps) => JSX.Element;
