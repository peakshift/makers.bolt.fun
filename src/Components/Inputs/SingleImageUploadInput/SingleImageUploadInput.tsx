import Uploady, { useRequestPreSend, UPLOADER_EVENTS, useAbortAll } from "@rpldy/uploady";
import { asUploadButton } from "@rpldy/upload-button";
// import { fetchUploadUrl } from "./fetch-upload-img-url"; 
import UploadDropZone from "@rpldy/upload-drop-zone";
import { forwardRef, ReactElement, useCallback, useState } from "react";
import styles from './styles.module.scss'
import { getMockSenderEnhancer } from "@rpldy/mock-sender";



const mockSenderEnhancer = getMockSenderEnhancer({
    delay: 1500,
});


export interface ImageType {
    id: string,
    name: string,
    url: string;
}

type RenderPropArgs = {
    isUploading?: boolean;
    img: ImageType | null,
    onAbort: () => void
}

interface Props {
    value: ImageType,
    onChange: (new_value: ImageType | null) => void;
    wrapperClass?: string;
    render: (args: RenderPropArgs) => ReactElement;
}


export default function ScreenshotsInput(props: Props) {

    const { value, onChange, render } = props;


    const [currentlyUploadingItem, setCurrentlyUploadingItem] = useState<ImageType | null>(null)


    return (
        <Uploady
            inputFieldName='file'
            grouped={false}
            enhancer={mockSenderEnhancer}
            listeners={{
                [UPLOADER_EVENTS.ITEM_START]: (item) => {
                    onChange(null)

                    setCurrentlyUploadingItem({
                        id: item.id,
                        url: URL.createObjectURL(item.file),
                        name: item.file.name,
                    })
                },
                [UPLOADER_EVENTS.ITEM_FINALIZE]: () => setCurrentlyUploadingItem(null),
                [UPLOADER_EVENTS.ITEM_FINISH]: (item) => {

                    // Just for mocking purposes
                    const dataUrl = URL.createObjectURL(item.file);

                    const { id, filename, variants } = item?.uploadResponse?.data?.result ?? {
                        id: Math.random().toString(),
                        filename: item.file.name,
                        variants: [
                            "",
                            dataUrl
                        ]
                    }
                    if (id) {
                        onChange({ id, name: filename, url: variants[1] })
                    }
                }
            }}
        >
            <DropZoneButton
                extraProps={{
                    renderProps: {
                        isUploading: !!currentlyUploadingItem,
                        img: currentlyUploadingItem || value || null,
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



    useRequestPreSend(async (data) => {

        const filename = data.items?.[0].file.name ?? ''

        // const url = await fetchUploadUrl({ filename });
        return {
            options: {
                destination: {
                    url: "URL"
                }
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
        onDragOverClassName={styles.active}
        extraProps={{ onClick: onZoneClick }}
        className={renderProps.wrapperClass}
    >

        {renderProps.render({
            img: renderProps.img,
            isUploading: renderProps.isUploading,

        })}
    </UploadDropZone>
})

const DropZoneButton = asUploadButton(DropZone);
