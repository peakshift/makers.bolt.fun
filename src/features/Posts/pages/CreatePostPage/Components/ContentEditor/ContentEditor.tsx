import "remirror/styles/all.css";
import styles from "./styles.module.scss";
import TurndownService from "turndown";
import javascript from "refractor/lang/javascript";
import typescript from "refractor/lang/typescript";
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
} from "remirror/extensions";
import { ExtensionPriority, InvalidContentHandler } from "remirror";
import { EditorComponent, Remirror, useRemirror } from "@remirror/react";
import { useCallback, useState } from "react";
import TextEditorComponents from "src/Components/Inputs/TextEditor";
import Toolbar from "./Toolbar";
import { uploadImage } from "src/Components/Inputs/FilesInputs/upload-image";
import RawMarkdownEditor from "../RawMarkdownEditor/RawMarkdownEditor";

const turndownService = new TurndownService();
turndownService.keep(["iframe"]);

interface Props {
  placeholder?: string;
  initialContent?: () => string;
  name?: string;
  onTriggerReset?: () => void;
}

export default function ContentEditor({
  placeholder,
  initialContent,
  name,
  onTriggerReset,
}: Props) {
  const [editorMode, setEditorMode] =
    useState<"rich-text" | "raw-md">("rich-text");

  const onError: InvalidContentHandler = useCallback(
    ({ json, invalidContent, transformers }) => {
      // Automatically remove all invalid nodes and marks.
      return transformers.remove(json, invalidContent);
    },
    []
  );

  const extensions = useCallback(
    () => [
      new PlaceholderExtension({ placeholder }),
      new LinkExtension({
        autoLink: true,
        defaultTarget: "_blank",
        extraAttributes: {
          rel: "noopener noreferrer",
        },
      }),
      new MarkdownExtension({
        copyAsMarkdown: true,
        htmlToMarkdown: (html) => turndownService.turndown(html),
      }),
      new BoldExtension(),
      // new StrikeExtension(),
      new UnderlineExtension(),
      new ItalicExtension(),
      new HeadingExtension(),
      new BlockquoteExtension(),
      new BulletListExtension(),
      new OrderedListExtension(),
      new ListItemExtension({
        priority: ExtensionPriority.High,
        enableCollapsible: true,
      }),
      // new TaskListExtension(),
      new CodeExtension(),
      new CodeBlockExtension({
        supportedLanguages: [javascript, typescript],
      }),
      new ImageExtension({
        uploadHandler(files) {
          return files.map(
            (file) => () =>
              uploadImage(file.file).then((data) => ({
                src: data.src,
                fileName: data.filename,
              }))
          );
        },
        enableResizing: false,
      }),
      new IframeExtension(),
      // new TrailingNodeExtension(),
      // new TableExtension(),
      // new NodeFormattingExtension(),
      /**
       * `HardBreakExtension` allows us to create a newline inside paragraphs.
       * e.g. in a list item
       */
      new HardBreakExtension(),
    ],
    [placeholder]
  );

  const { manager } = useRemirror({
    extensions,
    stringHandler: "markdown",
    onError,
  });

  const switchEditorMode = () => {
    if (editorMode === "rich-text") {
      setEditorMode("raw-md");
    } else {
      onTriggerReset?.();
      setEditorMode("rich-text");
    }
  };

  return (
    <div className={`remirror-theme ${styles.wrapper} post-body bg-white`}>
      <Remirror manager={manager} initialContent={initialContent?.()}>
        <TextEditorComponents.SaveModule name={name} />
        <Toolbar disabled={editorMode === "raw-md"} />
        <div className={editorMode !== "rich-text" ? "hidden" : ""}>
          <EditorComponent />
        </div>
        {editorMode === "raw-md" && <RawMarkdownEditor name={name} />}
        <div className="bg-gray-100 py-8 px-12 flex justify-end">
          <button
            className="text-blue-400 font-bold"
            onClick={switchEditorMode}
            type="button"
          >
            {editorMode === "rich-text"
              ? "Switch to Raw Markdown"
              : "Switch to Rich Text"}
          </button>
        </div>
      </Remirror>
    </div>
  );
}
