import React from 'react'
import { ToolbarItemUnion, } from '@remirror/react';
import ToolButton from './ToolButton';

interface Props {
  items: ToolbarItemUnion
}

export default function Toolbar() {



  return (
    <div className='flex flex-wrap gap-24 bg-gray-100'>
      <div className="flex">
        <ToolButton cmd='heading' />
        <ToolButton cmd='bold' />
        <ToolButton cmd='italic' />
        <ToolButton cmd='underline' />
        <ToolButton cmd='code' />
        <ToolButton cmd='codeBlock' />
      </div>
      <div className="flex">
        <ToolButton cmd='leftAlign' />
        <ToolButton cmd='centerAlign' />
        <ToolButton cmd='rightAlign' />
        <ToolButton cmd='bulletList' />
        <ToolButton cmd='orderedList' />
        <ToolButton cmd='img' />
      </div>


      <div className="flex ml-auto">
        <ToolButton cmd='undo' />
        <ToolButton cmd='redo' />
      </div>

    </div>
  )
}
