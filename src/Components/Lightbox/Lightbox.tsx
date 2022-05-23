
import { useUpdateEffect } from '@react-hookz/web';
import { useState } from 'react';

import FsLightbox from 'fslightbox-react';

interface Props {
    images: string[];
    isOpen?: boolean;
    onClose?: () => void;
    initOpenIndex?: number;
}

export default function Lightbox(props: Props) {
    const [toggler, setToggler] = useState(false);

    useUpdateEffect(() => {
        if (props.isOpen)
            setToggler(!toggler)
    }, [props.isOpen])



    return (
        <FsLightbox
            toggler={toggler}
            onClose={props.onClose}
            sources={props.images}
            sourceIndex={props.initOpenIndex}
        />
    )
}
