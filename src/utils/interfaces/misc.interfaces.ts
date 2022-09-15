import { Tag as ApiTag } from "src/graphql";

export type Tag = ApiTag;


export type ListComponentProps<T> = {
    items?: T[]
    isLoading?: boolean;
    isFetching?: boolean;
    onReachedBottom?: () => void
}

export type ControlledStateHandler<T, IsMulti extends boolean> = {
    isMulti?: IsMulti;
    value?:
    | (true extends IsMulti ? T[] : T)
    | null
    onChange?: (
        nv: | (true extends IsMulti ? T[] : T)
            | null
    ) => void
    onBlur?: () => void
}


export type Override<A, B> = Omit<A, keyof B> & B;


export type Image = string;