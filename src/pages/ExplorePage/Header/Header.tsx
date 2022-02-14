import Assets from "src/assets";
import Button from "src/Components/Button/Button";

const headerLinks = [
  {
    title: "A fun directory of Lightning Enabled Applications on the Open Web",
    img: Assets.Images_ExploreHeader1,
    link: {
      content: "Submit App",
      url: "https://form.jotform.com/220301236112030",
    },
  },
  {
    title:
      "Join the next wave of the Lightning Network in November’s ‘Shock the Web’ hackathon",
    img: Assets.Images_ExploreHeader2,
    link: {
      content: "Register Now",
      url: "https://airtable.com/shrJqeGYmGTMKsT1a",
    },
  },
];

export default function Header() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-40 justify-center md:justify-between">
      <div className="rounded-20 h-[280px] relative overflow-hidden p-24 flex flex-col items-start justify-end">
        <img
          className="w-full h-full object-cover absolute top-0 left-0 z-[-2]"
          src={headerLinks[0].img}
          alt=""
        />
        <div className="w-full h-full object-cover bg-gradient-to-t from-gray-900 absolute top-0 left-0 z-[-1]"></div>
        <h3 className="text-white text-h3 max-w-[80%]">
          {headerLinks[0].title}
        </h3>

        <Button href={headerLinks[0].link.url} newTab color="primary" className="font-regular mt-36">
          {headerLinks[0].link.content}
        </Button>
      </div>
      <div className="hidden md:flex flex-col rounded-20 h-[280px] relative overflow-hidden p-24  items-start justify-end">
        <img
          className="w-full h-full object-cover absolute top-0 left-0 z-[-2]"
          src={headerLinks[1].img}
          alt=""
        />
        <div className="w-full h-full object-cover bg-gradient-to-t from-gray-900 absolute top-0 left-0 z-[-1]"></div>
        <h3 className="text-white text-h3 max-w-[80%]">
          {headerLinks[1].title}
        </h3>
        <Button href={headerLinks[1].link.url} newTab className="font-regular mt-36">
          {headerLinks[1].link.content}
        </Button>
      </div>
    </div>
  );
}
