import React, { ChangeEvent, useRef } from "react"
import { BsUpload } from "react-icons/bs";
import Button from "src/Components/Button/Button"
import { UnionToObjectKeys } from "src/utils/types/utils";
import FilesThumbnails from "./FilesThumbnails";


type Props = {
    multiple?: boolean;
    value?: File[] | string[] | string;
    max?: number;
    onBlur?: () => void;
    onChange?: (files: (File | string)[] | null) => void
    uploadBtn?: JSX.Element
    uploadText?: string;
    allowedType?: 'images';
}

const fileAccept: UnionToObjectKeys<Props, 'allowedType'> = {
    images: ".png, .jpg, .jpeg"
} as const;

const fileUrlToObject = async (url: string, fileName: string = 'filename') => {
    const res = await fetch(url);
    const contentType = res.headers.get('content-type') as string;
    const blob = await res.blob()
    const file = new File([blob], fileName, { contentType } as any)
    return file
}

export default function FilesInput({
    multiple,
    value,
    max = 3,
    onBlur,
    onChange,
    allowedType = 'images',
    uploadText = 'Upload files',
    ...props
}: Props) {

    const ref = useRef<HTMLInputElement>(null!)

    const handleClick = () => {
        ref.current.click();
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files && Array.from(e.target.files).slice(0, max);
        if (typeof value === 'string')
            onChange?.([value, ...(files ?? [])]);
        else
            onChange?.([...(value ?? []), ...(files ?? [])]);
    }

    const handleRemove = async (idx: number) => {
        if (!value) return onChange?.([]);
        if (typeof value === 'string')
            onChange?.([]);
        else {
            let files = [...value]
            files.splice(idx, 1);

            //change all files urls to file objects
            const filesConverted = await Promise.all(files.map(async file => {
                if (typeof file === 'string') return await fileUrlToObject(file, "")
                else return file;
            }))

            onChange?.(filesConverted);
        }
    }

    const canUploadMore = multiple ?
        !value || (value && value.length < max)
        :
        !value || value.length === 0


    const uploadBtn = props.uploadBtn ?
        React.cloneElement(props.uploadBtn, { onClick: handleClick })
        :
        <Button type='button' onClick={handleClick} ><span className="align-middle">{uploadText}</span> <BsUpload className="ml-12 scale-125" /></Button>

    return (
        <>
            <FilesThumbnails files={value} onRemove={handleRemove} />
            {
                canUploadMore &&
                <>
                    {uploadBtn}
                    <input
                        ref={ref}
                        type="file"
                        onBlur={onBlur}
                        style={{ display: 'none' }}
                        multiple={multiple}
                        accept={fileAccept[allowedType]}
                        onChange={handleChange} />
                </>
            }
        </>
    )
}
