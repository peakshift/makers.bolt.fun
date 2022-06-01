
interface Props {
    src: string;
    alt?: string;
    width?: number;
}

export default function Avatar({ src, alt, width = 40 }: Props) {
    return (
        <img src={src} className='shrink-0 rounded-full object-contain border-2 border-gray-100' style={{
            width: width,
            height: width,
        }} alt={alt ?? "avatar"} />
    )
}
