import React from 'react'
import { FaUsers } from 'react-icons/fa'
import Button from 'src/Components/Button/Button'
import Card from 'src/Components/Card/Card'
import Avatar from 'src/features/Profiles/Components/Avatar/Avatar'
import { Tournament } from 'src/graphql'
import PrizesSection from './PrizesSection/PrizesSection'

interface Props {
    data: Pick<Tournament,
        | "description"
        | "prizes"
        | "judges"
        | "start_date"
        | 'makers_count'
    >
}

export default function OverviewPage({ data }: Props) {
    return (
        <Card className='flex flex-col gap-42'>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-24 items-start">
                <div className='md:col-span-2'>
                    <h2 className='text-body2 font-bolder text-gray-900'>Tournament details</h2>
                    <p className="text-body4 text-gray-600 mt-16 whitespace-pre-line">{data.description}</p>
                </div>
                <Card onlyMd className='flex flex-col gap-24'>
                    <div>
                        <p className="text-body5 text-gray-600">
                            <FaUsers className='text-body2 mr-4' /> <span className='align-middle'>+ {data.makers_count} makers</span>
                        </p>
                        <Button color='primary' fullWidth className='mt-16'>Register</Button>
                    </div>
                    <div>
                        <p className="text-body5 text-gray-900 font-medium">
                            Tournament starts in
                        </p>
                        <div className="grid grid-cols-3 gap-10 mt-16">
                            <div className="border border-gray-200 rounded-10 flex flex-col py-10 justify-center items-center text-primary-600 text-body3 font-medium">
                                17d
                            </div>
                            <div className="border border-gray-200 rounded-10 flex flex-col py-10 justify-center items-center text-primary-600 text-body3 font-medium">
                                12h
                            </div>
                            <div className="border border-gray-200 rounded-10 flex flex-col py-10 justify-center items-center text-primary-600 text-body3 font-medium">
                                36m
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text-body5 text-gray-900 font-medium">
                            Sponsors
                        </p>
                        <div className="flex flex-wrap gap-12 mt-16">
                            <Avatar width={42} src='https://i.pravatar.cc/150?id=70' />
                            <Avatar width={42} src='https://i.pravatar.cc/150?id=80' />
                            <Avatar width={42} src='https://i.pravatar.cc/150?id=90' />
                            <Avatar width={42} src='https://i.pravatar.cc/150?id=100' />
                        </div>
                    </div>
                </Card>
            </div>
            <PrizesSection prizes={data.prizes} />

        </Card>
    )
}
