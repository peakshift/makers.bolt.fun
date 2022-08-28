import Uploady, { useRequestPreSend, UPLOADER_EVENTS } from "@rpldy/uploady";
import { asUploadButton } from "@rpldy/upload-button";
// import { fetchUploadUrl } from "./fetch-upload-img-url";
import ImagePreviews from "./ImagePreviews";
import UploadDropZone from "@rpldy/upload-drop-zone";
import { forwardRef, useCallback, useState } from "react";
import styles from './styles.module.scss'
import { AiOutlineCloudUpload } from "react-icons/ai";
import { motion } from "framer-motion";
import { getMockSenderEnhancer } from "@rpldy/mock-sender";
import ScreenshotThumbnail from "./ScreenshotThumbnail";
import { FiCamera } from "react-icons/fi";
import { Control, Path, useController } from "react-hook-form";



const mockSenderEnhancer = getMockSenderEnhancer({
    delay: 1500,
});

const MAX_UPLOAD_COUNT = 4 as const;

export interface ScreenshotType {
    id: string,
    name: string,
    url: string;
}

interface Props {
    value: ScreenshotType[],
    onChange: (new_value: ScreenshotType[]) => void
}


export default function ScreenshotsInput(props: Props) {

    const { value: uploadedFiles, onChange } = props;


    const [uploadingCount, setUploadingCount] = useState(0)


    const canUploadMore = uploadingCount + uploadedFiles.length < MAX_UPLOAD_COUNT;
    const placeholdersCount = (MAX_UPLOAD_COUNT - (uploadingCount + uploadedFiles.length + 1));


    return (
        <Uploady
            multiple={true}
            inputFieldName='file'
            grouped={false}
            enhancer={mockSenderEnhancer}
            listeners={{
                [UPLOADER_EVENTS.BATCH_ADD]: (batch) => {
                    setUploadingCount(v => v + batch.items.length)
                },
                [UPLOADER_EVENTS.ITEM_FINALIZE]: () => setUploadingCount(v => v - 1),
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
                        onChange([...uploadedFiles, { id, name: filename, url: variants[1] }].slice(-MAX_UPLOAD_COUNT))
                    }
                }
            }}
        >

            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-16 mt-24">
                {canUploadMore && <DropZoneButton />}
                {uploadedFiles.map(f => <ScreenshotThumbnail
                    key={f.id}
                    url={f.url}
                    onCancel={() => {
                        onChange(uploadedFiles.filter(file => file.id !== f.id))
                    }} />)}
                <ImagePreviews />
                {(placeholdersCount > 0) &&
                    Array(placeholdersCount).fill(0).map((_, idx) => <ScreenshotThumbnail key={idx} />)}
            </div>
        </Uploady>
    )
}

const DropZone = forwardRef<any, any>((props, ref) => {
    const { onClick, ...buttonProps } = props;


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
        className={`${styles.zone} aspect-video relative rounded-16 md:rounded-14 overflow-hidden border-2 border-gray-200 flex flex-col justify-center items-center cursor-pointer border-dashed`}
    >
        <div className={styles.idle_content}>
            <p className="text-center text-gray-400 text-body1 mb-8"><FiCamera /></p>
            <div className={`text-gray-600 text-center text-body4`}>
                <span className="text-blue-500 underline">Browse images</span> or <br /> <span className="text-blue-500">drop </span>
                them here
            </div>
        </div>

        <motion.div
            animate={{
                y: 5,
            }}
            transition={{
                duration: .5,
                repeat: Infinity,
                repeatType: 'mirror'
            }}
            className={`${styles.active_content} text-white font-bold text-center`}>
            Drop to upload <br /> <AiOutlineCloudUpload className="scale-150 text-body1 mt-16" />
        </motion.div>
    </UploadDropZone>
})

const DropZoneButton = asUploadButton(DropZone);
