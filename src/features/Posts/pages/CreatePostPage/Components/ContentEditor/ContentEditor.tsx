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
} from 'remirror/extensions';
import { ExtensionPriority } from 'remirror';
import { EditorComponent, Remirror, useRemirror } from '@remirror/react';
import { useCallback, useMemo } from 'react';
import TextEditorComponents from 'src/Components/Inputs/TextEditor';
import Toolbar from './Toolbar';


interface Props {
    placeholder?: string;
    initialContent?: string;
    name?: string;
}

export default function ContentEditor({ placeholder, initialContent, name }: Props) {

    const linkExtension = useMemo(() => {
        const extension = new LinkExtension({ autoLink: true });
        extension.addHandler('onClick', (_, data) => {
            alert(`You clicked link: ${JSON.stringify(data)}`);
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
            new ImageExtension({ enableResizing: true }),
            // new TrailingNodeExtension(),
            // new TableExtension(),
            new MarkdownExtension({ copyAsMarkdown: false }),
            new NodeFormattingExtension(),
            /**
             * `HardBreakExtension` allows us to create a newline inside paragraphs.
             * e.g. in a list item
             */
            new HardBreakExtension(),
        ],
        [linkExtension, placeholder],
    );

    const { manager, } = useRemirror({
        extensions,
        stringHandler: 'markdown',
    });
    return (
        <div className={`remirror-theme ${styles.wrapper} bg-white`}>
            <Remirror
                manager={manager}
                initialContent={initialContent}
            >
                <TextEditorComponents.SaveModule name={name} />
                <Toolbar />
                <EditorComponent />
            </Remirror>
        </div>
    );
};


