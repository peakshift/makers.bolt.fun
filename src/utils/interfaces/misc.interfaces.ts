
export type Tag = {
    id: number
    title: string
}


export type ListProps<T> = {
    items?: T[]
    isLoading?: boolean;
    isFetching?: boolean;
    onReachedBottom?: () => void
}

export type Image = string;