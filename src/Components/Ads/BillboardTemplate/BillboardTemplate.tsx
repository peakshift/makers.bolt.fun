import Button from 'src/Components/Button/Button'

interface Props {
    campaign: string;
    bgImage: string;
    bgColor: string;
    textColor: string;
    logo: string;
    title: string;
    description: string;
    cta: string;
    href: string;
}

export default function BillboardTemplate({ 
        campaign, 
        bgImage, 
        bgColor, 
        textColor, 
        logo, 
        title, 
        description, 
        cta, 
        href
    }: Props) {
    return (
        <div className={`bg-[${bgImage}] bg-cover ${bgColor} rounded-16 relative`}>
            <div className="flex flex-col gap-24 relative p-24 pt-48">
                <img src={logo} alt='' className='w-10/12 max-w-[230px] ' />
                <div>
                    <h3 className={`${textColor} font-bolder text-body1`}>{title}</h3>
                    <p className={`${textColor} font-medium mt-8 text-body4`}>{description}</p>
                </div>
                <Button
                    href={href}
                    newTab
                    fullWidth
                    color='white'>
                    {cta}
                </Button>
            </div>
        </div>
    )
}
