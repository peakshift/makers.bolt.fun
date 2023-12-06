import { Controller, useFormContext } from "react-hook-form";
import { useGetUserActionTypesQuery } from "src/graphql";
import { CreateBadgeFormType } from "./CreateBadgePage";

export default function BadgeTypeInput() {
  const {
    register,
    formState: { errors },
    watch,
    control,
  } = useFormContext<CreateBadgeFormType>();

  const allUserActionTypesQuery = useGetUserActionTypesQuery();

  const isAdminIssuedOnly = watch("isAdminIssuedOnly");

  return (
    <>
      <div>
        {" "}
        <div className="flex gap-12">
          <input
            id="isAdminIssuedOnly-input"
            className="input-checkbox self-center cursor-pointer"
            type="checkbox"
            {...register("isAdminIssuedOnly")}
          />
          <label
            htmlFor="isAdminIssuedOnly-input"
            className="text-gray-600 font-medium"
          >
            Admin issued only. (The badge isn't automatically tracked & issued)
          </label>
        </div>
        {errors.isAdminIssuedOnly && (
          <p className="input-error">{errors.isAdminIssuedOnly.message}</p>
        )}
      </div>
      <div className={isAdminIssuedOnly ? "opacity-25" : ""}>
        <div className="">
          <label htmlFor="incrementOnActionId-input" className="text-body5">
            Increment on action
          </label>
          <div className="input-wrapper mt-8 relative">
            <Controller
              control={control}
              name="incrementOnActionId"
              render={({ field }) => (
                <select
                  id="incrementOnActionId-input"
                  className="input-text"
                  placeholder="Select Action"
                  value={field.value ?? undefined}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  {allUserActionTypesQuery.data?.getAllUserActionTypes.map(
                    (action) => (
                      <option
                        key={action.id}
                        value={action.id.toString()}
                        className="appearance-none p-16"
                      >
                        {action.name}
                      </option>
                    )
                  )}
                </select>
              )}
            />
          </div>
          {errors.incrementOnActionId && (
            <p className="input-error">{errors.incrementOnActionId.message}</p>
          )}
        </div>

        <div className="mt-24">
          <label htmlFor="incrementsNeeded-input" className="text-body5 mt-24">
            Number of Increments Needed<sup className="text-red-500">*</sup>
          </label>
          <div className="input-wrapper mt-8 relative">
            <input
              id="incrementsNeeded-input"
              type="number"
              className="input-text"
              placeholder=""
              min={0}
              {...register("incrementsNeeded")}
            />
          </div>
          {errors.incrementsNeeded && (
            <p className="input-error">{errors.incrementsNeeded.message}</p>
          )}
        </div>
      </div>
    </>
  );
}
