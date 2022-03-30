import { RootState } from "src/redux/store"

export type ModifyArgs = Partial<{
    store: Partial<RootState>, router: {
        routePath: string,
        currentPath: string
    }
}>


