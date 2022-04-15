
interface Props {
    src: string;
    alt?: string;
    width?: number;
}

export default function Avatar({ src, alt, width = 40 }: Props) {
    return (
        <img src={src} className='rounded-full shadow-inner object-contain border border-gray-100' style={{
            width: width,
            height: width,
        }} alt={alt ?? "avatar"} />
    )
}
