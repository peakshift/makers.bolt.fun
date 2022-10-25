import { createContext, PropsWithChildren, useCallback, useContext, useState } from "react";
import { ProjectsFilters } from "./Filters/FiltersModal";
import { getFiltersFromUrl, removeEmptyFitlers } from "./helpers";


interface State {
    filters: Partial<ProjectsFilters> | null,
    updateFilters: (value: Partial<ProjectsFilters>) => void,
    removeFilter: (filter: keyof ProjectsFilters) => void
}

const context = createContext<State | null>(null);

interface Props {
}

export const ProjectsFiltersProvider = (props: PropsWithChildren<Props>) => {

    const [filters, setFilters] = useState<Partial<ProjectsFilters> | null>(getFiltersFromUrl);

    const updateFilters = useCallback((new_filters: Partial<ProjectsFilters>) => {
        setFilters(removeEmptyFitlers(new_filters));
    }, [])

    const removeFilter = useCallback((filter: keyof ProjectsFilters) => {
        let res = { ...filters };
        delete res[filter];
        setFilters(res);
    }, [filters]);

    return <context.Provider value={{ filters, updateFilters, removeFilter }}>
        {props.children}
    </context.Provider>
}

export const useProjectsFilters = () => {
    const _value = useContext(context);
    if (!_value) throw new Error("No provider was found for Projects Filters Context");

    return _value;
}