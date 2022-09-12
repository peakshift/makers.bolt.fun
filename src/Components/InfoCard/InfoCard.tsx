import React, { PropsWithChildren } from 'react'

interface Props {
    className?: string
}

export default function InfoCard(props: PropsWithChildren<Props>) {
    return (
        <div className={`bg-gray-50 p-16 rounded-12 border border-gray-200 ${props.className}`}>
            <p className="text-body5 text-gray-600">
                {props.children}
            </p>
        </div>
    )
}
