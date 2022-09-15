
interface Props {
    src: string;
    alt?: string;
    width?: number | string;
    className?: string
}

export default function Avatar({ src, alt, className, width = 40 }: Props) {
    return (
        <img src={src} className={`shrink-0 rounded-full object-cover border-2 bg-white border-gray-100 ${className}`} style={{
            width: width,
            aspectRatio: '1/1'
        }} alt={alt ?? "avatar"} />
    )
}
