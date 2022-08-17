import LinkedAccountsCard from './LinkedAccountsCard/LinkedAccountsCard';
import CommentsSettingsCard from './CommentsSettingsCard/CommentsSettingsCard';
import { useMyProfilePreferencesQuery, useUpdateUserPreferencesMutation } from 'src/graphql';
import LoadingPage from 'src/Components/LoadingPage/LoadingPage';
import NotFoundPage from "src/features/Shared/pages/NotFoundPage/NotFoundPage";


interface Props {
}



export default function PreferencesTab() {

    const query = useMyProfilePreferencesQuery();
    const [mutate, mutationStatus] = useUpdateUserPreferencesMutation();

    if (query.loading)
        return <LoadingPage />

    if (!query.data?.me)
        return <NotFoundPage />

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
            <div className="col-span-2 flex flex-col gap-24">
                <LinkedAccountsCard walletsKeys={query.data.me.walletsKeys} />
                <CommentsSettingsCard nostr_prv_key={query.data.me.nostr_prv_key} nostr_pub_key={query.data.me.nostr_pub_key} />
            </div>
        </div>
    )
}
