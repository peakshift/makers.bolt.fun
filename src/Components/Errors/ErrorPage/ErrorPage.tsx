import React from 'react'
import { Helmet } from 'react-helmet'
import { FallbackProps } from 'react-error-boundary'
import ErrorCard from '../ErrorCard/ErrorCard'


export default function ErrorPage({ error, resetErrorBoundary }: FallbackProps) {
    return (
        <div className="">
            <Helmet>
                <title>{`Something went wrong...`}</title>
            </Helmet>
            <div className="page-container">
                <ErrorCard error={error} resetErrorBoundary={resetErrorBoundary} />
            </div>
        </div>
    )
}
