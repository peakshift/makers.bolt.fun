const headerLinks = [
  {
    title: "A fun directory of Lightning Enabled Applications on the Open Web",
    img:
      "https://s3-alpha-sig.figma.com/img/07b8/5d84/145942255afd215b3da26dbbf1dd03bd?Expires=1638144000&Signature=Cl1DUQJIUsrrFi48M~qU1r3Z0agGdy-uiNUao5g8-nu34QtoyWTFPXvaH3naSZBYqcPyKFq1jaXF6Mw1uj1hdWwGhXhMPLnKNJFFrGViVXhXu-3YeCPY9p4-IcieFJBZPVA~zDY8zxY5b06loWsINAVx4eMHRAhSWl~~Mca5PjlSXloiYrT00W-6c9m8gevfMMX~PsHQedzwYzg0j2DlnhPX8LbRkli1G2OxtCaFwo3~HGHXIlFGuGU1uXRvi1qBWrdjdsuWgIly1ekcFfJWAKmwYXk06EtCmfWRgGYbD7cBK~lwOkFofbf1LW0yqLv0hr4svwToH~3FiHenrCF-1g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    link: {
      content: "Submit App",
      url: "#",
    },
  },
  {
    title:
      "Join the next wave of the Lightning Network in November’s ‘Shock the Web’ hackathon",
    img: 'https://s3-alpha-sig.figma.com/img/be1b/cd75/1baa911b3875134c0889d6755c4ba2cb?Expires=1638748800&Signature=DOiLciAA95w8gOvAowjiiR-ZPbmV1oGSRRK8YpE4ALMoe47pL7DifQxZvL1LQn~NRa0aLMoMk61521fbbGJeDAwk~j6fIm~iZAlMzQn7DdWy0wFR0uLQagOgpIiIXO-w8CeC14VoW-hrjIX5mDmOonJzkfoftGqIF1WCOmP2EuswyJpIngFdLb15gCex4Necs3vH2cuD9iSgWG2za97KfdXZP79ROyk2EN9Q3~a7RT4FTBBIlgKDLuFGSVRxReXVNajn~XSxBJh2de9dFVa3tOXkwJXu3jb0G4x-wRCaG-KmBhUOemuGtu5Fumh6goktGh~bIDwoHeUBVKFHAzaYgw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA', link: {
      content: "Register Now",
      url: "#",
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
        <h3 className="text-white text-h3 max-w-[80%]">{headerLinks[0].title}</h3>
        <a
          href={headerLinks[0].link.url}
          className="btn btn-primary font-regular mt-36"
        >
          {headerLinks[0].link.content}
        </a>
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
        <a href={headerLinks[1].link.url} className="btn font-regular mt-36">
          {headerLinks[1].link.content}
        </a>

      </div>
    </div>
  );
}
