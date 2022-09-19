import Button from 'src/Components/Button/Button'
import Lines from './lines-h.png'


export default function Fulgur() {
    return (
        <div className='p-24 pt-48 bg-black rounded-16 relative'>
            <img src={Lines} alt="" className='w-full absolute top-0 left-0' />
            <div className="flex flex-col gap-24 relative">
                <img src={'/assets/images/logos/fulgur_logo.svg'} alt="Fulgur Ventures Logo" className='w-10/12 max-w-[230px] ' />
                <div>
                    <h3 className="text-white font-bolder text-body1">Turn your hackathon project into a startup</h3>
                    <p className="text-white font-medium mt-8 text-body4">Schedule an office hour with Fulgur Ventures</p>
                </div>
                <Button
                    href='https://calendly.com/olegmikh/fulgur-open-hour'
                    newTab
                    fullWidth
                    color='white'>
                    Schedule a meeting
                </Button>
            </div>
        </div>
    )
}
