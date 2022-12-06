import { Helmet } from "react-helmet";
import Accordion from "src/Components/Accordion/Accordion";
import OgTags from "src/Components/OgTags/OgTags";
import Header from "./Header/Header";
import styles from "./styles.module.scss";

export default function DonatePage() {
  return (
    <>
      <OgTags
        title="Donate to Bolt Fun"
        description="Help fund BOLT🔩FUN, as well as other Makers working on lightning apps through tournaments and prize pools"
      />
      <div className={`w-full bg-white`}>
        <Header />
        <div className={`${styles.faq}`}>
          <div>
            <h2 className="text-h3 font-bolder mb-32">FAQs</h2>
            <Accordion
              items={[
                {
                  heading: "How are donations spent?",
                  content: (
                    <p className=" whitespace-pre-line">
                      Donations that are sent to us directly via our Donate page
                      are used to help fund the design and development of
                      BOLT🔩FUN's Makers platform, as well as helping to fund
                      our tournament and hackathon prize pools.
                    </p>
                  ),
                },
                {
                  heading: "Who is working on BOLT🔩FUN?",
                  content: (
                    <p className=" whitespace-pre-line">
                      BOLT🔩FUN is an open-source project, so technically anyone
                      can work on the platform's features & upgrades. That being
                      said, the project was started by a core team of designers
                      and developers from Peak Shift, a bitcoin only product
                      design and development studio.
                      <br />
                      <br />
                      If you are interested in helping contribute to BOLT🔩FUN,
                      feel free to{" "}
                      <a
                        href="https://discord.gg/HFqtxavb7x"
                        className="text-blue-400 underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        hop into our Discord
                      </a>{" "}
                      and let us know how you'd like to help.
                    </p>
                  ),
                },
                {
                  heading: "How can makers win prizes?",
                  content: (
                    <p className=" whitespace-pre-line">
                      Makers can win prizes through one of BOLT🔩FUN's online
                      #ShockTheWeb ⚡️ hackathons. These hackathons provide an
                      opportunity for makers to get hands on experience learning
                      to build lightning enabled web applications in a fun,
                      collaborative, and supportive environment.
                      <br />
                      <br />
                      Later on, we'd like to create ongoing monthly tournaments
                      & prizes for makers who regularly submit standup reporting
                      (plans, problems, and progress) on their current projects,
                      as well as being active on our platform through Stories,
                      Discussions, and voting.
                    </p>
                  ),
                },
                {
                  heading: "How can I donate?",
                  content: (
                    <p className=" whitespace-pre-line">
                      Currently we are only accepting lightning donations
                      through WebLN. To do this, you will first need to install
                      the Alby extension on your browser. Once you've finished
                      setting up your wallet, you can send us some sats using
                      our donation widget, you'll have to confirm the
                      transaction within your Alby extension.
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
