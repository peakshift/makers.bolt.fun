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

const INSERT_LINK_ACTION = createAction<{ href: string, text: string }>('LINK_INSERTED_IN_EDITOR')({ href: '', text: '' })

export default function LinkToolButton({ classes }: Props) {

    const commands = useCommands();

    const dispatch = useAppDispatch()

    const onInsertLink = useCallback(({ payload: { href, text } }: typeof INSERT_LINK_ACTION) => {
        commands.insertMarkdown(`[${text}](${href})`)
    }, [commands])

    useReduxEffect(onInsertLink, INSERT_LINK_ACTION.type)



    const { tip, Icon } = cmdToBtn['link'];
    const onClick = () => {
        dispatch(openModal({
            Modal: "InsertLinkModal",
            props: {
                callbackAction: {
                    type: INSERT_LINK_ACTION.type,
                    payload: {
                        href: "",
                        text: "",
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
                    ${classes.enabled}
                    `}
            onClick={onClick}
        >
            <Icon className={classes.icon} />
        </button>
    )



}

