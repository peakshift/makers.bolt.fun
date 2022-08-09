import { FiBold, FiItalic, FiType, FiUnderline, FiAlignCenter, FiAlignLeft, FiAlignRight, FiCode } from 'react-icons/fi'
import { FaListOl, FaListUl, FaUndo, FaRedo, FaImage, FaYoutube, FaQuoteLeft, FaLink } from 'react-icons/fa'
import { BiCodeCurly } from 'react-icons/bi';


export const cmdToBtn = {
    'bold': {
        cmd: 'toggleBold',
        activeCmd: 'bold',
        tip: "Bold",
        Icon: FiBold
    },
    'italic': {
        cmd: 'toggleItalic',
        activeCmd: 'italic',
        tip: "Italic",
        Icon: FiItalic
    },
    underline: {
        cmd: 'toggleUnderline',
        activeCmd: 'underline',
        tip: "Underline",
        Icon: FiUnderline

    },
    heading: {
        cmd: 'toggleHeading',
        activeCmd: 'heading',
        tip: "Headings",
        Icon: FiType,
    },
    leftAlign: {
        cmd: 'leftAlign',
        activeCmd: null,
        tip: "Left Align",
        Icon: FiAlignLeft,
    },
    centerAlign: {
        cmd: 'centerAlign',
        activeCmd: null,
        tip: "Center Align",
        Icon: FiAlignCenter,
    },
    rightAlign: {
        cmd: 'rightAlign',
        activeCmd: null,
        tip: "Right Align",
        Icon: FiAlignRight,
    },

    bulletList: {
        cmd: 'toggleBulletList',
        activeCmd: 'bulletList',
        tip: "Bullets List",
        Icon: FaListUl,
    },
    orderedList: {
        cmd: 'toggleOrderedList',
        activeCmd: 'orderedList',
        tip: "Numbered List",
        Icon: FaListOl,
    },
    undo: {
        cmd: 'undo',
        activeCmd: null,
        tip: "Undo",
        Icon: FaUndo,
    },

    redo: {
        cmd: 'redo',
        activeCmd: null,
        tip: "Redo",
        Icon: FaRedo,
    },
    blockquote: {
        cmd: 'toggleBlockquote',
        activeCmd: 'blockquote',
        tip: "Block Quote",
        Icon: FaQuoteLeft,
    },
    code: {
        cmd: 'toggleCode',
        activeCmd: 'code',
        tip: "Code",
        Icon: FiCode,
    },
    codeBlock: {
        cmd: 'toggleCodeBlock',
        activeCmd: 'codeBlock',
        tip: "Code Block",
        Icon: BiCodeCurly,
    },
    img: {
        cmd: 'insertImage',
        activeCmd: 'image',
        tip: "Insert Image",
        Icon: FaImage,
    },
    link: {
        cmd: 'insertLink',
        activeCmd: 'link',
        tip: "Insert Link",
        Icon: FaLink,
    },

    youtube: {
        cmd: 'addYouTubeVideo',
        activeCmd: 'iframe',
        tip: "Insert Video",
        Icon: FaYoutube,
    },


} as const

export type Command = keyof typeof cmdToBtn


export function isCommand(cmd: string): cmd is Command {
    return cmd in cmdToBtn;
}