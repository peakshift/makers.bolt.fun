import React, { useMemo } from 'react'
import { Tournament } from 'src/graphql'

interface Props {
    judges: Tournament['judges']
}

const bgColors = ['#FDE68A', '#FECACA', '#BFDBFE', '#BBF7D0', '#DDD6FE', '#FBCFE8', '#FED7AA'];

export default function JudgesSection({ judges }: Props) {

    const colors = useMemo(() => {
        return judges.map((_, i) => bgColors[i % bgColors.length])
    }, [judges])

    return (
        <div>
            <h2 className='text-body1 font-bolder text-gray-900 mb-16'>Judges</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(167px,1fr))] gap-8 md:gap-24">
                {judges.map((judge, idx) => <div
                    key={idx}
                    className="p-16 rounded-16 flex flex-col justify-center items-center gap-16 md:gap-24"
                    style={{ backgroundColor: colors[idx] }}
                >
                    <img src={judge.avatar} className='w-[100px] md:w-[128px] aspect-square object-contain' alt="" />
                    <div className='text-center'>
                        <p className='text-body4 font-medium'>{judge.name}</p>
                        <p className='text-body4 mt-4'>{judge.company}</p>
                    </div>
                </div>)}
            </div>
        </div>
    )
}
