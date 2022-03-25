import ASSETS from "src/assets";
import { MOCK_DATA } from "./data";

export function getCategory(id: number) {
    return {
        ...MOCK_DATA.categories.find(c => c.id === id),
        project: MOCK_DATA.projects.filter(p => p.category.id === id)
    }
}


export function projectsByCategory(id: number) {
    return MOCK_DATA.projects.filter(p => p.category.id === id)
}

export function allCategories() {
    return MOCK_DATA.categories.map(c => ({
        ...c,
        project: projectsByCategory(c.id)
    }))
}

export function newProjects() {
    return MOCK_DATA.projects;
}

export function getProject(projectId: number) {
    return MOCK_DATA.projects.find(p => p.id === projectId)
}

export function searchProjects(search: string) {
    return MOCK_DATA.projects.filter(project => {
        const regexSearch = new RegExp(search, 'i')
        return regexSearch.test(project.title) || regexSearch.test(project.category.title)
    })
}

export function hottestProjects() {
    return MOCK_DATA.projects.sort((p1, p2) => p2.votes_count - p1.votes_count).slice(0, 20)

}