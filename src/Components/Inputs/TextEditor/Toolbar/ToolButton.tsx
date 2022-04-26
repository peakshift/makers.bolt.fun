import { useActive, useChainedCommands, useCommands } from '@remirror/react';
import { FiBold, FiItalic, FiType, FiUnderline, FiAlignCenter, FiAlignLeft, FiAlignRight } from 'react-icons/fi'
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
    const chain = useChainedCommands();

    // commands.undo
    // active.list

    if (_cmd === 'heading') {
        return <Menu menuButton={
            <MenuButton>
                <button
                    className={`
            w-36 h-36 flex justify-center items-center
            ${active.heading({}) ?
                            'font-bold bg-gray-200 text-black'
                            :
                            'hover:bg-gray-100'
                        }
            ${!commands.toggleHeading.enabled() && 'opacity-40 text-gray-600 pointer-events-none'}
            
            `}
                >
                    <FiType />
                </button>
            </MenuButton>
        } transition>
            {Array(6).fill(0).map((_, idx) => <MenuItem
                className={`
                py-8 px-16 hover:bg-gray-100
                ${active.heading({ level: idx + 1 }) && 'font-bold bg-gray-200'}
                `}
                onClick={() => chain.toggleHeading({ level: idx + 1 }).focus().run()}
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
                        'font-bold bg-gray-200 text-black'
                        :
                        'hover:bg-gray-100'
                    }
            ${!commands[cmd].enabled() && 'opacity-40 text-gray-600 pointer-events-none'}
            
            `}
                onClick={() => chain[cmd]().focus().run()}
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


} as const

type Command = keyof typeof cmdToBtn


function isCommand(cmd: string): cmd is Command {
    return cmd in cmdToBtn;
}