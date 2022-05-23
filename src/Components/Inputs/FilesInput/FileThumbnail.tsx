import { useMemo } from "react";
import { MdClose } from "react-icons/md";
import IconButton from "src/Components/IconButton/IconButton";

interface Props {
    file: File | string,
    onRemove?: () => void
}

function getFileType(file: File | string) {
    if (typeof file === 'string') {
        if (/^http[^?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi.test(file))
            return 'image'
        if (/\.(pdf|doc|docx)$/.test(file))
            return 'document';

        return 'unknown'
    }
    else {
        if (file['type'].split('/')[0] === 'image')
            return 'image'

        return 'unknown'
    }
}

type ThumbnailFile = {
    name: string;
    src: string;
    type: ReturnType<typeof getFileType>
}

function processFile(file: Props['file']): ThumbnailFile {

    const fileType = getFileType(file);

    if (typeof file === 'string') return { name: file, src: file, type: fileType };

    return {
        name: file.name,
        src: URL.createObjectURL(file),
        type: fileType
    };

}


export default function FileThumbnail({ file: f, onRemove }: Props) {

    const file = useMemo(() => processFile(f), [f])

    return (
        <div className="bg-gray-100 rounded-8 p-12 shrink-0 flex gap-4 overflow-hidden">
            <div className="w-[100px]">
                <p className="text-body6 overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {file.name}
                </p>
                <a
                    href={file.src}
                    target='_blank'
                    rel="noreferrer"
                >
                    {
                        file.type === 'image' && <img src={file.src} alt={file.name} className="p-4 w-3/4 mx-auto max-h-full object-contain" />
                    }
                </a>
            </div>
            <div className="w-32 shrink-0 self-start" >
                <IconButton size="sm" className="hover:bg-gray-500" onClick={onRemove}>
                    <MdClose />
                </IconButton>
            </div>
        </div>
    )
}
