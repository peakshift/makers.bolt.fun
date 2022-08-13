import { Nullable } from 'remirror';
import CommentsSettingsCard from './CommentsSettingsCard/CommentsSettingsCard';


interface Props {
    isOwner?: boolean;
    nostr_pub_key: Nullable<string>;
    nostr_prv_key: Nullable<string>;

}

export default function PreferencesTab({ nostr_prv_key, nostr_pub_key, isOwner }: Props) {

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
            <div className="col-span-2">
                <CommentsSettingsCard nostr_prv_key={nostr_prv_key} nostr_pub_key={nostr_pub_key} />
            </div>
        </div>
    )
}
