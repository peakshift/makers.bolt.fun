import { motion } from "framer-motion";
import {
  ModalCard,
  modalCardVariants,
} from "src/Components/Modals/ModalsContainer/ModalsContainer";
import { IoClose } from "react-icons/io5";
import {
  MyProjectsQuery,
  Tournament,
  TournamentTrack,
  useMyProjectsQuery,
  useAddProjectToTournamentMutation,
  MeTournamentDocument,
  GetProjectsInTournamentDocument,
  GetTournamentByIdDocument,
} from "src/graphql";
import Button from "src/Components/Button/Button";
import BasicSelectInput from "src/Components/Inputs/Selects/BasicSelectInput/BasicSelectInput";
import React, { useState } from "react";
import InfoCard from "src/Components/InfoCard/InfoCard";
import { components, ValueContainerProps } from "react-select";
import { NotificationsService } from "src/services";
import { extractErrorMessage } from "src/utils/helperFunctions";
import { replaceModal, Direction } from "src/redux/features/modals.slice";
import { useAppDispatch } from "src/utils/hooks";
import { createRoute } from "src/utils/routing";

interface Props extends ModalCard {
  tournament: Pick<Tournament, "id" | "title" | "tracks">;
  myRegisteredProjectsIds: number[];
}

type Project = NonNullable<MyProjectsQuery["me"]>["projects"][number];

export default function AddProjectTournamentModal({
  onClose,
  direction,
  tournament,
  myRegisteredProjectsIds,
  ...props
}: Props) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedTrack, setSelectedTrack] = useState(tournament.tracks[0]);

  const dispatch = useAppDispatch();
  const query = useMyProjectsQuery();

  const [addProjectMutate, addProjectMutationsStatus] =
    useAddProjectToTournamentMutation({
      onError: (error) => {
        NotificationsService.error(
          extractErrorMessage(error) ??
            "Unexpected error happened, please try again",
          { error }
        );
      },
      refetchQueries: [MeTournamentDocument],
    });

  const onSubmitProject = () => {
    if (!selectedProject?.id || !selectedTrack.id)
      return NotificationsService.warn(
        "Select a project & track before submitting"
      );

    const project = { ...selectedProject };

    addProjectMutate({
      variables: {
        input: {
          project_id: selectedProject.id,
          tournament_id: tournament.id,
          track_id: selectedTrack.id,
        },
      },
      onCompleted: () => {
        dispatch(
          replaceModal({
            Modal: "ProjectAddedModal",
            direction: Direction.NEXT,
            props: {
              project,
              tournament,
            },
          })
        );
      },
      refetchQueries: [
        GetProjectsInTournamentDocument,
        MeTournamentDocument,
        GetTournamentByIdDocument,
      ],
    }).catch();
  };

  return (
    <motion.div
      custom={direction}
      variants={modalCardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="modal-card !overflow-auto max-w-[442px] rounded-xl relative"
    >
      <div className="p-24">
        <IoClose
          className="absolute text-body2 top-24 right-24 hover:cursor-pointer"
          onClick={onClose}
        />
        <h2 className="text-h5 font-bold text-center">Add project</h2>
      </div>
      <hr className="bg-gray-200" />
      <div className="flex flex-col gap-24 p-24">
        <p className="text-body4 text-gray-600">
          Enter your project to #NostrHackWeek.
        </p>

        <div>
          <p className="text-body5 text-gray-700 font-medium mb-8">
            Select your project
          </p>
          <BasicSelectInput
            isSearchable={false}
            isMulti={false}
            labelField="title"
            valueField="id"
            placeholder="Select a project"
            menuPosition="fixed"
            value={selectedProject}
            onChange={(v) => setSelectedProject(v)}
            options={
              query.data?.me?.projects.filter(
                (p) => !myRegisteredProjectsIds.includes(p.id)
              ) ?? []
            }
            ValueContainer={SelectProjectValueContainer}
            renderOption={(option) => (
              <div
                className={`
                                    flex items-center gap-12 my-4 px-16 py-12 rounded-12 text-gray-800 cursor-pointer
                                    ${
                                      !(option.isSelected || option.isFocused)
                                        ? "hover:bg-gray-50"
                                        : option.isSelected
                                        ? "bg-gray-100 text-gray-800"
                                        : "bg-gray-50"
                                    }
                                    `}
              >
                <img
                  src={option.data.thumbnail_image!}
                  className="w-24 aspect-square rounded-full object-cover"
                  alt=""
                />{" "}
                {option.data.title}
              </div>
            )}
          />
        </div>
        {!!selectedProject && (
          <div>
            <p className="text-body5 text-gray-700 font-medium mb-8">
              Select your project's track
            </p>
            <BasicSelectInput
              isSearchable={false}
              isMulti={false}
              labelField="title"
              valueField="id"
              placeholder="Select a track"
              menuPosition="fixed"
              value={selectedTrack}
              onChange={(v) => {
                if (v) setSelectedTrack(v);
              }}
              options={tournament.tracks}
              renderOption={(option) => {
                return (
                  <div
                    className={`
                                    flex items-center gap-16 my-4 px-16 py-12 rounded-12 text-gray-800 cursor-pointer
                                    ${
                                      !(option.isSelected || option.isFocused)
                                        ? "hover:bg-gray-50"
                                        : option.isSelected
                                        ? "bg-gray-100 text-gray-800"
                                        : "bg-gray-50"
                                    }
                                `}
                  >
                    {option.data.icon} {option.data.title}
                  </div>
                );
              }}
              ValueContainer={SelectTrackValueContainer}
            />
            <InfoCard className="mt-8">
              <span className="font-bold"> ℹ️ Tracks:</span> All projects will
              automatically be registered for the Grand Prize, however makers
              can select an additional track to enter.{" "}
              <a
                href="https://makers.bolt.fun/story/boltfun-tournaments-are-here--107"
                className="text-blue-500"
                target="_blank"
                rel="noreferrer"
              >
                Learn more about how our tracks work.
              </a>
            </InfoCard>
          </div>
        )}

        {!!selectedProject ? (
          <Button
            isLoading={addProjectMutationsStatus.loading}
            fullWidth
            color="primary"
            onClick={onSubmitProject}
          >
            {addProjectMutationsStatus.loading
              ? "Adding..."
              : "Enter project to tournament"}
          </Button>
        ) : (
          <>
            <div className="relative text-center">
              <hr className="bg-gray-100 w-full absolute top-1/2 left-0 -translate-y-1/2" />
              <span className="text-body6 text-gray-600 px-16 bg-white relative">
                OR
              </span>
            </div>
            <Button
              fullWidth
              color="primary"
              href={createRoute({ type: "edit-project" })}
              onClick={onClose}
            >
              Create new project
            </Button>
          </>
        )}
      </div>
    </motion.div>
  );
}

const SelectProjectValueContainer = ({
  children,
  ...props
}: ValueContainerProps<Project>) => {
  const { thumbnail_image, title } = props.getValue()[0] ?? {};
  return (
    <components.ValueContainer
      {...props}
      className="!p-0 !flex !bg-transparent hover:!bg-transparent"
    >
      <div
        className={`
                                    flex items-center gap-12 my-4 rounded-12 text-gray-800 cursor-pointer`}
      >
        {title ? (
          <>
            {" "}
            <img
              src={thumbnail_image!}
              className="w-24 aspect-square rounded-full object-cover"
              alt=""
            />{" "}
            {title}{" "}
          </>
        ) : (
          <>
            {" "}
            <div className="w-24 aspect-square rounded-full bg-gray-100 border border-gray-200" />{" "}
            Select a project{" "}
          </>
        )}
      </div>
      {React.cloneElement((children as any)[1])}
    </components.ValueContainer>
  );
};

const SelectTrackValueContainer = ({
  children,
  ...props
}: ValueContainerProps<TournamentTrack>) => {
  const { icon, title } = props.getValue()[0] ?? {};

  return (
    <components.ValueContainer
      {...props}
      className="!p-0 !flex !bg-transparent hover:!bg-transparent"
    >
      <span className="inline">
        {icon} {title}
      </span>
      {React.Children.map(children, (child: any) =>
        child && [components.SingleValue].indexOf(child.type) === -1
          ? child
          : null
      )}
    </components.ValueContainer>
  );
};
