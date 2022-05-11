import { FaImage } from "react-icons/fa";
import { UnionToObjectKeys } from "src/utils/types/utils";
import DropInput from "./DropInput";


type Props = {
    height?: number
    multiple?: boolean;
    value?: File[] | string[] | string;
    max?: number;
    onBlur?: () => void;
    onChange?: (files: (File | string)[] | null) => void
    uploadBtn?: JSX.Element
    uploadText?: string;
    allowedType?: 'images';
    classes?: Partial<{
        wrapper: string,
        dragging: string
    }>
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
    height = 200,
    multiple,
    value,
    max = 3,
    onBlur,
    onChange,
    allowedType = 'images',
    classes,
    ...props
}: Props) {


    const wrapperClasses = classes?.wrapper ?? 'bg-primary-50 p-32 border border-primary-500 rounded-8 text-center flex flex-col justify-center items-center'
    const draggingClasses = classes?.dragging ?? '!bg-primary-500 !text-white'

    return (
        <DropInput
            height={height}
            emptyContent={defaultEmptyContent}
            draggingContent={defaultDraggingContent}
            hasFilesContent={defaultHasFilesContent}
            value={value}
            onChange={onChange}
            multiple={multiple}
            allowedType={fileAccept[allowedType]}
            classes={{
                wrapper: wrapperClasses,
                dragging: draggingClasses
            }}
        />
    )
}

const defaultEmptyContent = (
    <>
        <div>
            <FaImage className="scale-150 mr-8 text-gray-400" />{" "}
            <span className="align-middle">Drop your files here</span>
        </div>
        <p className="mt-4">
            or <button className="hover:underline font-bold">Click to Upload</button>{" "}
        </p>
    </>
);

const defaultDraggingContent = <p className="font-bold text-body2">Drop your files here ⬇⬇⬇</p>;

const defaultHasFilesContent = (
    <p className="font-bolder">Files Uploaded Successfully!!</p>
);