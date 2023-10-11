import Button from "src/Components/Button/Button";
import { useAppDispatch } from "src/utils/hooks";
import { openModal } from "src/redux/features/modals.slice";
import Card from "src/Components/Card/Card";
import { UserPrivateData } from "src/graphql";
import LinkedEmail from "./LinkedEmail";

export type WalletKeyType = UserPrivateData["emails"][number];

interface Props {
  value: WalletKeyType[];
  onChange: (newValue: WalletKeyType[]) => void;
}

export default function LinkedEmailsCard({ value, onChange }: Props) {
  const dispatch = useAppDispatch();

  const linkNewEmail = () => {
    dispatch(openModal({ Modal: "LinkingNewEmailModal" }));
  };

  const unlinkEmail = (idx: number) => {
    onChange([...value.slice(0, idx), ...value.slice(idx + 1)]);
  };

  const hasMultiWallets = value.length > 1;

  return (
    <Card>
      <p className="text-body2 font-bold">📧 Linked Emails</p>
      <p className="text-body4 text-gray-600 mt-8">
        These are the emails that you can use to login to this account.
        <br />
        You can add up to 2 different emails.
      </p>
      {value.length > 0 ? (
        <div className="mt-24 flex flex-col gap-16">
          <ul className="mt-8 relative flex flex-col gap-8">
            {value.map((item, idx) => (
              <LinkedEmail
                key={idx}
                hasMultiWallets={hasMultiWallets}
                walletKey={item}
                onDelete={() => unlinkEmail(idx)}
              />
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-24 text-gray-400 italic font-medium">
          You haven't linked any emails yet. Please note that if you lose access
          to your lightning wallet, you might not be able to login back to this
          account, thus it's recommended to link at least one email.
        </p>
      )}
      {value.length < 2 && (
        <Button
          color="none"
          size="sm"
          className="mt-16 text-gray-600 hover:bg-gray-50"
          onClick={linkNewEmail}
        >
          {value.length === 0 ? "+ Link Email" : "+ Link Another Email"}
        </Button>
      )}
      {/* <InfoCard className="mt-24">
        <span className="font-bold">💡 Note:</span> if you link a wallet that
        was used to create another account previously, you won't be able to
        login to that account until you remove it from here.
      </InfoCard> */}
    </Card>
  );
}
