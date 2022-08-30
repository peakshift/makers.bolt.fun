import Button from 'src/Components/Button/Button';
import { useAppDispatch } from 'src/utils/hooks';
import { openModal } from 'src/redux/features/modals.slice';
import Card from 'src/Components/Card/Card';
import { MyProfile } from 'src/graphql';
import WalletKey from './WalletKey';


export type WalletKeyType = MyProfile['walletsKeys'][number]

interface Props {
    value: WalletKeyType[],
    onChange: (newValue: WalletKeyType[]) => void
}



export default function LinkedAccountsCard({ value, onChange }: Props) {

    const dispatch = useAppDispatch();

    const connectNewWallet = () => {
        dispatch(openModal({ Modal: "LinkingAccountModal" }))
    }

    const updateKeyName = (idx: number, newName: string) => {
        onChange(value.map((item, i) => {
            if (i === idx)
                return {
                    ...item,
                    name: newName
                }
            return item;
        }))
    }

    const deleteKey = (idx: number,) => {
        onChange([...value.slice(0, idx), ...value.slice(idx + 1)])
    }


    return (
        <Card>
            <p className="text-body2 font-bold">🔐 Linked Wallets</p>
            <p className="text-body4 text-gray-600 mt-8">
                These are the wallets that you can login to this account from. You can add up to 3 wallets.
            </p>
            <div className='mt-24 flex flex-col gap-16'>
                <ul className="mt-8 relative flex flex-col gap-8">
                    {value.map((item, idx) =>
                        <WalletKey
                            key={idx}
                            walletKey={item}
                            onRename={v => updateKeyName(idx, v)}
                            onDelete={() => deleteKey(idx)}
                        />
                    )}
                </ul>
            </div>
            {value.length < 3 &&
                <Button color='none' size='sm' className='mt-16 text-gray-600 hover:bg-gray-50' onClick={connectNewWallet}>
                    + Add another wallet
                </Button>}
            <p className="text-body5 text-gray-400 mt-24"><span className="font-bold">Note</span>: if you link a wallet that was used to create another account previously, you won't be able to login to that account until you remove it from here.</p>
        </Card>
    )
}
