import { motion } from 'framer-motion'
import { ModalCard, modalCardVariants } from 'src/Components/Modals/ModalsContainer/ModalsContainer'
import { FiGithub, FiLinkedin, FiMail, FiTwitter } from "react-icons/fi";
import { IoClose } from 'react-icons/io5';
import { GetMakersInTournamentQuery } from 'src/graphql';
import Avatar from 'src/features/Profiles/Components/Avatar/Avatar';
import { withHttp } from 'src/utils/helperFunctions';


interface Props extends ModalCard {
    maker: GetMakersInTournamentQuery['getMakersInTournament']['makers'][number]
}

export default function LinkingAccountModal({ onClose, direction, maker, ...props }: Props) {


    const links = [
        {
            hasValue: maker.user.twitter,
            text: maker.user.twitter,
            icon: FiTwitter,
            url: `https://twitter.com/${maker.user.twitter}`
        },
        {
            hasValue: maker.user.github,
            text: maker.user.github,
            icon: FiGithub,
            url: `https://github.com/${maker.user.github}`
        },
        {
            hasValue: maker.user.linkedin,
            text: "LinkedIn",
            icon: FiLinkedin,
            url: maker.user.linkedin && withHttp(maker.user.linkedin),
        }
    ];


    return (
        <motion.div
            custom={direction}
            variants={modalCardVariants}
            initial='initial'
            animate="animate"
            exit='exit'
            className="modal-card max-w-[442px] rounded-xl relative"
        >
            <div className="p-24">
                <IoClose className='absolute text-body2 top-24 right-24 hover:cursor-pointer' onClick={onClose} />
                <h2 className='text-h5 font-bold text-center'>Send team request 🤝</h2>
            </div>
            <hr className="bg-gray-200" />
            <div className='flex flex-col justify-center gap-24 items-center text-center p-24'>
                <Avatar src={maker.user.avatar} width={80} />
                <div className="flex flex-col gap-4">
                    <p className="text-body3 text-gray-900">{maker.user.name}</p>
                    <p className="text-body4 text-gray-600">{maker.user.jobTitle}</p>
                </div>

                <p className="text-gray-600">Team up with this maker by sending them a message on one of the following platforms.</p>
                <div className="flex gap-24 justify-center">
                    {links.filter(link => link.hasValue).map((link, idx) =>
                        <a
                            key={idx}
                            href={link.url!}
                            className={`w-40 aspect-square rounded-full flex justify-center items-center bg-primary-100 text-primary-900`}
                            target='_blank'
                            rel="noreferrer">
                            <link.icon className="scale-125" />
                        </a>)}
                </div>
            </div>
        </motion.div>
    )
}



