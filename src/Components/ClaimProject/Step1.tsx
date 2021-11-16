import { motion } from "framer-motion";
import { ModalCard, modalCardVariants } from "../Shared/Modal/Modal";

interface Props extends ModalCard {

}

export default function Step1({ onClose, direction }: Props) {
    return (
        <motion.div
            custom={direction}
            variants={modalCardVariants}
            initial={'initial'}
            animate="animate"
            exit='exit'
            className="rounded-[40px] bg-gray-50 overflow-hidden w-full"
        >

            <div className="p-24">
                <div className="flex gap-24 items-center">
                    <div className="flex-shrink-0 w-[93px] h-[93px] rounded-md overflow-hidden">
                        <img className="w-full h-full object-cover" src="https://s3-alpha-sig.figma.com/img/be1b/cd75/1baa911b3875134c0889d6755c4ba2cb?Expires=1637539200&Signature=QExmgJCGGSES~zIwM-2G8yd7aPR-j5eFnV3tOg6BkSdXVB9AMhHQPbRpbfOv~rD3hdMdSPMkS9kfjyFbAuonltV2zrf5GOwGxrF2GVdhpIGc6RiqGLWVVY8mXysEm6~0fVj~2SK8hec~YnV1h0oHDQiZF5YjGi143pImGmcVERPpB7MiksSoD0Vki6RXamySopj~f-~lUGy2uKRbQKxQ4LCFTz-H9O8vpkZpCVq274FYsqsEtUihwVjniNXV8ukLxdL~rfgf8L9MeiR7gDYYQ9MSLMZKEa~TnQ-JadlngQz78a2T801WaG2xp5hGHYQMtIi1ES-N4FOg5PwEjtIetA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="" />
                    </div>
                    <div>
                        <h3 className="text-h3 font-regular">Project Name</h3>
                        <a className="text-blue-400 font-regular text-body4" href="/">www.project.com</a>
                    </div>
                    <div className="flex ml-auto gap-16">
                        <button className="btn btn-primary py-12 px-24 rounded-lg my-16">Play 🕹</button>
                        <button className="btn py-12 px-24 rounded-lg my-16">Vote 🔥</button>
                    </div>
                </div>
                <p className="mt-40 text-body4 leading-normal">Lorem ipsum dolor, sit amet consectetur adipisicing elit. At natus perferendis sunt suscipit libero amet praesentium? Magni minus libero maxime aspernatur eius, repudiandae distinctio aut perferendis laboriosam impedit reiciendis blanditiis cum alias hic, ipsam facere obcaecati, amet atque numquam doloribus in explicabo possimus autem! Ipsum consequatur, dignissimos minima esse illum obcaecati aliquid eligendi delectus architecto beatae perferendis. Ipsam, non maxime.</p>
                <div className="flex gap-24 mt-24 flex-wrap">
                    <span className="chip-small bg-red-100 text-red-800 font-regular"> payments </span>
                    <span className="chip-small bg-primary-100 text-primary-800 font-regular"> lightining </span>
                </div>

                <div className="mt-40">
                    <h3 className="text-h5 font-bold">Screen Shots</h3>
                    <div className="flex gap-x-24 gap-y-20">
                        <div className="flex-none w-[164px] h-[120px] md:w-[300px] md:h-[136px] bg-gray-300 rounded-xl"></div>
                        <div className="flex-none w-[164px] h-[120px] md:w-[300px] md:h-[136px] bg-gray-300 rounded-xl"></div>
                        <div className="flex-none w-[164px] h-[120px] md:w-[300px] md:h-[136px] bg-gray-300 rounded-xl"></div>
                    </div>
                </div>

            </div>
        </motion.div>
    )
}
