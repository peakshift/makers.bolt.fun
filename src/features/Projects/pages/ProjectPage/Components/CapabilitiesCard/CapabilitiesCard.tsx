import React from 'react'
import Badge from 'src/Components/Badge/Badge'
import Card from 'src/Components/Card/Card'
import { ProjectDetailsQuery } from 'src/graphql'


interface Props {
    capabilities: ProjectDetailsQuery['getProject']['capabilities']
}


export default function CapabilitiesCard({ capabilities }: Props) {
    return (
        <Card onlyMd>
            <p className="text-body6 max-md:uppercase max-md:text-gray-400 md:text-body2 font-bold">🦾  Capabilities</p>
            <div className="mt-16">
                {capabilities.length === 0 && <>
                    <p className="text-gray-700 text-body4">No capabilities added</p>
                </>}
                <div className="flex flex-wrap gap-16">
                    {capabilities.map(cap => <Badge key={cap.id} size='sm'>{cap.icon} {cap.title}</Badge>)}
                </div>
            </div>
        </Card>
    )
}
