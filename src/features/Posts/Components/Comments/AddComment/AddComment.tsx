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
import { useCallback, useEffect, useMemo, useRef } from 'react';
import Avatar from 'src/features/Profiles/Components/Avatar/Avatar';
import Toolbar from './Toolbar';
import Button from 'src/Components/Button/Button';
import { InvalidContentHandler } from 'remirror';


interface Props {
    initialContent?: string;
    placeholder?: string;
    name?: string;
    autoFocus?: boolean
}


export default function AddComment({ initialContent, placeholder, name, autoFocus }: Props) {

    const containerRef = useRef<HTMLDivElement>(null)
    const linkExtension = useMemo(() => {
        const extension = new LinkExtension({ autoLink: true });
        extension.addHandler('onClick', (_, data) => {
            window.open(data.href, '_blank')?.focus();
            return true;
        });
        return extension;
    }, []);

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


    const submitComment = () => {
        console.log(valueRef.current);
        manager.view.updateState(manager.createState({ content: manager.createEmptyDoc() }))
    }


    return (
        <div className={`remirror-theme ${styles.wrapper} p-24 border rounded-12`} ref={containerRef}>
            <Remirror
                manager={manager}
                state={state}
                onChange={e => {
                    const html = e.helpers.getHTML(e.state)
                    valueRef.current = html;
                    onChange(e);
                }}
                autoFocus={autoFocus}
            >
                <div className="flex gap-16 items-start pb-24 border-b border-gray-200 focus-within:border-primary-500">
                    <div className="hidden sm:block mt-16 shrink-0"><Avatar width={48} src='https://i.pravatar.cc/150?img=1' /></div>
                    <div className="flex-grow">
                        <EditorComponent
                        />
                    </div>
                </div>
                <div className="flex flex-wrap gap-16 mt-16">
                    <Toolbar />
                    <Button onClick={submitComment} color='primary' className='ml-auto'>Submit</Button>
                </div>
            </Remirror>
        </div>
    );
}
