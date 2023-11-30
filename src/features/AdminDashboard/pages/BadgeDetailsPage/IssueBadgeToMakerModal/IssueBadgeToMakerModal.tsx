import { motion } from "framer-motion";
import {
  ModalCard,
  modalCardVariants,
} from "src/Components/Modals/ModalsContainer/ModalsContainer";
import { IoClose } from "react-icons/io5";
import { useIssueMakerBadgeMutation, User } from "src/graphql";
import { FormEvent, FormEventHandler, useState } from "react";
import Button from "src/Components/Button/Button";
import IconButton from "src/Components/IconButton/IconButton";
import { NotificationsService } from "src/services";
import { extractErrorMessage, generateId } from "src/utils/helperFunctions";
import UsersInput from "src/Components/Inputs/UsersInput/UsersInput";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { FiPlus } from "react-icons/fi";

interface Props extends ModalCard {
  badgeId: number;
}

export default function IssueBadgeToMakerModal({
  badgeId,
  onClose,
  direction,
}: Props) {
  const [makers, setMakers] = useState<
    Pick<User, "id" | "name" | "avatar" | "jobTitle">[]
  >([]);
  const [metadataEntries, setMetadataEntries] = useState<
    { id: string; emoji: string; label?: string; value: string }[]
  >([]);

  const [mutate, { loading }] = useIssueMakerBadgeMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const metaData = metadataEntries.map((e) => ({
      emoji: e.emoji,
      label: e.label,
      value: e.value,
    }));

    if (makers.length === 0)
      return NotificationsService.warn(
        "Please select at least one maker to issue badge to"
      );

    try {
      await mutate({
        variables: {
          input: {
            badge_id: badgeId,
            user_ids: makers.map((m) => m.id),
            metaData,
          },
        },
      });
      NotificationsService.success("Badge issued to makers successfully");
      onClose?.();
    } catch (error) {
      NotificationsService.error(
        extractErrorMessage(error) ?? "Something went wrong"
      );
    }
  };

  return (
    <motion.div
      custom={direction}
      variants={modalCardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="modal-card max-w-[542px] p-24 rounded-xl relative !overflow-visible"
    >
      <IoClose
        className="absolute text-body2 top-24 right-24 hover:cursor-pointer"
        onClick={onClose}
      />
      <h2 className="text-h5 font-bold text-center">Issue Badge to Makers</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-stretch gap-24 mt-32 "
      >
        <UsersInput
          placeholder="Search for makers by username"
          onSelect={(s) => {
            if (makers.find((m) => m.id === s.id)) return;
            setMakers([...makers, s]);
          }}
        />

        <ul className="flex flex-col gap-8">
          {makers.map((maker) => (
            <li key={maker.id} className="flex items-center gap-8 py-8">
              <Avatar width={48} src={maker.avatar} />
              <div className="overflow-hidden">
                <p
                  className={`'text-body4' text-black font-medium overflow-hidden text-ellipsis whitespace-nowrap`}
                >
                  {maker.name}
                </p>
                <p className="text-gray-600">{maker.jobTitle}</p>
              </div>
              <IconButton
                className="text-gray-500 ml-auto"
                aria-label="Remove maker"
                onClick={() =>
                  setMakers(makers.filter((m) => m.id !== maker.id))
                }
              >
                <IoClose />
              </IconButton>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-16">
          <p className="text-body1 font-bold">Metadata</p>

          <ul className="flex flex-col gap-8">
            {metadataEntries.map((entry) => (
              <li key={entry.id} className="flex items-end gap-8">
                <div className="grid grid-cols-[60px_1fr_1fr] gap-8">
                  <div className="min-w-0">
                    <label htmlFor="emoji-input" className="text-body5">
                      Emoji<sup className="text-red-500">*</sup>
                    </label>
                    <div className="input-wrapper mt-8 relative">
                      <input
                        id="emoji-input"
                        autoFocus
                        type="text"
                        className="input-text !py-4 !px-8 !rounded-sm"
                        placeholder=""
                        required
                        value={
                          metadataEntries.find((e) => e.id === entry.id)?.emoji
                        }
                        onChange={(event) =>
                          setMetadataEntries((curr) =>
                            curr.map((e) =>
                              e.id === entry.id
                                ? { ...e, emoji: event.target.value }
                                : e
                            )
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <label htmlFor="label-input" className="text-body5">
                      Label
                    </label>
                    <div className="input-wrapper mt-8 relative">
                      <input
                        id="label-input"
                        type="text"
                        className="input-text !py-4 !px-8 !rounded-sm"
                        placeholder="Project"
                        value={
                          metadataEntries.find((e) => e.id === entry.id)?.label
                        }
                        onChange={(event) =>
                          setMetadataEntries((curr) =>
                            curr.map((e) =>
                              e.id === entry.id
                                ? { ...e, label: event.target.value }
                                : e
                            )
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <label htmlFor="value-input" className="text-body5">
                      Value<sup className="text-red-500">*</sup>
                    </label>
                    <div className="input-wrapper mt-8 relative">
                      <input
                        id="value-input"
                        type="text"
                        className="input-text !py-4 !px-8 !rounded-sm"
                        placeholder="BOLT🔩FUN"
                        required
                        value={
                          metadataEntries.find((e) => e.id === entry.id)?.value
                        }
                        onChange={(event) =>
                          setMetadataEntries((curr) =>
                            curr.map((e) =>
                              e.id === entry.id
                                ? { ...e, value: event.target.value }
                                : e
                            )
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
                <IconButton
                  className="text-gray-500 ml-auto"
                  aria-label="Remove maker"
                  onClick={() =>
                    setMetadataEntries((curr) =>
                      curr.filter((e) => e.id !== entry.id)
                    )
                  }
                >
                  <IoClose />
                </IconButton>
              </li>
            ))}
          </ul>

          <Button
            size="sm"
            color="gray"
            className="self-start"
            onClick={() =>
              setMetadataEntries((curr) => [
                ...curr,
                { id: generateId(), emoji: "", label: "", value: "" },
              ])
            }
          >
            Add Entry <FiPlus className="ml-4" />
          </Button>
        </div>

        <Button color="primary" fullWidth isLoading={loading} type="submit">
          Submit
        </Button>
      </form>
    </motion.div>
  );
}
