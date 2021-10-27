/*
 * Copyright (c) 2021 Move Closer
 */

import { SingleToken } from './single';
import { DoubleToken } from './double';
import { SolidToken } from './solid';
export declare const tokenDriversMap: {
    single: typeof SingleToken;
    double: typeof DoubleToken;
    solid: typeof SolidToken;
};
