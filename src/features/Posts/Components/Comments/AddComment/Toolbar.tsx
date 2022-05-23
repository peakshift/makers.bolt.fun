
import TextEditorComponents from 'src/Components/Inputs/TextEditor';

interface Props {
}

export default function Toolbar() {

    return (
        <div className='flex gap-36'>
            <div className="flex">
                <TextEditorComponents.ToolButton cmd='bold' classes={{
                    button: "w-40 h-40 text-body3 ",
                    active: "bg-gray-100 text-gray-900",
                    icon: 'text-body1',
                    enabled: "text-gray-400 hover:bg-gray-100",
                    disabled: "text-gray-300"
                }} />
                <TextEditorComponents.ToolButton cmd='code' classes={{
                    button: "w-40 h-40 text-body3 ",
                    active: "bg-gray-100 text-gray-900",
                    icon: 'text-body1',
                    enabled: "text-gray-400 hover:bg-gray-100",
                    disabled: "text-gray-300"
                }} />
                <TextEditorComponents.ToolButton cmd='codeBlock' classes={{
                    button: "w-40 h-40 text-body3 ",
                    active: "bg-gray-100 text-gray-900",
                    icon: 'text-body1',
                    enabled: "text-gray-400 hover:bg-gray-100",
                    disabled: "text-gray-300"
                }} />
            </div>
        </div>
    )
}
