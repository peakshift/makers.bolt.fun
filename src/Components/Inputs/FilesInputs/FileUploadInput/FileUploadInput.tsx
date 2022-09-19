import Uploady, { useUploady, useRequestPreSend, UPLOADER_EVENTS, } from "@rpldy/uploady";
import { asUploadButton } from "@rpldy/upload-button";
import Button from "src/Components/Button/Button";
import { fetchUploadUrl } from "../fetch-upload-img-url";
import ImagePreviews from "./ImagePreviews";
import { FaImage } from "react-icons/fa";
import UploadDropZone from "@rpldy/upload-drop-zone";
import { forwardRef, useCallback } from "react";
import styles from './styles.module.scss'
import { MdFileUpload } from "react-icons/md";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { motion } from "framer-motion";

interface Props {
    url: string;
}

const UploadBtn = asUploadButton((props: any) => {

    useRequestPreSend(async (data) => {

        const filename = data.items?.[0].file.name ?? ''

        const url = await fetchUploadUrl({ filename });
        return {
            options: {
                destination: {
                    url
                }
            }
        }
    })

    // const handleClick = async () => {
    //     // Make a request to get the url
    //     try {
    //         var bodyFormData = new FormData();
    //         bodyFormData.append('requireSignedURLs', "false");
    //         const res = await axios({
    //             url: 'https://cors-anywhere.herokuapp.com/https://api.cloudflare.com/client/v4/accounts/783da4f06e5fdb9012c0632959a6f5b3/images/v2/direct_upload',
    //             method: 'POST',
    //             data: bodyFormData,
    //             headers: {
    //                 "Authorization": "Bearer Xx2-CdsTliYkq6Ayz-1GX4CZubdQVxMwOSDbajP0",
    //             }
    //         })
    //         uploady.upload(res.data.result.uploadUrl, {
    //             destination: res.data.result.uploadUrl
    //         })
    //     } catch (error) {
    //         console.log(error);

    //     }


    //     // make the request with the files
    //     // uploady.upload()
    // }

    return <Button {...props} color='primary'>
        Upload Image <FaImage className="ml-8 scale-125 align-middle" />
    </Button>
});


const DropZone = forwardRef<any, any>((props, ref) => {
    const { onClick, ...buttonProps } = props;

    useRequestPreSend(async (data) => {

        const filename = data.items?.[0].file.name ?? ''

        const url = await fetchUploadUrl({ filename });
        return {
            options: {
                destination: {
                    url
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
        className={`${styles.zone} border-2 w-full min-h-[200px] max-w-[600px] rounded-16 flex flex-col justify-center items-center text text-body3 border-dashed`}
    >
        <div className={`${styles.idle_content} text-gray-600`}>
            Drop your <span className="font-bold uppercase">IMAGES</span> here or <button className="font-bold text-blue-400 underline">Click to browse</button>
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
            className={`${styles.active_content} text-white font-bold`}>
            Drop it to upload <AiOutlineCloudUpload className="scale-150 text-body1 ml-16" />
        </motion.div>
    </UploadDropZone>
})

const DropZoneButton = asUploadButton(DropZone);


export default function FileUploadInput(props: Props) {
    return (
        <Uploady
            multiple={true}
            inputFieldName='file'
            grouped={false}
            listeners={{
                [UPLOADER_EVENTS.ITEM_FINISH]: (item) => {
                    const { id, filename, variants } = item?.uploadResponse?.data?.result ?? {}
                    if (id) {
                        console.log(id, filename, variants);
                    }
                }
            }}
        >
            <DropZoneButton />
            {/* <UploadBtn /> */}
            <ImagePreviews />
        </Uploady>
    )
}
