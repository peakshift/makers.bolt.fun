import React, { PropsWithChildren } from 'react'
import { ProjectDetailsQuery } from 'src/graphql'

interface Props {
    permissions: ProjectDetailsQuery['getProject']['permissions']
}

interface State {
    permissions: ProjectDetailsQuery['getProject']['permissions']
}

const context = React.createContext<State | undefined>(undefined)

const UpdateProjectContextProvider = React.memo(function (props: PropsWithChildren<Props>) {

    return (
        <context.Provider value={{ permissions: props.permissions }}>
            {props.children}
        </context.Provider>
    )
})

export default UpdateProjectContextProvider;

export const useUpdateProjectContext = () => {
    const res = React.useContext(context);

    if (!res) throw new Error("No context provider was found for useUpdateProjectContext")

    return res;
}
