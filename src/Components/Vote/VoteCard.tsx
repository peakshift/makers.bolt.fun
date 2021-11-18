import { motion } from 'framer-motion'
import React, { useState } from 'react';
import { AiFillThunderbolt } from 'react-icons/ai'
import { IoClose } from 'react-icons/io5'
import { ModalCard, modalCardVariants } from '../Shared/ModalsContainer/ModalsContainer';

const defaultOptions = [
    { text: '10 sat', value: 10 },
    { text: '100 sats', value: 100 },
    { text: '1k sats', value: 1000 },
]

export default function VoteCard({ onClose, direction, ...props }: ModalCard) {

    const [selectedOption, setSelectedOption] = useState(0);
    const [input, setInput] = useState<number>();

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(-1);
        setInput(Number(event.target.value));
    };

    const onSelectOption = (idx: number) => {
        setSelectedOption(idx);
        setInput(defaultOptions[idx].value);
    }

    return (
        <motion.div
            custom={direction}
            variants={modalCardVariants}
            initial='initial'
            animate="animate"
            exit='exit'
            className="modal-card max-w-[343px] p-24 rounded-xl relative"
        >
            <IoClose className='absolute text-body2 top-24 right-24 hover:cursor-pointer' onClick={onClose} />
            <h2 className='text-h5 font-bold'>Upvote Project</h2>
            <div className="mt-32 ">
                <label className="block text-gray-700 text-body4 mb-2 ">
                    Enter Amount
                </label>
                <div className="input-wrapper">
                    <input
                        className="input-field"
                        value={input} onChange={onChangeInput}
                        type="number"
                        placeholder="e.g 5 sats" />
                    {/* <IoCopy className='input-icon' /> */}
                </div>
                <div className="flex mt-16 justify-between">
                    {defaultOptions.map((option, idx) =>
                        <button
                            key={idx}
                            className={`btn border px-12 rounded-md py-8 text-body ${idx === selectedOption && "border-primary-500 bg-primary-100 text-primary-600"}`}
                            onClick={() => onSelectOption(idx)}
                        >
                            {option.text}<AiFillThunderbolt className='inline-block text-thunder' />
                        </button>
                    )}
                </div>
                <p className="text-body6 mt-14 text-gray-500">1 sat = 1 vote</p>
                <button className="btn btn-primary w-full mt-32" onClick={onClose}>
                    Upvote
                </button>
            </div>
        </motion.div>
    )
}
