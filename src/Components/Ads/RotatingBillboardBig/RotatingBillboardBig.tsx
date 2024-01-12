import Button from "src/Components/Button/Button";

export type BillboardItem = {
  campaign: string;
  bgImageUrl: string;
  bgColor: string;
  textColor: string;
  logo: string;
  title: string;
  description: string;
  cta: string;
  href: string;
};

interface Props {
  content: BillboardItem;
}

export default function RotatingBillboardBig({
  content: {
    campaign,
    bgImageUrl,
    bgColor,
    textColor,
    logo,
    title,
    description,
    cta,
    href,
  },
}: Props) {
  return (
    <div
      className={`bg-cover ${bgColor} rounded-16 relative`}
      style={{
        backgroundImage: `url(${bgImageUrl})`,
      }}
    >
      <div className="flex flex-col gap-24 relative p-24 pt-16">
        <img src={logo} alt="" className="" />
        <div>
          <h3 className={`${textColor} font-bolder text-body1`}>{title}</h3>
          <p className={`${textColor} font-medium mt-8 text-body4`}>
            {description}
          </p>
        </div>
        <Button href={href} newTab fullWidth color="white">
          {cta}
        </Button>
      </div>
    </div>
  );
}
