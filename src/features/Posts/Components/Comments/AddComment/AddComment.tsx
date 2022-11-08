import 'remirror/styles/all.css';
import styles from './styles.module.scss'

import javascript from 'refractor/lang/javascript';
import typescript from 'refractor/lang/typescript';
import {
    BoldExtension,
    CodeBlockExtension,
    CodeExtension,
    HardBreakExtension,
    ImageExtension,
    LinkExtension,
    MarkdownExtension,
    PlaceholderExtension,
} from 'remirror/extensions';
import { EditorComponent, Remirror, useRemirror } from '@remirror/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Avatar from 'src/features/Profiles/Components/Avatar/Avatar';
import Toolbar from './Toolbar';
import Button from 'src/Components/Button/Button';
import { InvalidContentHandler } from 'remirror';


interface Props {
    initialContent?: string;
    placeholder?: string;
    avatar: string;
    isDisconnected?: boolean;
    autoFocus?: boolean
    onSubmit?: (comment: string) => Promise<boolean>;
}


export default function AddComment({ initialContent, placeholder, avatar, autoFocus, onSubmit, isDisconnected }: Props) {

    const containerRef = useRef<HTMLDivElement>(null)
    const linkExtension = useMemo(() => {
        const extension = new LinkExtension({ autoLink: true });
        extension.addHandler('onClick', (_, data) => {
            window.open(data.href, '_blank')?.focus();
            return true;
        });
        return extension;
    }, []);
    const [isLoading, setIsLoading] = useState(false)
    const valueRef = useRef<string>("");


    const extensions = useCallback(
        () => [
            new PlaceholderExtension({ placeholder }),
            linkExtension,
            new BoldExtension(),
            new CodeExtension(),
            new CodeBlockExtension({
                supportedLanguages: [javascript, typescript]
            }),
            new ImageExtension({ enableResizing: true }),
            new MarkdownExtension({ copyAsMarkdown: false }),
            /**
             * `HardBreakExtension` allows us to create a newline inside paragraphs.
             * e.g. in a list item
             */
            new HardBreakExtension(),
        ],
        [linkExtension, placeholder],
    );



    const onError: InvalidContentHandler = useCallback(({ json, invalidContent, transformers }) => {
        // Automatically remove all invalid nodes and marks.
        return transformers.remove(json, invalidContent);
    }, []);

    const { manager, state, onChange, } = useRemirror({
        extensions,
        stringHandler: 'markdown',
        content: initialContent ?? '',
        onError,
    });

    useEffect(() => {
        if (autoFocus)
            containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }, [autoFocus])


    const submitComment = async () => {
        setIsLoading(true);
        const isSuccess = await onSubmit?.(valueRef.current);
        if (isSuccess)
            manager.view.updateState(manager.createState({ content: manager.createEmptyDoc() }))
        setIsLoading(false);

    }


    return (
        <div className={`remirror-theme ${styles.wrapper} p-24 border-2 border-gray-200 rounded-12 md:rounded-16`} ref={containerRef}>
            <Remirror
                manager={manager}
                state={state}
                onChange={e => {
                    const md = e.helpers.getMarkdown(e.state)
                    valueRef.current = md;
                    onChange(e);
                }}
                autoFocus={autoFocus}
            >
                <div className="flex gap-16 items-start pb-24 border-b border-gray-200 focus-within:border-primary-500">
                    <div className="hidden sm:block mt-24 shrink-0"><Avatar width={40} src={avatar} /></div>
                    <div className="flex-grow">
                        <EditorComponent
                        />
                    </div>
                </div>
                <div className="flex flex-wrap gap-16 mt-16">
                    <Toolbar />
                    <Button
                        onClick={submitComment}
                        color='primary'
                        className='ml-auto'
                        disabled={isDisconnected}
                        isLoading={isLoading}
                    >
                        {isDisconnected ? "Waiting for connection..." : "Submit"}
                    </Button>
                </div>
            </Remirror>
        </div>
    );
}
