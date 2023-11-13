export type BillboardItem = {
  title: string;
  description?: string;
  twBgColor?: string;
  bgImageUrl: string;
  thumbnailImageUrl: string;
  href: string;
  twTextColor?: string;
  renderContent?: () => JSX.Element;
};

interface Props {
  content: BillboardItem;
}

export default function RotatingBillboardSmall({
  content: {
    title,
    description,
    twBgColor = "bg-white",
    bgImageUrl,
    thumbnailImageUrl,
    href,
    twTextColor = "text-white",
    renderContent,
  },
}: Props) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <div
        className={`bg-cover ${twBgColor} rounded-16 relative`}
        style={{
          backgroundImage: `url(${bgImageUrl})`,
        }}
      >
        <div className="flex flex-col gap-8 relative p-24">
          <img
            src={thumbnailImageUrl}
            alt=""
            className="h-48 w-max max-w-full"
          />
          <h3 className={`${twTextColor} font-bolder text-body2`}>{title}</h3>
          {!!description && (
            <p className={`${twTextColor} font-medium text-body4`}>
              {description}
            </p>
          )}
          {!!renderContent && renderContent()}
        </div>
      </div>
    </a>
  );
}
