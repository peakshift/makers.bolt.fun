import Uploady, { useRequestPreSend, UPLOADER_EVENTS, useAbortAll } from "@rpldy/uploady";
import { asUploadButton } from "@rpldy/upload-button";
// import { fetchUploadUrl } from "./fetch-upload-img-url"; 
import UploadDropZone from "@rpldy/upload-drop-zone";
import { forwardRef, ReactElement, useCallback, useState } from "react";
import styles from './styles.module.scss'
import { getMockSenderEnhancer } from "@rpldy/mock-sender";
import { NotificationsService } from "src/services";
import { useIsDraggingOnElement } from 'src/utils/hooks';
import { fetchUploadImageUrl } from "src/api/uploading";



const mockSenderEnhancer = getMockSenderEnhancer({
    delay: 1500,

});


export interface ImageType {
    id?: string | null,
    name?: string | null,
    url: string;
}

type RenderPropArgs = {
    isUploading?: boolean;
    img: ImageType | null,
    onAbort: () => void,
    isDraggingOnWindow?: boolean
}

interface Props {
    value: ImageType | null | undefined,
    onChange: (new_value: ImageType | null) => void;
    wrapperClass?: string;
    render: (args: RenderPropArgs) => ReactElement;
}


export default function SingleImageUploadInput(props: Props) {

    const { value, onChange, render } = props;


    const [currentlyUploadingItem, setCurrentlyUploadingItem] = useState<ImageType | null>(null)


    return (
        <Uploady
            accept="image/*"
            inputFieldName='file'
            grouped={false}
            listeners={{
                [UPLOADER_EVENTS.ITEM_START]: (item) => {
                    onChange(null)

                    setCurrentlyUploadingItem({
                        id: item.id,
                        url: URL.createObjectURL(item.file),
                        name: item.file.name,
                    })
                },
                [UPLOADER_EVENTS.ITEM_ERROR]: (item) => {
                    NotificationsService.error("An error happened while uploading. Please try again.")
                },
                [UPLOADER_EVENTS.ITEM_FINALIZE]: () => setCurrentlyUploadingItem(null),
                [UPLOADER_EVENTS.ITEM_FINISH]: (item) => {

                    const { id, filename, variants } = item?.uploadResponse?.data?.result;
                    const url = (variants as string[]).find(v => v.includes('public'));

                    if (id && url) {
                        onChange({ id, name: filename, url, })
                    }
                }
            }}
        >
            <DropZoneButton
                extraProps={{
                    renderProps: {
                        isUploading: !!currentlyUploadingItem,
                        img: currentlyUploadingItem ?? value ?? null,
                        render,
                        wrapperClass: props.wrapperClass
                    }
                }
                }
            />
        </Uploady>
    )
}


const DropZone = forwardRef<any, any>((props, ref) => {
    const { onClick, children, renderProps, ...buttonProps } = props;

    const isDraggingOnWindow = useIsDraggingOnElement()

    useRequestPreSend(async (data) => {

        const filename = data.items?.[0].file.name ?? ''

        const res = await fetchUploadImageUrl({ filename });

        return {
            options: {
                destination: {
                    url: res.uploadURL
                },
            }
        }
    })

    const onZoneClick = useCallback(
        (e: any) => {
            if (onClick) {
                onClick(e);
            }
        },
        [onClick]
    );

    return <UploadDropZone
        {...buttonProps}
        ref={ref}
        type='button'
        onDragOverClassName={'drag-active'}
        extraProps={{ onClick: onZoneClick }}
        className={renderProps.wrapperClass}
    >

        {renderProps.render({
            img: renderProps.img,
            isUploading: renderProps.isUploading,
            isDraggingOnWindow,
        })}
    </UploadDropZone>
})

const DropZoneButton = asUploadButton(DropZone);
