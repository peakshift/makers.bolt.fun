import { useDebouncedCallback } from '@react-hookz/web';
import { useHelpers, useRemirrorContext } from '@remirror/react';
import { Control, useController } from 'react-hook-form';

interface Props {
    control?: Control,
    name?: string,
}

export default function SaveModule(props: Props) {

    const { field: { onChange } } = useController({
        control: props.control,
        name: props.name ?? 'content'
    })

    const { getMarkdown } = useHelpers();

    const changeCallback = useDebouncedCallback(ctx => {

        const { state } = ctx;
        let md = getMarkdown(state);
        // md = md.replace(/\n(?=\n)/g, "\n\n<br/>\n");
        onChange(md);
    }, [], 500)

    useRemirrorContext(changeCallback)


    return <></>
}
