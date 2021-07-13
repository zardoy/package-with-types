import React from "react";

import got from "got/dist/source";

// RESOLVE TYPES

// downside: losing meaningful type name
// BUT extremely useful for quick recap

// typescript compiler won't resolve this at compilation-time
export type MegaType = "string" | "string" | string;

type Options1 = Partial<{
    // JSDoc default annotations should be generated from source code automatically.
    /** @default true */
    foo: boolean,
    bar: string
}>;

type ComponentWithType<T> = {
    megaComponentValue: boolean
} & T extends string ? {
    type: T
} : {};

interface CreateComponentReturn extends ComponentWithType<"component"> {
    additionalProp: number
}

export const fabulousCreateComponent = (options?: Options1): CreateComponentReturn => {
    return null;
}

type MagicLevelType = "impeccable" | "groundbreaking";

export const createAnotherComponent = (level: MagicLevelType, gridPos: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10) => {}

type MagicFunction = (
    /** @default "Hi!" */
    message: string,
    /** @default process.env.USER */
    user: string
) => void;

export const sayHi: MagicFunction = () => {}

// DO NOT RESOLVE

// 1. @types/*
// 2. libs (especially lib.d.ts)
// 3. peerDeps?

const readFile = async (filename: string, { normalize: enableSuperCoolOption = true }: { 
    /** @default true */
    normalize: boolean,
    // do not resolve
    encoding: BufferEncoding
 }): Promise<{ content: string }> => { return null; }

// map some types? RequestInit -> FetchOptions
export const superCoolFetch = <T>(endpoint: any, fetchOptions: Parameters<typeof fetch>[1]): T => {
    return null;
}

// actually it is bad example because Parameters doesn't work properly with overloaded function, so here it just returns got Options
export const maybeAnotherCoolFetcher = (gotOptions: Parameters<typeof got>[0]) => {
}

// okay, I think I went too far

// REACT

export const AwesomeElement: React.FC<{ customProp: string } & Pick<React.ComponentProps<"div">, "className" | "style">> = () => null

// I'm still not sure about the output

/* 
<AwesomeElement
    customProp={string}
    ...extends <div className style />
/>
// important: we do not specify types on div's props 
*/