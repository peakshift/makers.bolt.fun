
import { useEffect, useState } from 'react';
import LightboxComponent from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import './styles.css'


interface Props {
    images: string[];
    isOpen?: boolean;
    onClose?: () => void;
    initOpenIndex?: number;
}

export default function Lightbox(props: Props) {

    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (props.isOpen) {
            setIsOpen(true);
            setPhotoIndex(props.initOpenIndex ?? 0)
        } else
            setIsOpen(false);

    }, [props.initOpenIndex, props.isOpen])



    return (
        <>
            {isOpen && <div className="z-[100000111]">
                <LightboxComponent
                    wrapperClassName='fixed z-[10000022]'
                    mainSrc={props.images[photoIndex]}
                    nextSrc={props.images[(photoIndex + 1) % props.images.length]}
                    prevSrc={props.images[(photoIndex + props.images.length - 1) % props.images.length]}
                    onCloseRequest={() => props.onClose?.()}
                    onMovePrevRequest={() =>
                        setPhotoIndex((photoIndex + props.images.length - 1) % props.images.length
                        )
                    }
                    onMoveNextRequest={() =>
                        setPhotoIndex((photoIndex + 1) % props.images.length)
                    }
                    imagePadding={48}
                />
            </div>}
        </>
    )
}
