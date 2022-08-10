import { useToggle } from '@react-hookz/web'
import { FaChevronDown } from 'react-icons/fa';
import { Nullable } from 'remirror';
import Button from 'src/Components/Button/Button';
import CopyToClipboard from 'src/Components/CopyToClipboard/CopyToClipboard';
import IconButton from 'src/Components/IconButton/IconButton';
import { CONSTS } from 'src/utils';
import { motion } from "framer-motion";


interface Props {
    isOwner?: boolean;
    nostr_pub_key: Nullable<string>;
    nostr_prv_key: Nullable<string>;

}

export default function CommentsSettingsCard({ nostr_prv_key, nostr_pub_key, isOwner }: Props) {

    const [relaysDropdownOpen, toggleRelaysDropdownOpen] = useToggle(false)


    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
            <div className="col-span-2 rounded-16 bg-white border-2 border-gray-200 p-24">
                <p className="text-body2 font-bold">💬 Nostr comments <span className="bg-green-50 text-green-500 text-body5 font-medium py-4 px-12 rounded-48 ml-8">Experimental</span></p>
                <p className="mt-8 text-body4 text-gray-600">
                    Our commenting system is experimental and uses Nostr to store and relay your messages and replies to our own relay, as well as relays ran by other people in the community.
                    We generate Nostr keys for you since there are no popular wallets which support it.
                </p>

                <div className='mt-24 flex flex-col gap-16'>
                    <p className="text-body3 font-bold">Nostr keys</p>
                    {nostr_prv_key && <div>
                        <p className="text-body5 font-bold">
                            Your Nostr Private Key
                        </p>
                        <div className="input-wrapper mt-8 relative">
                            <input
                                type={'password'}
                                className="input-text"
                                defaultValue={nostr_prv_key}
                                readOnly
                            />

                            <CopyToClipboard text={nostr_prv_key} />
                        </div>
                    </div>}
                    <div>
                        <p className="text-body5 font-bold">
                            Your Nostr Public Key
                        </p>
                        <div className="input-wrapper mt-8 relative">
                            <input
                                type='text'
                                className="input-text"
                                defaultValue={nostr_pub_key!}
                                readOnly
                            />
                            <CopyToClipboard text={nostr_pub_key ?? ''} />
                        </div>
                    </div>

                </div>

                {/* <p className="text-body4 font-bold mt-24">
                Connect your Nostr identity
            </p>
            <div className="mt-8 py-12 relative">
                <p className="text-body4 text-gray-400 font-bold">
                    🚧 Coming Soon 🚧
                </p>
            </div> */}
                <div className='mt-24'>
                    <div className="flex justify-between">
                        <p className="text-body4 font-bold">
                            Nostr relays
                        </p>
                        <IconButton onClick={() => toggleRelaysDropdownOpen()}>
                            <motion.div
                                animate={{ rotate: relaysDropdownOpen ? 180 : 0 }}
                            >
                                <FaChevronDown />
                            </motion.div>
                        </IconButton>
                    </div>
                    {relaysDropdownOpen &&
                        <motion.ul
                            initial={{ y: '-50%', opacity: 0 }}
                            animate={{ y: '0', opacity: 1 }}
                            className="mt-8 relative flex flex-col gap-8">
                            {CONSTS.DEFAULT_RELAYS.map((url, idx) => <li key={idx} className="text-body4 border-b py-12 px-16 border border-gray-200 rounded-16">{url}</li>)}
                        </motion.ul>}
                </div>

                <Button color='gray' fullWidth disabled className='mt-24'>
                    Connect your Nostr ID (coming soon)
                </Button>
            </div>
        </div>
    )
}
