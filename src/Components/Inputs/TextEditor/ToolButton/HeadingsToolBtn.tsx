import { useActive, useCommands } from '@remirror/react';
import { FiType } from 'react-icons/fi'

import {
    Menu,
    MenuItem,
    MenuButton
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

interface Props {
    classes: {
        button: string,
        icon: string,
        active: string,
        enabled: string
        disabled: string
    }
}



export default function HeadingsToolButton({ classes }: Props) {


    const commands = useCommands();
    const active = useActive();

    const runCommand = (cmd: string, attrs?: any) => {
        if (commands[cmd]) {

            commands[cmd](attrs);
            commands.focus();
        }
    }

    return <Menu menuButton={
        <MenuButton
            data-tip={'Headings'}
            className={`
            ${classes.button}
            ${active.heading({}) && classes.active}
            ${commands.toggleHeading.enabled() ? classes.enabled : classes.disabled}
            `}>
            <FiType className={classes.icon} />
        </MenuButton>
    } transition>
        {Array(3).fill(0).map((_, idx) => <MenuItem
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