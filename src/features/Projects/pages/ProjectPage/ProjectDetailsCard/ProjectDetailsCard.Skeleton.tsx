import { motion } from 'framer-motion'
import { MdClose, } from 'react-icons/md';
import { ModalCard, modalCardVariants } from 'src/Components/Modals/ModalsContainer/ModalsContainer';
import Skeleton from 'react-loading-skeleton';
import Badge from 'src/Components/Badge/Badge';
import { useMediaQuery } from 'src/utils/hooks';
import { MEDIA_QUERIES } from 'src/utils/theme';
import Button from 'src/Components/Button/Button';


interface Props extends ModalCard {
}

export default function ProjectDetailsCardSkeleton({ onClose, direction, ...props }: Props) {



    const isMdScreen = useMediaQuery(MEDIA_QUERIES.isMedium)


    return (
        <motion.div
            custom={direction}
            variants={modalCardVariants}
            initial='initial'
            animate="animate"
            exit='exit'
            className={`modal-card max-w-[676px] ${props.isPageModal && !isMdScreen && 'rounded-0 w-full min-h-screen'}`}

        >
            <div className="relative h-[100px] lg:h-[80px]">
                <Skeleton height='100%' className='!leading-inherit' />
                <button className="w-32 h-32  bg-gray-600 bg-opacity-80 text-white absolute top-24 right-24 rounded-full hover:bg-gray-800 text-center" onClick={onClose}><MdClose className=' inline-block' /></button>
            </div>
            <div className="p-24">
                <div className="flex flex-col mt-[-80px] md:flex-row md:mt-0 gap-24 items-start relative">
                    <div className="flex-shrink-0 w-[108px] h-[108px] ">
                        <Skeleton height='100%' className='rounded-24 border-2 border-white' />
                    </div>
                    <div className='flex flex-col gap-8 items-start justify-between'>
                        <h3 className="text-body1 font-bold"><Skeleton width='13ch' /></h3>
                        <p className="text-body4 text-gray-600"><Skeleton width='30ch' /></p>
                        <div>
                            <span className="font-medium text-body4 text-gray-600"><Skeleton width='10ch' /></span>
                        </div>
                    </div>

                    <div className="flex-shrink-0 w-full md:w-auto  md:flex ml-auto gap-16 self-stretch">
                        {/* <Button color='primary' size='md' className=" my-16" href={project.website} newTab >Visit <BsJoystick /></Button> */}
                        {/* <VoteButton  onVote={onVote} /> */}
                        {/* <VoteButton fullWidth votes={project.votes_count} direction='vertical' onVote={onVote} /> */}
                        {/* {isWalletConnected ?
                            :
                            <Button onClick={onConnectWallet} size='md' className="border border-gray-200 bg-gray-100 hover:bg-gray-50 active:bg-gray-100 my-16"><AiFillThunderbolt className='inline-block text-thunder transform scale-125' /> Connect Wallet to Vote</Button>
                        } */}
                        <Button fullWidth variant='outline' color='gray' className='!px-8'>
                            <p className='opacity-0'>votes</p>
                        </Button>
                    </div>
                </div>
                <p className="mt-40 text-body4 leading-normal h-[120px]">
                    <Skeleton width='98%' />
                    <Skeleton width='90%' />
                    <Skeleton width='70%' />
                    <Skeleton width='40%' />
                </p>

                <div className="mt-40">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
                        {
                            Array(4).fill(0).map((_, idx) => <div key={idx} className="w-full relative pt-[56%] cursor-pointer bg-gray-200 shadow-sm rounded-10 overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full object-cover"></div>
                            </div>)
                        }
                    </div>
                </div>
                <hr className="my-40" />
                <div className="text-center h-[100px]">

                </div>
            </div>
        </motion.div>
    )
}
