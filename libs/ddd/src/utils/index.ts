export type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export type PartialExceptFor<T, TRequired extends keyof T> = Partial<T> & Pick<T, TRequired>;
