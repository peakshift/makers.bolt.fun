import 'remirror/styles/all.css';


import {
    BlockquoteExtension,
    BoldExtension,
    BulletListExtension,
    CodeBlockExtension,
    CodeExtension,
    HardBreakExtension,
    HeadingExtension,
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
import { useCallback } from 'react';
import Toolbar from './Toolbar/Toolbar';


interface Props {
    placeholder?: string;
    initialContent?: string;
}

export default function TextEditor({ placeholder, initialContent = 'Hello everyone\n How are you doing today ??' }: Props) {
    const extensions = useCallback(
        () => [
            new PlaceholderExtension({ placeholder }),
            new LinkExtension({ autoLink: true }),
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
            // new CodeExtension(),
            // new CodeBlockExtension(),
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
        [placeholder],
    );

    const { manager, } = useRemirror({
        extensions,
        stringHandler: 'markdown',
    });
    return (
        <div className='remirror-theme'>
            <Remirror manager={manager} initialContent={initialContent}>
                <Toolbar />
                <EditorComponent />
            </Remirror>
        </div>
    );
};


