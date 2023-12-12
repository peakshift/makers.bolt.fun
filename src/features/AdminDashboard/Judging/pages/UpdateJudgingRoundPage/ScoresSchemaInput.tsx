import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { FiTrash2 } from "react-icons/fi";
import Button from "src/Components/Button/Button";
import IconButton from "src/Components/IconButton/IconButton";
import { TournamentJudgingRoundScoresSchemaInput } from "src/graphql";
import { generateId } from "src/utils/helperFunctions";
import { CreateJudgingRoundFormType } from "./CreateJudgingRoundPage";

// type ScoresSchemaInput = {
//     key: Scalars['String'];
//     label: Scalars['String'];
//     required?: InputMaybe<Scalars['Boolean']>;
//     type: Scalars['String'];
//   }[]

const inputTypesOptions = [
  {
    label: "Range",
    value: "range",
  },
  {
    label: "Checkbox (Can select multiple)",
    value: "checkbox",
  },
  {
    label: "Radio (Can select one)",
    value: "radio",
  },
];

export default function ScoresSchemaInput() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<CreateJudgingRoundFormType>();

  const { fields, append, remove } = useFieldArray<
    CreateJudgingRoundFormType,
    "scores_schema"
  >({
    // control,
    name: "scores_schema",
  });

  console.log(errors);

  return (
    <div>
      {/* List of all the scores inputs, their: label, type. & a button to remove the entry*/}
      {fields.length > 0 && (
        <ul className="flex flex-col gap-8 mb-16">
          {fields.map((field, index) => (
            <li key={field.id}>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-16">
                <div>
                  <label
                    htmlFor={`label-input-${field.id}`}
                    className="text-body5"
                  >
                    Label<sup className="text-red-500">*</sup>
                  </label>
                  <div className="input-wrapper mt-8 relative">
                    <input
                      id={`label-input-${field.id}`}
                      type="text"
                      className="input-text"
                      placeholder="e.g. Value Proposition 🎯"
                      {...register(`scores_schema.${index}.label` as const)}
                    />
                  </div>
                  {errors.scores_schema?.[index]?.label && (
                    <p className="input-error">
                      {errors.scores_schema?.[index]?.label?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor={``} className="text-body5">
                    Input Type<sup className="text-red-500">*</sup>
                  </label>
                  <div className="input-wrapper mt-8 relative">
                    <Controller
                      control={control}
                      name={`scores_schema.${index}.type`}
                      render={({ field: { value, onChange } }) => (
                        <select
                          id={`incrementOnActionId-input-${field.id}`}
                          className="input-text"
                          placeholder="Select Action"
                          value={value ?? undefined}
                          onChange={(e) => onChange(e.target.value)}
                        >
                          {inputTypesOptions.map(({ label, value }) => (
                            <option
                              key={value}
                              value={value}
                              className="appearance-none p-16"
                            >
                              {label}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                  </div>
                  {errors.scores_schema?.[index]?.type && (
                    <p className="input-error">
                      {errors.scores_schema?.[index]?.type?.message}
                    </p>
                  )}
                </div>
                <IconButton
                  onClick={() => remove(index)}
                  className="self-start mt-36 text-red-500"
                >
                  <FiTrash2 />
                </IconButton>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Button
        color="gray"
        onClick={() => append({ key: generateId(), label: "", type: "range" })}
      >
        Add new score attribute
      </Button>
    </div>
  );
}
