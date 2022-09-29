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
            <div className="p-24 flex flex-col gap-24">
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
                        <Button fullWidth variant='outline' color='gray' className='!px-8'>
                            <p className='opacity-0'>votes</p>
                        </Button>
                    </div>
                </div>
                <p className="text-body4 leading-normal">
                    <Skeleton width='98%' />
                    <Skeleton width='90%' />
                    <Skeleton width='70%' />
                    <Skeleton width='40%' />
                </p>

                <div className="flex flex-wrap gap-16">
                    <Skeleton width='40px' height='40px' className='rounded-full' />
                    <Skeleton width='40px' height='40px' className='rounded-full' />
                </div>

                <div >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
                        {
                            Array(4).fill(0).map((_, idx) => <div key={idx} className="w-full relative pt-[56%] cursor-pointer bg-gray-200 shadow-sm rounded-10 overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full object-cover"></div>
                            </div>)
                        }
                    </div>
                </div>
                <div className="text-center h-[46px]"></div>
            </div>
        </motion.div>
    )
}
