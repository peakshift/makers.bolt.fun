import ToolButton from '../ToolButton';


export default function Toolbar() {
  return (
    <div className='flex flex-wrap gap-24 bg-gray-100'>
      <div className="flex">
        <ToolButton cmd='heading' />
        <ToolButton cmd='bold' />
        <ToolButton cmd='italic' />
        <ToolButton cmd='underline' />
      </div>
      <div className="flex">
        {/* <ToolButton cmd='leftAlign' />
        <ToolButton cmd='centerAlign' />
      <ToolButton cmd='rightAlign' /> */}
        <ToolButton cmd='code' />
        <ToolButton cmd='codeBlock' />
        <ToolButton cmd='bulletList' />
        <ToolButton cmd='orderedList' />
        <ToolButton cmd='img' />
        {/* <ToolButton cmd='youtube' /> */}
      </div>


      <div className="flex ml-auto">
        <ToolButton cmd='undo' />
        <ToolButton cmd='redo' />
      </div>

    </div>
  )
}
