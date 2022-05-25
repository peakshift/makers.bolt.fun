import React, { ReactNode } from 'react';
import {
    Accordion as AccordionContainer,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
    AccordionItemState,
} from 'react-accessible-accordion';
import { FiChevronDown } from 'react-icons/fi';


interface Props {
    items: Array<{
        id?: string | number
        heading: ReactNode,
        content: ReactNode,
    }>,
    classes?: Partial<{
        item: string
        heading: string;
        content: string;
        button: string;
    }>
}


export default function Accordion({ items, classes }: Props) {
    return (
        <AccordionContainer allowZeroExpanded allowMultipleExpanded>
            {items.map((item, idx) => <AccordionItem key={item.id ?? idx} className={` border-b ${classes?.item}`}>
                <AccordionItemHeading>
                    <AccordionItemButton
                        className={`py-20 flex items-center text-body2 font-bolder ${classes?.heading}`}
                    >
                        {item.heading}
                        <AccordionItemState>
                            {({ expanded }) =>
                                <button className={`
                        rounded-10 flex-shrink-0 ml-auto text-gray-600 w-32 h-32 flex justify-center items-center 
                        ${expanded ? "bg-gray-100 hover:bg-gray-200" : 'hover:bg-gray-200 '}
                        ${classes?.button}`}>
                                    <FiChevronDown className={`${expanded ? "rotate-180" : "rotate-0"} transition-transform`} />
                                </button>}
                        </AccordionItemState>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className={`pb-20 ${classes?.content}`}>
                    {item.content}
                </AccordionItemPanel>
            </AccordionItem>)}
        </AccordionContainer>
    );
}