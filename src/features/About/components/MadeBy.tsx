import BoltObserverLogo from '../assets/bolt-observer-logo.png';
import PeakshiftLogo from '../assets/peakshift-logo.png';

export default function MadeBy() {
    return (
        <div className='mt-64 md:mt-[120px] mb-24 md:mb-64'>
            <p className="text-body6 text-white font-bolder">
                MADE WITH ⚡️ BY THE FOLKS AT
            </p>
            <div className="flex flex-wrap gap-80 mt-24">
                <a href="https://bolt.observer" target='_blank' rel="noreferrer" >
                    <img src={BoltObserverLogo} className='h-48' alt="Bolt Observer Logo" />
                </a>
                <a href="https://peakshift.com" target='_blank' rel="noreferrer" >
                    <img src={PeakshiftLogo} className='h-48' alt="Peakshift Logo" />
                </a>
            </div>
        </div>
    )
}
