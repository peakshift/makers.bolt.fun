
interface Props {
    src: string;
    alt?: string;
    width?: number | string;
}

export default function Avatar({ src, alt, width = 40 }: Props) {
    return (
        <img src={src} className='shrink-0 rounded-full object-contain border-2 bg-white border-gray-100' style={{
            width: width,
            aspectRatio: '1/1'
        }} alt={alt ?? "avatar"} />
    )
}
