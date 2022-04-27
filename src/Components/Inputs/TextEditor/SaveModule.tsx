import React from 'react'

import { EditorComponent, Remirror, useHelpers, useRemirror, useEvent, useEditorState } from '@remirror/react';
import { Control, useController } from 'react-hook-form';

interface Props {
    control?: Control,
    name?: string
}

export default function SaveModule(props: Props) {

    const state = useEditorState()
    const { getMarkdown } = useHelpers();
    const { field: { onChange, onBlur } } = useController({
        control: props.control,
        name: props.name ?? 'content'
    })

    useEvent('blur', () => {
        onChange(getMarkdown(state));
        onBlur()
    })

    return <></>
}
