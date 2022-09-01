import React, { useMemo } from 'react'
import Accordion from 'src/Components/Accordion/Accordion';
import { Tournament } from 'src/graphql'

interface Props {
    faqs: Tournament['faqs']
}


export default function FAQsSection({ faqs }: Props) {


    return (
        <div>
            <h2 className='text-body1 font-bolder text-gray-900 mb-4'>FAQs</h2>
            <Accordion
                items={faqs.map(faq => ({ heading: faq.question, content: <p className='whitespace-pre-line'>{faq.answer}</p> }))}
            />
        </div>
    )
}
