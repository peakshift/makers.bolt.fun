import { motion } from 'framer-motion';

export const ModalsDecorator = (Story: any) => {
  const onClose = () => { };
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='w-screen h-full fixed inset-0 py-32 md:py-64 flex flex-col justify-center items-center overflow-x-hidden overflow-y-hidden no-scrollbar'
    >
      <div
        className="w-screen h-full bg-gray-300 bg-opacity-50 absolute inset-0"
        onClick={onClose}
      ></div>
      <Story />
    </motion.div>
  );
}