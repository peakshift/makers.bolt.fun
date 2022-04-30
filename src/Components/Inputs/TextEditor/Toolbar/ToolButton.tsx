import { useActive, useChainedCommands, useCommands } from '@remirror/react';
import { FiBold, FiItalic, FiType, FiUnderline, FiAlignCenter, FiAlignLeft, FiAlignRight, FiCode } from 'react-icons/fi'
import { FaListOl, FaListUl, FaUndo, FaRedo, FaImage } from 'react-icons/fa'

import {
    Menu,
    MenuItem,
    MenuButton
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { BiCodeCurly } from 'react-icons/bi';
import { useAppDispatch } from 'src/utils/hooks';
import { openModal } from 'src/redux/features/modals.slice';

interface Props {
    cmd: Command
    classes?: Partial<{
        button: string,
        icon: string,
        active: string,
        enabled: string
        disabled: string
    }>
}

export default function ToolButton({ cmd: _cmd, classes }: Props) {

    const buttonClasses = classes?.button ?? `w-36 h-36 flex justify-center items-center`;
    const activeClasses = classes?.active ?? 'font-bold bg-gray-300 hover:bg-gray-300 text-black'
    const enabledClasses = classes?.enabled ?? 'hover:bg-gray-200';
    const disabledClasses = classes?.disabled ?? 'opacity-40 text-gray-600 pointer-events-none'
    const iconClasses = classes?.icon ?? ''

    const commands = useCommands();
    const active = useActive();
    const dispatch = useAppDispatch()
    // const chain = useChainedCommands();

    //  commands.toggleCo
    // active.list

    const runCommand = (cmd: string, attrs?: any) => {
        if (commands[cmd]) {

            commands[cmd](attrs);
            commands.focus();
        }
    }

    if (_cmd === 'heading') {
        return <Menu menuButton={
            <MenuButton
                data-tip={'Headings'}
                className={`
            ${buttonClasses}
            ${active.heading({}) && activeClasses}
            ${commands.toggleHeading.enabled() ? enabledClasses : disabledClasses}
            `}>
                <FiType className={iconClasses} />
            </MenuButton>
        } transition>
            {Array(6).fill(0).map((_, idx) => <MenuItem
                key={idx}
                className={`
                py-8 px-16 hover:bg-gray-200
                ${active.heading({ level: idx + 1 }) && 'font-bold bg-gray-200'}
                `}
                onClick={() => runCommand('toggleHeading', { level: idx + 1 })}
            >
                Heading{idx + 1}
            </MenuItem>)}
        </Menu>
    }


    if (_cmd === 'img') {
        const { activeCmd, cmd, tip, Icon } = cmdToBtn[_cmd];
        const onClick = () => {
            dispatch(openModal({
                Modal: "InsertImageModal",
                props: {
                    onInsert: ({ src, alt }) => {
                        commands.insertImage({
                            src,
                            alt,

                        })
                    }
                }
            }))
        }

        return (
            <button
                type='button'
                data-tip={tip}
                className={`
                    ${buttonClasses}
                    ${(activeCmd && active[activeCmd]()) && activeClasses}
                    ${commands[cmd].enabled({ src: "" }) ? enabledClasses : disabledClasses}
                    `}
                onClick={onClick}
            >
                <Icon className={iconClasses} />
            </button>
        )
    }

    if (isCommand(_cmd)) {
        const { activeCmd, cmd, tip, Icon } = cmdToBtn[_cmd]
        return (
            <button
                type='button'
                data-tip={tip}
                className={`
                    ${buttonClasses}
                    ${(activeCmd && active[activeCmd]()) && activeClasses}
                    ${commands[cmd].enabled() ? enabledClasses : disabledClasses}
                    `}
                onClick={() => runCommand(cmd)}
            >
                <Icon className={iconClasses} />
            </button>
        )
    }



    return <></>
}

const cmdToBtn = {
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


} as const

type Command = keyof typeof cmdToBtn


function isCommand(cmd: string): cmd is Command {
    return cmd in cmdToBtn;
}