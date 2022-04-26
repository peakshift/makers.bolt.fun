import React from 'react'
import { ToolbarItemUnion, } from '@remirror/react';
import ToolButton from './ToolButton';

interface Props {
  items: ToolbarItemUnion
}

export default function Toolbar() {



  return (
    <div className='flex gap-24'>
      <div className="flex">
        <ToolButton cmd='bold' />
        <ToolButton cmd='italic' />
        <ToolButton cmd='underline' />
        <ToolButton cmd='heading' />
      </div>
      <div className="flex">
        <ToolButton cmd='leftAlign' />
        <ToolButton cmd='centerAlign' />
        <ToolButton cmd='rightAlign' />
        <ToolButton cmd='bulletList' />
        <ToolButton cmd='orderedList' />
      </div>

      <div className="flex ml-auto">
        <ToolButton cmd='undo' />
        <ToolButton cmd='redo' />
      </div>

    </div>
  )
}
