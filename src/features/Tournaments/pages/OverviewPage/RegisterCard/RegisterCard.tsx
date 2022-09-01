import React from 'react'
import { FaUsers } from 'react-icons/fa'
import Button from 'src/Components/Button/Button'
import Card from 'src/Components/Card/Card'
import Avatar from 'src/features/Profiles/Components/Avatar/Avatar'
import { useCountdown } from 'src/utils/hooks'

interface Props {
    start_date: string;
    makers_count: number
}

export default function RegisterCard({ makers_count, start_date }: Props) {

    const counter = useCountdown(start_date)

    return (
        <Card onlyMd className='flex flex-col gap-24'>
            <div>
                <p className="text-body5 text-gray-600">
                    <FaUsers className='text-body2 mr-4' /> <span className='align-middle'>+ {makers_count} makers</span>
                </p>
                <Button color='primary' fullWidth className='mt-16'>Register</Button>
            </div>
            <div>
                {counter.isExpired ?
                    <p className="text-body3 text-gray-600 text-center">Tournament running!</p>
                    :
                    <>
                        <p className="text-body5 text-gray-900 font-medium">
                            Tournament starts in
                        </p>
                        <div className="grid grid-cols-3 gap-10 mt-16">
                            <div className="border border-gray-200 rounded-10 flex flex-col py-10 justify-center items-center text-primary-600 text-body3 font-medium">
                                {counter.days}d
                            </div>
                            <div className="border border-gray-200 rounded-10 flex flex-col py-10 justify-center items-center text-primary-600 text-body3 font-medium">
                                {counter.hours}h
                            </div>
                            <div className="border border-gray-200 rounded-10 flex flex-col py-10 justify-center items-center text-primary-600 text-body3 font-medium">
                                {counter.minutes}m
                            </div>
                        </div>
                    </>
                }
            </div>
            <div>
                <p className="text-body5 text-gray-900 font-medium">
                    Sponsors
                </p>
                <div className="flex flex-wrap gap-12 mt-16">
                    <Avatar width={42} src='https://i.pravatar.cc/42?id=70' />
                    <Avatar width={42} src='https://i.pravatar.cc/42?id=80' />
                    <Avatar width={42} src='https://i.pravatar.cc/42?id=90' />
                    <Avatar width={42} src='https://i.pravatar.cc/42?id=100' />
                </div>
            </div>
        </Card>
    )
}
