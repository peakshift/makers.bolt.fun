import React, { useCallback } from 'react'

import { EditorComponent, Remirror, useHelpers, useRemirror, useEvent, useEditorState } from '@remirror/react';
import { Control, useController } from 'react-hook-form';

interface Props {
    control?: Control,
    name?: string,

}

export default function SaveModule(props: Props) {

    const state = useEditorState()
    const { getMarkdown } = useHelpers();
    const { field: { onChange, onBlur } } = useController({
        control: props.control,
        name: props.name ?? 'content'
    })

    const listener = (d: any) => {
        onChange(getMarkdown(state));
        onBlur()
    };

    useEvent('blur', listener)

    return <></>
}
