export type UnionToObjectKeys<O, Key extends keyof O, Value = string> = { [EE in NonNullable<O[Key]> extends string ? NonNullable<O[Key]> : never]: Value }

export type Id<T> = {} & { [P in keyof T]: T[P] } // flatens out the types to make them more readable can be removed

export type RemoveCommonValues<T, TOmit> = {
    [P in keyof T]: TOmit extends Record<P, infer U> ? Exclude<T[P], U> : T[P]
}

export type ValueOf<T> = Id<T[keyof T]>;

export type OmitId<T, Id extends string = 'id'> = Omit<T, Id>
