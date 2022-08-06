import { QueryResult } from "@apollo/client";
import { useCallback, useState } from "react";

export const useInfiniteQuery = (query: QueryResult<any, any>, dataField: string) => {
    const [fetchingMore, setFetchingMore] = useState(false)
    const [reachedLastPage, setReachedLastPage] = useState(false)


    const variablesChanged = () => {
        setReachedLastPage(false);
    }

    const fetchMore = useCallback(
        () => {
            if (!fetchingMore && !reachedLastPage) {
                setFetchingMore(true);

                query.fetchMore({
                    variables: {
                        skip: query.data?.[dataField].length,
                    }
                }).then((d) => {
                    if (d.data?.[dataField].length === 0)
                        setReachedLastPage(true)

                    setFetchingMore(false)
                })
            }
        }
        , [dataField, fetchingMore, query, reachedLastPage]
    )

    return {
        isFetchingMore: fetchingMore,
        fetchMore: fetchMore,
        variablesChanged // Call this function whenever other query vars beside take/skip changes.
    }
}
