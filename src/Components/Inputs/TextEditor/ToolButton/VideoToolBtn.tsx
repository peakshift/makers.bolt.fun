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

const INSERT_VIDEO_ACTION = createAction<{ src: string }>('VIDEO_INSERTED_IN_EDITOR')({ src: '' })

export default function VideoToolButton({ classes }: Props) {

    const commands = useCommands();
    const active = useActive();
    const dispatch = useAppDispatch()


    const onInsertVideo = useCallback(({ payload: { src } }: typeof INSERT_VIDEO_ACTION) => {
        commands.addYouTubeVideo({ video: src });
        // commands.insertText(`<iframe class="remirror-iframe remirror-iframe-youtube" src="https://www.youtube-nocookie.com/embed/${src}?" data-embed-type="youtube" allowfullscreen="true" frameborder="0"></iframe>`, {

        // })
    }, [commands])

    useReduxEffect(onInsertVideo, INSERT_VIDEO_ACTION.type)


    const { activeCmd, cmd, tip, Icon } = cmdToBtn['youtube'];
    const onClick = () => {
        dispatch(openModal({
            Modal: "InsertVideoModal",
            props: {
                callbackAction: {
                    type: INSERT_VIDEO_ACTION.type,
                    payload: {
                        src: "",
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
                    ${commands[cmd].enabled({ video: "" }) ? classes.enabled : classes.disabled}
                    `}
            onClick={onClick}
        >
            <Icon className={classes.icon} />
        </button>
    )



}

