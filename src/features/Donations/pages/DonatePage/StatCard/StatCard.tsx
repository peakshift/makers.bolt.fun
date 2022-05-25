import { ReactNode } from 'react'

interface Props {
    label: ReactNode,
    value: ReactNode,
    color: string
}

export default function StatCard(props: Props) {
    return (
        <div className="bg-white p-24 rounded-16 text-center"
            style={{
                color: props.color,
            }}
        >
            <p className="text-body4">
                {props.label}
            </p>
            <p className="text-h3 sm:text-h2 mt-8 font-bolder">
                {props.value}
            </p>
        </div>
    )
}
