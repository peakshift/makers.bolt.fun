import React from 'react'
import Card from 'src/Components/Card/Card';
import Skeleton from 'react-loading-skeleton';
import { random } from 'src/utils/helperFunctions';

export default function RolesSkillsTabSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
            <div className="col-span-2 flex flex-col gap-24">
                <Card>
                    <p className="text-body2 font-bold"><Skeleton width="15ch" /></p>
                    <p className="text-body4 text-gray-600 mt-8">
                        <Skeleton width="90%" />
                    </p>
                    <ul className=' flex flex-wrap gap-8 mt-24'>
                        {Array(10).fill(0).map((_, idx) => {

                            return <div
                                key={idx}
                                className={`px-12 py-8 border rounded-10 text-body5 font-medium`}
                            ><Skeleton width={`${Math.round(random(8, 15))}ch`} />
                            </div>
                        })}
                    </ul>
                    <div className="py-80"></div>
                </Card>
                <Card>
                    <p className="text-body2 font-bold"><Skeleton width="12ch" /></p>
                    <p className="text-body4 text-gray-600 mt-8">
                        <Skeleton width="80%" />
                    </p>
                    <ul className=' flex flex-wrap gap-x-8 gap-y-20 mt-16'>
                        {Array(8).fill(0).map((_, idx) => <li key={idx} className="px-16 py-8 bg-gray-100 rounded-48 text-body5 font-medium">
                            <Skeleton width={`${Math.round(random(3, 12))}ch`} />
                        </li>)}
                    </ul>
                </Card>
            </div>
            <div className="">

            </div>
        </div>
    )
}
