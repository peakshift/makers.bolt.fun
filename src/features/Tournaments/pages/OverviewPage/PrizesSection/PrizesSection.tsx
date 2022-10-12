import { Tournament } from 'src/graphql'
import styles from './styles.module.scss'

interface Props {
  prizes: Tournament['prizes']
}

export default function PrizesSection({ prizes }: Props) {
  return (
    <div>
      <h2 className='text-body1 font-bolder text-gray-900 mb-16'>{data.tracks.length > 0 ? "Prizes & Tracks" : "Prizes"}</h2>
      <div className="flex flex-col gap-16">
        {data.tracks.map((track, trackNumber) => <div key={track.id}
          className="bg-gray-50 rounded-16 border-2 border-gray-100 p-16 md:p-40"
        >
          <div className="flex justify-between gap-24 flex-col md:flex-row">
            <div className='flex flex-col items-start gap-8 max-w-[400px]'>
              <img src={track.image} alt={`${track.title} track prize`} className='h-[64px]' />
              <h3 className="text-body2 text-gray-900 font-bolder">{track.title}</h3>
              <p className="text-body4 text-gray-500">{track.description}</p>
              <div className="flex gap-8 mt-8">
                <p className="text-body6 text-gray-500">Sponsored by </p> <img src={track.sponsor.logo} alt='sponsor logo' className='h-16' />
              </div>
            </div>
            <div className={`md:text-right ${styles.prizes}`}>
              {/* One Prize */}
              {track.prizes.length === 1 &&
                <div>
                  <h4 className='text-[32px] leading-[1em]'>{track.prizes[0].title}</h4>
                  <p className='text-[118px] leading-[1em]' data-attr={trackNumber + 1}>{track.prizes[0].amount}</p>
                </div>
              }

              {/* Two Prizes */}
              {track.prizes.length === 2 &&
                <div className='flex flex-col gap-40'>
                  <div>
                    <h4 className='text-[32px] leading-[1em]'>{track.prizes[0].title}</h4>
                    <p className='text-[72px]  leading-[1em]' data-attr={trackNumber + 1}>{track.prizes[0].amount}</p>
                  </div>
                  <div>
                    <h4 className='text-[20px] leading-[1em]'>{track.prizes[1].title}</h4>
                    <p className='text-[36px] leading-[1em]' data-attr={trackNumber + 1}>{track.prizes[1].amount}</p>
                  </div>
                </div>
              }
              {/* Four Prizes */}
              {track.prizes.length === 4 &&
                <div className='flex md:justify-end flex-wrap gap-40'>
                  {track.prizes.map((prize, idx) => <div key={prize.id} className='first:w-full'>
                    <h4 className={`${idx === 0 ? "text-h2" : "text-body2"}`}>{prize.title}</h4>
                    <p className={`${idx === 0 ? "text-[48px]" : "text-[36px]"}`} data-attr={trackNumber + 1}>{prize.amount}</p>
                  </div>)}
                </div>
              }
            </div>
          </div>
        </div>)}
      </div>
      {/* <div className={styles.grid}>
        {prizes.map((prize, idx) => <div
          key={idx}
          className='bg-gray-50 rounded-16 py-24 px-32'>
          <img src={prize.image} className=' max-w-[64px]' alt="" />
          <div>
            <h3 className="text-h2">{prize.title}</h3>
            <p className="text-h1 text-green-500">{prize.amount}</p>
          </div>
        </div>)}
      </div> */}
    </div>
  )
}

const data = {
  prizes: [],
  tracks: [
    {
      id: 1,
      title: "Grand Champion",
      description: "The Legend of Lightning will be the best in show, la créme de la créme. Every project entered will be eligible for this award, no matter what track they choose.",
      image: "https://i.ibb.co/2gMLDmJ/grand-prize.png",
      prizes: [
        {
          id: 1,
          title: "the legend",
          amount: "1 BTC"
        },
        {
          id: 1,
          title: "Runners UP x2",
          amount: "0.5 BTC"
        }
      ],
      sponsor: {
        logo: "https://i.ibb.co/gTX30Rq/fulgur.png"
      }
    },
    {
      id: 2,
      title: "Global Adoption Track",
      description: "Focusing on scalability and product market fit, this track allows makers to let their imaginations run wild with either lightning or on-chain technology.",
      image: "https://i.ibb.co/ZTGg8wf/global-adoption-1.png",
      prizes: [
        {
          id: 2,
          title: " 1st",
          amount: "$5k"
        },
        {
          id: 3,
          title: " 2nd",
          amount: "$2.5k"
        },
        {
          id: 4,
          title: " 3rd",
          amount: "$1.5k"
        },
        {
          id: 5,
          title: " Design",
          amount: "$1k"
        },
      ],
      sponsor: {
        logo: "https://i.ibb.co/gTX30Rq/fulgur.png"
      }
    },
    {
      id: 3,
      title: "Building for Africa",
      description: "In partnership with ABC 22, this track seeks to encourage makers to build solutions that solve African challenges & increase bitcoin adoption by Africans.",
      image: "https://i.ibb.co/TW8FqRN/Africa-track-thin.png",
      prizes: [
        {
          id: 6,
          title: " 1st",
          amount: "$5k"
        },
        {
          id: 7,
          title: " 2nd",
          amount: "$2.5k"
        },
        {
          id: 8,
          title: " 3rd",
          amount: "$1.5k"
        },
        {
          id: 9,
          title: " Design",
          amount: "$1k"
        },
      ],
      sponsor: {
        logo: "https://i.ibb.co/wRvRQ0h/Frame-251.png"
      }
    },
  ]
}
