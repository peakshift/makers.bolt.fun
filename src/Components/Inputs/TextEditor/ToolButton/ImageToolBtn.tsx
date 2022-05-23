import { useActive, useCommands } from '@remirror/react';
import { useAppDispatch } from 'src/utils/hooks';
import { openModal } from 'src/redux/features/modals.slice';
import { useReduxEffect } from 'src/utils/hooks/useReduxEffect';
import { useCallback } from 'react';
import { createAction } from '@reduxjs/toolkit';
import { cmdToBtn } from './helpers';

interface Props {
    classes: {
        button: string,
        icon: string,
        active: string,
        enabled: string
        disabled: string
    }
}

const INSERT_IMAGE_ACTION = createAction<{ src: string, alt?: string }>('IMAGE_INSERTED_IN_EDITOR')({ src: '', alt: "" })

export default function ImageToolButton({ classes }: Props) {

    const commands = useCommands();
    const active = useActive();
    const dispatch = useAppDispatch()


    const onInsertImage = useCallback(({ payload: { src, alt } }: typeof INSERT_IMAGE_ACTION) => {
        commands.insertImage({
            src,
            alt,
        })
    }, [commands])

    useReduxEffect(onInsertImage, INSERT_IMAGE_ACTION.type)



    const { activeCmd, cmd, tip, Icon } = cmdToBtn['img'];
    const onClick = () => {
        dispatch(openModal({
            Modal: "InsertImageModal",
            props: {
                callbackAction: {
                    type: INSERT_IMAGE_ACTION.type,
                    payload: {
                        src: "",
                        alt: ""
                    }
                }
            }
        }))
    }

    return (
        <button
            type='button'
            data-tip={tip}
            className={`
                    ${classes.button}
                    ${(activeCmd && active[activeCmd]()) && classes.active}
                    ${commands[cmd].enabled({ src: "" }) ? classes.enabled : classes.disabled}
                    `}
            onClick={onClick}
        >
            <Icon className={classes.icon} />
        </button>
    )



}

