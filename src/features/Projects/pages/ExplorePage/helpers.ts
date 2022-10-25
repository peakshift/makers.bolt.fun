
import { useQueryState } from 'src/utils/hooks/useQueryState';
import qs from "qs"
import { useLocation, useNavigate } from 'react-router-dom';
import { ProjectsFilters } from './Filters/FiltersModal';
import { useEffect } from 'react';

export function getFiltersFromUrl(): Partial<ProjectsFilters> {
    const qsValues = qs.parse(window.location.search, { ignoreQueryPrefix: true }) as Partial<ProjectsFilters>;
    return removeEmptyFitlers(qsValues)
}

export function removeEmptyFitlers(filters: Partial<ProjectsFilters>): Partial<ProjectsFilters> {
    let res: Partial<ProjectsFilters> = {}

    if (filters.yearFounded && filters.yearFounded !== 'any')
        res.yearFounded = filters.yearFounded;

    if (filters.projectLicense && filters.projectLicense !== 'any')
        res.projectLicense = filters.projectLicense;

    if (filters.projectStatus && filters.projectStatus !== 'any')
        res.projectStatus = filters.projectStatus;

    if (filters.categories && filters.categories?.length > 0)
        res.categories = filters.categories;

    if (filters.tags && filters.tags?.length > 0)
        res.tags = filters.tags;

    return res;
}


export const useUpdateUrlWithFilters = (state?: Partial<ProjectsFilters> | null) => {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {

        const queryString = qs.stringify(
            removeEmptyFitlers(state ?? {}),
            { skipNulls: true }
        )

        navigate(`${location.pathname}?${queryString}`, { replace: true });

    }, [location.pathname, location.search, navigate, state]);

}

