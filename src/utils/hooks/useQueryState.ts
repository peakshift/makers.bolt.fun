import { useCallback, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import qs from "qs"




export const useQueryState = (state?: Record<string, any> | null) => {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {

        const existingQueries = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        })

        const queryString = qs.stringify(
            { ...existingQueries, ...(state ?? {}) },
            { skipNulls: true }
        )

        navigate(`${location.pathname}?${queryString}`, { replace: true });

    }, [location.pathname, location.search, navigate, state]);


    return qs.parse(location.search, { ignoreQueryPrefix: true })
}