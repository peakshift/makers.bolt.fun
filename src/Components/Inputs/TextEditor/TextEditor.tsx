import 'remirror/styles/all.css';
import styles from './styles.module.scss'

import javascript from 'refractor/lang/javascript';
import typescript from 'refractor/lang/typescript';
import {
    BlockquoteExtension,
    BoldExtension,
    BulletListExtension,
    CodeBlockExtension,
    CodeExtension,
    HardBreakExtension,
    HeadingExtension,
    ImageExtension,
    ItalicExtension,
    LinkExtension,
    ListItemExtension,
    MarkdownExtension,
    NodeFormattingExtension,
    OrderedListExtension,
    PlaceholderExtension,
    StrikeExtension,
    TableExtension,
    TrailingNodeExtension,
    UnderlineExtension,
    IframeExtension,
} from 'remirror/extensions';
import { ExtensionPriority, InvalidContentHandler } from 'remirror';
import { EditorComponent, Remirror, useHelpers, useRemirror } from '@remirror/react';
import { useCallback, useMemo } from 'react';
import Toolbar from './Toolbar/Toolbar';
import SaveModule from './SaveModule';


interface Props {
    placeholder?: string;
    initialContent?: string;
}

export default function TextEditor({ placeholder, initialContent }: Props) {

    const onError: InvalidContentHandler = useCallback(({ json, invalidContent, transformers }) => {
        // Automatically remove all invalid nodes and marks.
        return transformers.remove(json, invalidContent);
    }, []);

    const linkExtension = useMemo(() => {
        const extension = new LinkExtension({ autoLink: true });
        extension.addHandler('onClick', (_, data) => {
            window.open(data.href, '_blank')?.focus();
            return true;
        });
        return extension;
    }, []);


    const extensions = useCallback(
        () => [
            new PlaceholderExtension({ placeholder }),
            linkExtension,
            new BoldExtension(),
            // new StrikeExtension(),
            new UnderlineExtension(),
            new ItalicExtension(),
            new HeadingExtension(),
            new LinkExtension(),
            new BlockquoteExtension(),
            new BulletListExtension(),
            new OrderedListExtension(),
            new ListItemExtension({ priority: ExtensionPriority.High, enableCollapsible: true }),
            // new TaskListExtension(),
            new CodeExtension(),
            new CodeBlockExtension({
                supportedLanguages: [javascript, typescript]
            }),
            new ImageExtension(),
            // new TrailingNodeExtension(),
            // new TableExtension(),
            new MarkdownExtension({ copyAsMarkdown: false }),
            new NodeFormattingExtension(),
            new IframeExtension(),
            /**
             * `HardBreakExtension` allows us to create a newline inside paragraphs.
             * e.g. in a list item
             */
            new HardBreakExtension(),
        ],
        [linkExtension, placeholder],
    );


    const { manager } = useRemirror({
        extensions,
        stringHandler: 'markdown',
        onError,
    });

    return (
        <div className={`remirror-theme ${styles.wrapper} bg-white shadow-md`}>
            <Remirror
                manager={manager}
                initialContent={initialContent}

            >
                <SaveModule />
                <Toolbar />
                <EditorComponent />
            </Remirror>
        </div>
    );
};


