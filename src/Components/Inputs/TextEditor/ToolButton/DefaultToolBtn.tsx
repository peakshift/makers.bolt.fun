import { useActive, useCommands } from '@remirror/react';
import { cmdToBtn, Command } from './helpers';

interface Props {
    cmd: Command
    classes: {
        button: string,
        icon: string,
        active: string,
        enabled: string
        disabled: string
    }
}



export default function DefaultToolButton({ cmd: _cmd, classes }: Props) {

    const commands = useCommands();
    const active = useActive();

    const runCommand = (cmd: string, attrs?: any) => {
        if (commands[cmd]) {

            commands[cmd](attrs);
            commands.focus();
        }
    }

    const { activeCmd, cmd, Icon, tip } = cmdToBtn[_cmd]
    return (
        <button
            type='button'
            data-tip={tip}
            className={`
                    ${classes.button}
                    ${(activeCmd && active[activeCmd]()) && classes.active}
                    ${commands[cmd].enabled() ? classes.enabled : classes.disabled}
                    `}
            onClick={() => runCommand(cmd)}
        >
            <Icon className={classes.icon} />
        </button>
    )



}
