import Button from 'src/Components/Button/Button';
import { useAppDispatch } from 'src/utils/hooks';
import { openModal } from 'src/redux/features/modals.slice';


interface Props {

}

export default function AccountCard({ }: Props) {

    const dispatch = useAppDispatch()

    const connectNewWallet = () => {
        dispatch(openModal({ Modal: "LinkingAccountModal" }))
    }


    return (
        <div className="rounded-16 bg-white border-2 border-gray-200 p-24">
            <p className="text-body2 font-bold">Account Settings</p>


            <div className='mt-24 flex flex-col gap-16'>
                <p className="text-body3 font-bold">Linked Wallets</p>
                <p className="text-body4 text-gray-600">
                    These are the wallets that you can login to this account from.
                    <br />
                    You can add a new wallet from the button below.
                </p>
                <Button color='primary' className='' onClick={connectNewWallet}>
                    Connect new wallet ⚡
                </Button>
            </div>


        </div>
    )
}
