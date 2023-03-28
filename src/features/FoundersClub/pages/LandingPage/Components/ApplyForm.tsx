import React, { useState } from "react";
import { ValueContainerProps, components } from "react-select";
import Button from "src/Components/Button/Button";
import BasicSelectInput from "src/Components/Inputs/Selects/BasicSelectInput/BasicSelectInput";
import { MyProjectsQuery, useMyProjectsQuery } from "src/graphql";
import { useAppSelector } from "src/utils/hooks";

type Project = NonNullable<MyProjectsQuery["me"]>["projects"][number];

export default function ApplyForm() {
  const [reasonInput, setReasonInput] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const isLoggedIn = useAppSelector((state) => !!state.user.me?.id);

  const query = useMyProjectsQuery();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSelectedProject(null);
    setReasonInput("");
  };

  return (
    <form
      className="bg-gray-900 flex flex-col items-center gap-40 p-24 md:p-42 rounded-b md:rounded-r"
      onSubmit={onSubmit}
    >
      <div className="">
        <h2 className="text-body1 text-center font-bolder text-primary-500 bg-gradient-to-r from-blue-500 to-violet-400 bg-clip-text text-transparent">
          Apply for membership
        </h2>
        <p className="text-white text-center font-bold text-body2 mt-12">
          You need to already be a maker and have your profile filled out before
          applying.
        </p>
      </div>
      <div className={`w-full`}>
        <label
          htmlFor="select-project"
          className="text-white mb-8 inline-block"
        >
          Project
        </label>
        <BasicSelectInput
          inputId="select-project"
          isSearchable={false}
          isMulti={false}
          labelField="title"
          valueField="id"
          placeholder="Select a project"
          value={selectedProject}
          onChange={(v) => setSelectedProject(v)}
          options={query.data?.me?.projects ?? []}
          ValueContainer={SelectProjectValueContainer}
          disabled={!isLoggedIn}
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
      <div className="w-full">
        <label htmlFor="reason-input" className="text-white mb-8 inline-block">
          Reason
        </label>
        <div className={`input-wrapper relative`}>
          <input
            id="reason-input"
            type="text"
            className="input-text"
            placeholder="Let us know why you want to join"
            value={reasonInput}
            onChange={(e) => setReasonInput(e.target.value)}
            disabled={!isLoggedIn}
          />
        </div>
      </div>
      <Button type="submit" color="primary" fullWidth disabled={!isLoggedIn}>
        Apply {isLoggedIn ? "" : " (login to apply)"}
      </Button>
    </form>
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
