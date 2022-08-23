import React, { FormEvent, useState } from 'react'
import { ModalCard, modalCardVariants } from 'src/Components/Modals/ModalsContainer/ModalsContainer'
import { motion } from 'framer-motion'
import { IoClose } from 'react-icons/io5'
import Button from 'src/Components/Button/Button'
import { useAppDispatch } from 'src/utils/hooks'
import { PayloadAction } from '@reduxjs/toolkit'
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";

interface Props extends ModalCard {
    callbackAction: PayloadAction<{ href: string, text: string }>
}

const schema = yup.object({
    text: yup.string().trim().required().min(2, 'Link text should be at least 2 characters'),
    href: yup.string().trim().required().url(),

}).required();


export interface IFormInputs {
    text: string,
    href: string,
}


export default function InsertLinkModal({ onClose, direction, callbackAction, ...props }: Props) {

    const { register, formState: { errors }, handleSubmit } = useForm<IFormInputs>({
        defaultValues: {
            href: '',
            text: '',
        },
        resolver: yupResolver(schema),
        mode: 'onBlur',
    });

    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<IFormInputs> = data => {
        const action = Object.assign({}, callbackAction);
        action.payload = { text: data.text, href: data.href }
        dispatch(action)
        onClose?.();
    };

    return (
        <motion.div
            custom={direction}
            variants={modalCardVariants}
            initial='initial'
            animate="animate"
            exit='exit'
            className="modal-card max-w-[660px] p-24 rounded-xl relative"
        >
            <IoClose className='absolute text-body2 top-24 right-24 hover:cursor-pointer' onClick={onClose} />
            <h2 className='text-h5 font-bold'>Insert Link</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid md:grid-cols-2 gap-16 mt-32">
                    <div>
                        <p className="text-body5">
                            Link Text
                        </p>
                        <div className="input-wrapper mt-8 relative">
                            <input
                                type='text'
                                className="input-text"
                                placeholder='My Website'
                                {...register('text')}
                            />
                        </div>
                        {errors.text && <p className="input-error">
                            {errors.text.message}
                        </p>}
                    </div>
                    <div>
                        <p className="text-body5">
                            Link URL
                        </p>
                        <div className="input-wrapper mt-8 relative">
                            <input
                                type='text'
                                className="input-text"
                                placeholder='https://www.website.com'
                                {...register('href')}
                            />
                        </div>
                        {errors.href && <p className="input-error">
                            {errors.href.message}
                        </p>}
                    </div>
                </div>
                <div className="flex gap-16 justify-end mt-32">
                    <Button onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type='submit' color='primary' >
                        Insert
                    </Button>
                </div>
            </form>

        </motion.div>
    )
}
