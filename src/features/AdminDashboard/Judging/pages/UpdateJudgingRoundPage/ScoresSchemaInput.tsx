import { motion } from "framer-motion";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import Button from "src/Components/Button/Button";
import IconButton from "src/Components/IconButton/IconButton";
import { generateId } from "src/utils/helperFunctions";
import { CreateJudgingRoundFormType } from "./CreateJudgingRoundPage";

const inputTypesOptions = [
  {
    label: "Range",
    value: "range",
  },
  {
    label: "Checkbox (Can select multiple)",
    value: "checkbox",
  },
  // {
  //   label: "Radio (Can select one)",
  //   value: "radio",
  // },
];

export default function ScoresSchemaInput() {
  const {
    control,
    register,
    formState: { errors },
    trigger,
  } = useFormContext<CreateJudgingRoundFormType>();

  const { fields, append, remove, swap } = useFieldArray<
    CreateJudgingRoundFormType,
    "scores_schema"
  >({
    name: "scores_schema",
  });

  return (
    <div>
      {fields.length > 0 && (
        <ul className="flex flex-col gap-8 mb-16">
          {fields.map((field, index) => (
            <motion.li layout key={field.id}>
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_1fr_auto] gap-16">
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <IconButton
                    className={`!p-4`}
                    disabled={index === 0}
                    onClick={() => swap(index, index - 1)}
                  >
                    <FaChevronUp />
                  </IconButton>

                  <IconButton
                    className="!p-4"
                    onClick={() => swap(index, index + 1)}
                    disabled={index === fields.length - 1}
                  >
                    <FaChevronDown />
                  </IconButton>
                </div>
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
                      {...register(`scores_schema.${index}.label` as const, {
                        onChange: () => trigger("scores_schema"),
                      })}
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
            </motion.li>
          ))}
        </ul>
      )}
      {errors.scores_schema &&
        "message" in errors.scores_schema &&
        typeof errors.scores_schema.message === "string" && (
          <p className="input-error mb-16">{errors.scores_schema.message}</p>
        )}
      <Button
        color="gray"
        onClick={() => {
          append({ key: generateId(), label: "", type: "range" });
          if (fields.length === 0) trigger("scores_schema");
        }}
      >
        <FiPlus /> Add new score attribute
      </Button>
    </div>
  );
}
