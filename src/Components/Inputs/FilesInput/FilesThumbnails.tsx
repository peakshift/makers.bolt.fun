import { useMemo } from 'react'
import FileThumbnail from './FileThumbnail';

interface Props {
    files?: (File | string)[] | string;
    onRemove?: (idx: number) => void
}

function processFiles(files: Props['files']) {
    if (!files) return [];
    if (Array.isArray(files))
        return files;
    if (typeof files === 'string')
        return [files];

    return []
}

export default function FilesThumbnails({ files, onRemove }: Props) {
    const filesConverted = useMemo(() => processFiles(files), [files])

    return (
        <div className="flex gap-12 mb-12">
            {
                filesConverted.map((file, idx) => <FileThumbnail
                    key={idx}
                    file={file}
                    onRemove={() => onRemove?.(idx)} />)
            }
        </div>
    )
}
