import React from 'react'
import { Helmet } from 'react-helmet'

interface Props {
    title?: string | null
    description?: string | null
    image?: string | null
}

export default function OgTags(props: Props) {
    return (
        <Helmet>
            {props.title && <title>{props.title}</title>}
            {props.title && <meta property="og:title" content={props.title!} />}
            {props.description && <meta name="description" content={props.description!} />}
            {props.description && <meta property="og:description" content={props.description!} />}
            {props.image && <meta property="og:image" content={props.image} />}
        </Helmet>
    )
}
