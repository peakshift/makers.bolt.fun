import { useActive, useChainedCommands, useCommands } from '@remirror/react';
import { FiBold, FiItalic, FiType, FiUnderline, FiAlignCenter, FiAlignLeft, FiAlignRight, FiCode } from 'react-icons/fi'
import { FaListOl, FaListUl, FaUndo, FaRedo } from 'react-icons/fa'

import {
    Menu,
    MenuItem,
    MenuButton
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

interface Props {
    cmd: Command
}

export default function ToolButton({ cmd: _cmd }: Props) {


    const commands = useCommands();
    const active = useActive();
    // const chain = useChainedCommands();

    //  commands.toggleLik
    // active.list

    const runCommand = (cmd: string, attrs?: any) => {
        if (commands[cmd]) {

            commands[cmd](attrs);
            commands.focus();
        }
    }

    if (_cmd === 'heading') {
        return <Menu menuButton={
            <MenuButton className={`
            w-36 h-36 flex justify-center items-center
            ${active.heading({}) ?
                    'font-bold bg-gray-300 text-black'
                    :
                    'hover:bg-gray-200'
                }
            ${!commands.toggleHeading.enabled() && 'opacity-40 text-gray-600 pointer-events-none'}
            
            `}>
                <FiType />
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



    if (isCommand(_cmd)) {
        const { activeCmd, cmd, Icon } = cmdToBtn[_cmd]
        return (
            <button
                className={`
            w-36 h-36 flex justify-center items-center
            ${(activeCmd && active[activeCmd]()) ?
                        'font-bold bg-gray-300 text-black'
                        :
                        'hover:bg-gray-200'
                    }
            ${!commands[cmd].enabled() && 'opacity-40 text-gray-600 pointer-events-none'}
            
            `}
                onClick={() => runCommand(cmd)}
            >
                <Icon />
            </button>
        )
    }



    return <></>
}

const cmdToBtn = {
    'bold': {
        cmd: 'toggleBold',
        activeCmd: 'bold',
        Icon: FiBold
    },
    'italic': {
        cmd: 'toggleItalic',
        activeCmd: 'italic',
        Icon: FiItalic
    },
    underline: {
        cmd: 'toggleUnderline',
        activeCmd: 'underline',
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
        Icon: FiAlignLeft,
    },
    centerAlign: {
        cmd: 'centerAlign',
        activeCmd: null,
        Icon: FiAlignCenter,
    },
    rightAlign: {
        cmd: 'rightAlign',
        activeCmd: null,
        Icon: FiAlignRight,
    },

    bulletList: {
        cmd: 'toggleBulletList',
        activeCmd: 'bulletList',
        Icon: FaListUl,
    },
    orderedList: {
        cmd: 'toggleOrderedList',
        activeCmd: 'orderedList',
        Icon: FaListOl,
    },
    undo: {
        cmd: 'undo',
        activeCmd: null,
        Icon: FaUndo,
    },

    redo: {
        cmd: 'redo',
        activeCmd: null,
        Icon: FaRedo,
    },
    code: {
        cmd: 'toggleCodeBlock',
        activeCmd: 'codeBlock',
        Icon: FiCode,
    },


} as const

type Command = keyof typeof cmdToBtn


function isCommand(cmd: string): cmd is Command {
    return cmd in cmdToBtn;
}