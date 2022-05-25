import Accordion from "src/Components/Accordion/Accordion";
import Header from "./Header/Header";
import styles from './styles.module.scss'

export default function DonatePage() {

    return (
        <div
            className={`w-full`}
        >
            <Header />
            <div className={`${styles.faq}`}>
                <div>
                    <h2 className="text-h3 font-bolder mb-32">
                        FAQs
                    </h2>
                    <Accordion
                        items={[
                            {
                                heading: "How are donations spent?",
                                content: <p className="whitespace-pre-line">
                                    Shock the Web is a virtual hackathon to promote, explore, build and design web applications that can interact with WebLN enabled wallets and browsers. We want to make building on bitcoin more accessible to the masses of web developers out there.
                                    <br />
                                    Bitcoin development can seem scary for new developers coming in, but it doesn't have to be. With the lightning network's toolkit and libraries a bunch of new opportunities are waiting to be explored. We hope these hackathons can be a chance for you to preview what is possible on bitcoin and the lightning network by fostering collaboration, hopefully shortening (or easing) any developer onboarding time, and helping you connect with other bitcoiners in a fun and friendly space.
                                </p>
                            },
                            {
                                heading: "Who is working on BOLT🔩FUN?",
                                content: <p className="whitespace-pre-line">
                                    Shock the Web is a virtual hackathon to promote, explore, build and design web applications that can interact with WebLN enabled wallets and browsers. We want to make building on bitcoin more accessible to the masses of web developers out there.
                                    <br />
                                    Bitcoin development can seem scary for new developers coming in, but it doesn't have to be. With the lightning network's toolkit and libraries a bunch of new opportunities are waiting to be explored. We hope these hackathons can be a chance for you to preview what is possible on bitcoin and the lightning network by fostering collaboration, hopefully shortening (or easing) any developer onboarding time, and helping you connect with other bitcoiners in a fun and friendly space.
                                </p>
                            },
                            {
                                heading: "How can makers win prizes?",
                                content: <p className="whitespace-pre-line">
                                    Shock the Web is a virtual hackathon to promote, explore, build and design web applications that can interact with WebLN enabled wallets and browsers. We want to make building on bitcoin more accessible to the masses of web developers out there.
                                    <br />
                                    Bitcoin development can seem scary for new developers coming in, but it doesn't have to be. With the lightning network's toolkit and libraries a bunch of new opportunities are waiting to be explored. We hope these hackathons can be a chance for you to preview what is possible on bitcoin and the lightning network by fostering collaboration, hopefully shortening (or easing) any developer onboarding time, and helping you connect with other bitcoiners in a fun and friendly space.
                                </p>
                            },
                            {
                                heading: "How can I donate?",
                                content: <p className="whitespace-pre-line">
                                    Shock the Web is a virtual hackathon to promote, explore, build and design web applications that can interact with WebLN enabled wallets and browsers. We want to make building on bitcoin more accessible to the masses of web developers out there.
                                    <br />
                                    Bitcoin development can seem scary for new developers coming in, but it doesn't have to be. With the lightning network's toolkit and libraries a bunch of new opportunities are waiting to be explored. We hope these hackathons can be a chance for you to preview what is possible on bitcoin and the lightning network by fostering collaboration, hopefully shortening (or easing) any developer onboarding time, and helping you connect with other bitcoiners in a fun and friendly space.
                                </p>
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}
