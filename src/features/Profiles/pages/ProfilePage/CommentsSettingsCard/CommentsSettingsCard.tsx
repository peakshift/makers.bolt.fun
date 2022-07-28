import { useToggle } from '@react-hookz/web'
import { Nullable } from 'remirror';
import Button from 'src/Components/Button/Button';
import { CONSTS } from 'src/utils';

interface Props {
    isOwner?: boolean;
    nostr_pub_key: Nullable<string>;
    nostr_prv_key: Nullable<string>;

}

export default function CommentsSettingsCard({ nostr_prv_key, nostr_pub_key, isOwner }: Props) {


    return (
        <div className="rounded-16 bg-white border-2 border-gray-200 p-24">
            <p className="text-body2 font-bold">Nostr Settings (experimental)</p>
            <p className="mt-8 text-body4 text-gray-600">
                Our commenting system is experimental and uses Nostr to store and relay your messages and replies to our own relay, as well as relays ran by other people in the community.
                We generate Nostr keys for you since there are no popular wallets which support it.
            </p>

            {nostr_prv_key && <>
                <p className="text-body4 font-bold mt-24">
                    Your Nostr Private Key
                </p>
                <div className="input-wrapper mt-8 relative">
                    <input
                        type={'text'}
                        className="input-text"
                        value={nostr_prv_key}
                    />
                </div>
            </>}
            <p className="text-body4 font-bold mt-24">
                Your Nostr Public Key
            </p>
            <div className="input-wrapper mt-8 relative">
                <input

                    type='text'
                    className="input-text"
                    value={nostr_pub_key!}
                />
            </div>

            <p className="text-body4 font-bold mt-24">
                Connect your Nostr identity
            </p>
            <div className="mt-8 py-12 relative">
                <p className="text-body4 text-gray-400 font-bold">
                    🚧 Coming Soon 🚧
                </p>
            </div>
            <p className="text-body4 font-bold mt-24">
                Connected Relays
            </p>
            <ul className="mt-8 relative flex flex-col gap-8">
                {CONSTS.DEFAULT_RELAYS.map((url, idx) => <li key={idx} className="text-body4 border-b py-12 px-16 bg-gray-100 border-2 border-gray-200 rounded-16">{url}</li>)}
            </ul>
        </div>
    )
}
