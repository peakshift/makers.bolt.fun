import React from 'react'
import { Tournament } from 'src/graphql'
import styles from './styles.module.scss'

interface Props {
  prizes: Tournament['prizes']
}

export default function PrizesSection({ prizes }: Props) {
  return (
    <div>
      <h2 className='text-body1 font-bolder text-gray-900 mb-16'>Prizes</h2>
      <div className={styles.grid}>
        {prizes.map((prize, idx) => <div
          key={idx}
          className='bg-gray-50 rounded-16 py-24 px-32'>
          <img src={prize.image} className=' max-w-[64px]' alt="" />
          <div>
            <h3 className="text-h2">{prize.title}</h3>
            <p className="text-h1 text-green-500">{prize.amount}</p>
          </div>
        </div>)}
      </div>
    </div>
  )
}
