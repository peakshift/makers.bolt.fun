import DonateCard from 'src/features/Donations/components/DonateCard/DonateCard'
import DonationStats from '../DonationStats/DonationStats'
import styles from './styles.module.scss'

export default function Header() {
    return (
        <div className={`${styles.header}`}>
            <div className="flex items-center gap-24 flex-col md:flex-row">
                <div>
                    <h1 className="text-[54px] font-bolder">
                        Donate
                    </h1>
                    <p className='text-h3 font-bolder mt-24'>
                        Help fund <span className="text-primary-600">BOLT🔩FUN</span>, as well as other <span className="text-primary-600">Makers</span> working on lightning apps through tournaments and prize pools
                    </p>
                </div>
                <div className="max-w-[326px]">
                    <DonateCard />
                </div>
            </div>
            <div className="mt-52 md:mt-80">
                <DonationStats />
            </div>
        </div>
    )
}
