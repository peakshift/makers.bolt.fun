import { useHelpers, useEvent, useRemirrorContext } from '@remirror/react';
import { Control, useController } from 'react-hook-form';
import { useDebouncedCallback } from '@react-hookz/web';

interface Props {
    control?: Control,
    name?: string,
}

export default function SaveModule(props: Props) {

    const { field: { onChange, onBlur } } = useController({
        control: props.control,
        name: props.name ?? 'content'
    })

    const { getMarkdown } = useHelpers();

    const changeCallback = useDebouncedCallback(ctx => {
        const { state } = ctx;
        onChange(getMarkdown(state));
    }, [], 500)

    useRemirrorContext(changeCallback)

    useEvent('blur', () => onBlur())

    return <></>
}
