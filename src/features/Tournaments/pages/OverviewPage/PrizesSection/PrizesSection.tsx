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
      description: "Our Grand Champion, a.k.a “The Legend of Lightning” will be the best in show, la créme de la créme. Every project entered in the tournament will be eligible for this award, no matter what track they choose. The Legend will be taking home 1 BTC, with both runners up also bagging 0.5 BTC each.",
      image: "https://s3-alpha-sig.figma.com/img/33fa/68dc/1015f7806d8706cbb29b057f85482755?Expires=1664755200&Signature=QdesbJJcLG84k-SudRv9ah-tVSf~zv4NZKU1EQM9cz-L7qZ1crx7awSVBFZdP~p4R7h1FsUqQfSNHsOPQOKTRiWOL~mpKLe6SAlKhdeqrm8RCNmnhNHpMOxJrCGAsJ7vQDkUKFw9VsJjufTjtEgLHN-EWH5L~RvNHKa06f6rRyiMeRl5HCu9JWT5Spjb0zK7IrU2gT7G~Dw0FTdbE35uxCbN9pU-XuPLbqmAIsPBR-gV4uuf21NBapFOLFDazi-tDzIJO--vH6C4RjuI-i3sl1WV75-SM0DW9MVNBvXiWfPrtGXbNd379xJXQoCBVxv4qzl3YkdoxFUG1-uwKTrVaA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
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
      ]
    },
    {
      id: 2,
      title: "Global Adoption Track",
      description: " We will aim our first prize track at solving issues surrounding the global adoption of bitcoin - focusing on virality, scalability, and product market fit. With this track, makers can let their imaginations run wild with either lightning or on-chain technology, as well as driving adoption either via online or locally based solutions.",
      image: "https://s3-alpha-sig.figma.com/img/cb90/77b4/5ea853a671d0cb1c64bde10dd8955d39?Expires=1664755200&Signature=aXtIhKJg58wRTQlJIGWxpfCN2hxJx8L0~8Hu5aH8LKUVAYrxSV5Tvvxevx9xDnf-RpjTVfB6D7RKuVQjfIiftB4Ym80oOlW9tNzYUo991cJhdYnqaGzJ6Ht2kF7NHmxbiY5RUMYj8bGf2AF1A2a7wuW~DaqHyLQ0s2sszwH2EAv31QTH1DAOO97pQzQ5asas7qGjARWh45QEfw6F8e~6iq3UWHXtIcJ0HMJO4q3ONhsMkuC6XQNfAmWTRwKb3tPZ79oehWgDeyOMGQkRS0uaal~6fNkheEN5DuRBH2dbXtqB6va0PJCTB1l8P558HXhKQjHXRLPPReIci72jPuTzdA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
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
      ]
    },
    {
      id: 3,
      title: "Building for Africa",
      description: "With an estimated population of ~1.4bn inhabitants, Africa has poised itself as ripe for bitcoin adoption. In partnership with the African Bitcoin Conference 22, this track seeks to encourage makers to build solutions that solve local challenges & increase bitcoin adoption in Africa.",
      image: "https://s3-alpha-sig.figma.com/img/c306/f172/7ce7befa9414372e6d0ede739be46de8?Expires=1664755200&Signature=BBfOTJzk7Si7zs9dOBhTdIhoKCvUDxAr6Do0wCZaIq9PD2Jcfxu3ANbiogzihC5O2Rwz3sKsajsRCd8eSs8HGrHrQh89SfNIl0~MYjMz12yWpsc1vC5M5hmXH~VQzCTOWsSki9BimcpCu0IOWfJFjY-p0rlo8UFhdDe56DiRUOSW0pAm5UxTstzOew6X015xA3qQWwUIea2JAtlsI5RqMQMRB-QlaKFlQvYHBU6YzLUNTuTn4MfOd-1oZXKtDArubYnSrJb2rJAXqccxgsXceDl8jq8HXKwkBR95-sG3UDZB7q7qb1Nk3HlsDtirGNlOjLx~vDKpOuyIk5ufAkdJmQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
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
      ]
    },
  ]
}
