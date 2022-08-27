import UploadPreview, { PreviewComponentProps, PreviewMethods } from '@rpldy/upload-preview'
import { useAbortItem, useItemAbortListener, useItemCancelListener, useItemErrorListener, useItemProgressListener } from '@rpldy/uploady';
import { useState } from 'react'
import ScreenShotsThumbnail from './ScreenshotThumbnail'

export default function ImagePreviews() {
    return (
        <UploadPreview PreviewComponent={CustomImagePreview} rememberPreviousBatches />
    )
}

function CustomImagePreview({ id, url }: PreviewComponentProps) {

    const [progress, setProgress] = useState<number>(0);
    const [itemState, setItemState] = useState<string>(STATES.PROGRESS);

    const abortItem = useAbortItem();


    useItemProgressListener(item => {
        if (item.completed > progress) {
            setProgress(() => item.completed);

            if (item.completed === 100) {
                setItemState(STATES.DONE)
            } else {
                setItemState(STATES.PROGRESS)
            }
        }
    }, id);



    useItemAbortListener(item => {
        setItemState(STATES.CANCELLED);
    }, id);


    useItemCancelListener(item => {
        setItemState(STATES.CANCELLED);
    }, id);

    useItemErrorListener(item => {
        setItemState(STATES.ERROR);
    }, id);

    if (itemState === STATES.DONE || itemState === STATES.CANCELLED)
        return null

    return <ScreenShotsThumbnail
        url={url}
        isLoading={itemState === STATES.PROGRESS}
        isError={itemState === STATES.ERROR}
        onCancel={() => {
            abortItem(id)
        }}
    />

    // return <div className="aspect-video relative rounded-12 md:rounded-16 overflow-hidden border-2 border-gray-200">
    //     <img src={url}
    //         className={`
    //         w-full h-full object-cover
    //         ${itemState === STATES.PROGRESS && 'opacity-50'} 
    //         `}
    //         alt="" />
    //     <div className="text-body5 absolute inset-0"
    //     >
    //     </div>
    //     {itemState === STATES.PROGRESS &&
    //         <div
    //             className="absolute inset-0 bg-gray-400  bg-opacity-60 flex flex-col justify-center items-center text-white font-bold transition-transform"
    //         >
    //             <RotatingLines
    //                 strokeColor="#fff"
    //                 strokeWidth="3"
    //                 animationDuration="0.75"
    //                 width="48"
    //                 visible={true}
    //             />
    //         </div>}
    //     {itemState === STATES.ERROR &&
    //         <div className="absolute inset-0 bg-red-400  bg-opacity-60 flex flex-col justify-center items-center text-white font-bold">
    //             Failed...
    //         </div>}
    //     {itemState === STATES.CANCELLED &&
    //         <div className="absolute inset-0 bg-red-400  bg-opacity-60 flex flex-col justify-center items-center text-white font-bold">
    //             Cancelled
    //         </div>}
    // </div>;
};

const STATES = {
    PROGRESS: "PROGRESS",
    DONE: "DONE",
    CANCELLED: "CANCELLED",
    ERROR: "ERROR"
};
