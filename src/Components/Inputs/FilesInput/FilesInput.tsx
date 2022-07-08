import { createAction } from "@reduxjs/toolkit";
import React, { ChangeEvent, useCallback, useRef } from "react"
import { BsUpload } from "react-icons/bs";
import { FaImage } from "react-icons/fa";
import Button from "src/Components/Button/Button"
import { openModal } from "src/redux/features/modals.slice";
import { useAppDispatch } from "src/utils/hooks";
import { useReduxEffect } from "src/utils/hooks/useReduxEffect";
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

const INSERT_IMAGE_ACTION = createAction<{ src: string, alt?: string }>('COVER_IMAGE_INSERTED')({ src: '', alt: "" })

const FilesInput = React.forwardRef<any, Props>(({
    multiple,
    value,
    max = 3,
    onBlur,
    onChange,
    allowedType = 'images',
    uploadText = 'Upload files',
    ...props
}, ref) => {


    const dispatch = useAppDispatch();

    const handleClick = () => {
        // ref.current.click();
        dispatch(openModal({
            Modal: "InsertImageModal",
            props: {
                callbackAction: {
                    type: INSERT_IMAGE_ACTION.type,
                    payload: {
                        src: "",
                        alt: ""
                    }
                }
            }
        }))
    }

    const onInsertImgUrl = useCallback(({ payload: { src, alt } }: typeof INSERT_IMAGE_ACTION) => {
        if (typeof value === 'string')
            onChange?.([value, src]);
        else
            onChange?.([...(value ?? []), src]);
    }, [onChange, value])

    useReduxEffect(onInsertImgUrl, INSERT_IMAGE_ACTION.type)

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
        <Button type='button' onClick={handleClick} ><span className="align-middle">{uploadText}</span> <FaImage className="ml-12 scale-125" /></Button>

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
})


export default FilesInput;