import { useFormContext } from "react-hook-form";
import { ViewBadgeCard } from "src/features/Profiles/pages/ProfilePage/ViewBadgeModal/ViewBadgeModal";
import { Badge } from "src/graphql";
import { CreateBadgeFormType } from "./CreateBadgePage";

export default function PreviewBadgeCard() {
  const { watch } = useFormContext<CreateBadgeFormType>();

  const formValues = watch();

  return (
    <div className=" max-w-[442px] mx-auto">
      <p className="font-medium mb-24">Preview:</p>

      <div className="rounded-xl overflow-auto ">
        <ViewBadgeCard
          badge={
            {
              id: 1,
              ...formValues,
            } as unknown as Badge
          }
          username="John Doe"
          isOwner
        />
      </div>
    </div>
  );
}
