import { useParams } from "react-router-dom"
import LoadingPage from "src/Components/LoadingPage/LoadingPage"
import NotFoundPage from "src/features/Shared/pages/NotFoundPage/NotFoundPage"
import { useProfileQuery } from "src/graphql"
import AboutCard from "./AboutCard/AboutCard"



export default function ProfilePage() {

    const { id } = useParams()
    const profileQuery = useProfileQuery({
        variables: {
            profileId: Number(id!),
        },
        skip: isNaN(Number(id)),
    })


    if (profileQuery.loading)
        return <LoadingPage />

    if (!profileQuery.data?.profile)
        return <NotFoundPage />

    return (
        <div className="grid gap-24"
            style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
        >
            <aside></aside>
            <main>
                <AboutCard user={profileQuery.data.profile} />
            </main>
            <aside></aside>
        </div>
    )
}
