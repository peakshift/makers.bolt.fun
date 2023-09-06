import Avatar from "src/features/Profiles/Components/Avatar/Avatar";

type CompletedTournamentCardProps = {
  title: string;
  description: string;
};

export function CompletedTournamentCard({
  title,
  description,
}: CompletedTournamentCardProps) {
  return (
    <div>
      <div className="h-[160px] w-full bg-gradient-to-r from-slate-400 to-slate-500 rounded-xl" />
      <div className="mt-16">
        <p className="text-lg font-semibold text-slate-900">{title}</p>
        <p className="mt-4 text-sm text-slate-600">{description}</p>
        <p className="mt-8 text-xs font-semibold text-slate-600">Hosted by</p>
        <div className="flex mt-8 gap-x-4">
          <Avatar
            width={24}
            src="https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/943e12c7-603e-4432-a939-d06a01df0d00/public"
          />
          <Avatar
            width={24}
            src="https://imagedelivery.net/wyrwp3c-j0gDDUWgnE7lig/943e12c7-603e-4432-a939-d06a01df0d00/public"
          />
        </div>
      </div>
    </div>
  );
}
