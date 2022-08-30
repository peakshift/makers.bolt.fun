import React from 'react'
import Card from 'src/Components/Card/Card';
import Skeleton from 'react-loading-skeleton';

export default function PreferencesTabSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
            <div className="col-span-2 flex flex-col gap-24">
                <Card>
                    <p className="text-body2 font-bold"><Skeleton width="15ch" /></p>
                    <p className="text-body4 text-gray-600 mt-8">
                        <Skeleton width="70%" />
                        <Skeleton width="35%" />
                    </p>

                    <div className='mt-24 flex flex-col gap-16'>
                        <ul className="mt-8 relative flex flex-col gap-8">
                            {Array(3).fill(0).map((_, idx) =>
                                <div key={idx} className='flex gap-16'>
                                    <li className="grow flex flex-wrap gap-16 justify-between items-center text-body4 border-b py-12 px-16 border border-gray-200 rounded-16 focus-within:ring-1 ring-primary-200">
                                        <div className='p-0 border-0 focus:border-0 focus:outline-none grow
                                                focus:ring-0 placeholder:!text-gray-400' >
                                            <Skeleton width='20ch'></Skeleton>
                                        </div>
                                    </li>
                                    <div className="min-w-[60px]"></div>
                                </div>
                            )}
                        </ul>

                    </div>
                </Card>
                <Card>
                    <p className="text-body2 font-bold"><Skeleton width="12ch" /></p>
                    <p className="text-body4 text-gray-600 mt-8">
                        <Skeleton width="80%" />
                        <Skeleton width="50%" />
                        <Skeleton width="65%" />
                    </p>
                    <div className="py-42"></div>
                </Card>
            </div>
            <div className="">

            </div>
        </div>
    )
}
