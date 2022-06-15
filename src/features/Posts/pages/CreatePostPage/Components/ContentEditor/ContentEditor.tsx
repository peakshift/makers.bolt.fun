import 'remirror/styles/all.css';
import styles from './styles.module.scss'
import TurndownService from 'turndown'

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
    IframeExtension,
    UnderlineExtension,
} from 'remirror/extensions';
import { ExtensionPriority, InvalidContentHandler } from 'remirror';
import { EditorComponent, Remirror, useRemirror } from '@remirror/react';
import { useCallback } from 'react';
import TextEditorComponents from 'src/Components/Inputs/TextEditor';
import Toolbar from './Toolbar';


const turndownService = new TurndownService()
turndownService.keep(['iframe']);

interface Props {
    placeholder?: string;
    initialContent?: string;
    name?: string;
}

export default function ContentEditor({ placeholder, initialContent, name }: Props) {

    const onError: InvalidContentHandler = useCallback(({ json, invalidContent, transformers }) => {
        // Automatically remove all invalid nodes and marks.
        return transformers.remove(json, invalidContent);
    }, []);


    const extensions = useCallback(
        () => [
            new PlaceholderExtension({ placeholder }),
            new LinkExtension({
                autoLink: true,
                defaultTarget: "_blank",
                extraAttributes: {
                    rel: 'noopener noreferrer'
                }
            }),
            new MarkdownExtension({
                copyAsMarkdown: true, htmlToMarkdown: (html) => turndownService.turndown(html)
            }),
            new BoldExtension(),
            // new StrikeExtension(),
            new UnderlineExtension(),
            new ItalicExtension(),
            new HeadingExtension(),
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
            new IframeExtension(),
            // new TrailingNodeExtension(),
            // new TableExtension(),
            new NodeFormattingExtension(),
            /**
             * `HardBreakExtension` allows us to create a newline inside paragraphs.
             * e.g. in a list item
             */
            new HardBreakExtension(),
        ],
        [placeholder],
    );


    const { manager } = useRemirror({
        extensions,
        stringHandler: 'markdown',
        onError,
    });


    const initContent = `## hello   


how are you doing man


what's up with this face of yours
                `.replace(/\n(?=\n)/g, "\n\n<br/>\n");


    console.log(initContent);


    return (
        <div className={`remirror-theme ${styles.wrapper} bg-white`}>
            <Remirror
                manager={manager}
                initialContent={initContent}
            >
                <TextEditorComponents.SaveModule name={name} />
                <Toolbar />
                <EditorComponent />
            </Remirror>
        </div>
    );
};


