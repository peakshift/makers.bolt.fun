import ImageToolButton from './ImageToolBtn';
import HeadingsToolButton from './HeadingsToolBtn';
import DefaultToolButton from './DefaultToolBtn';
import { Command, isCommand } from './helpers';
import VideoToolButton from './VideoToolBtn';
import LinkToolButton from './LinkToolBtn';

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



export default function ToolButton({ cmd,
    classes: _classes
}: Props) {

    const classes = {
        button: _classes?.button ?? `w-36 h-36 flex justify-center items-center`,
        active: _classes?.active ?? 'font-bold bg-gray-300 hover:bg-gray-300 text-black',
        enabled: _classes?.enabled ?? 'hover:bg-gray-200',
        disabled: _classes?.disabled ?? 'opacity-40 text-gray-600 pointer-events-none',
        icon: _classes?.icon ?? ''
    }


    if (!isCommand(cmd))
        return <></>

    if (cmd === 'heading')
        return <HeadingsToolButton classes={classes} />


    if (cmd === 'youtube')
        return <VideoToolButton classes={classes} />

    if (cmd === 'img')
        return <ImageToolButton classes={classes} />


    if (cmd === 'link')
        return <LinkToolButton classes={classes} />

    return <DefaultToolButton classes={classes} cmd={cmd} />


}

