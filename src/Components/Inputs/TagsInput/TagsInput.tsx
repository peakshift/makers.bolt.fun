import { motion } from "framer-motion";
import { useState } from "react";
import { useController } from "react-hook-form";
import Badge from "src/Components/Badge/Badge";
import { Tag as ApiTag } from "src/utils/interfaces";

type Tag = Pick<ApiTag, 'title'>

interface Props {
    classes?: {
        container?: string
        input?: string
    }
    placeholder?: string
    [k: string]: any
}



export default function TagsInput({
    classes,
    placeholder = 'Write some tags',
    ...props }: Props) {


    const [inputText, setInputText] = useState("");

    const { field: { value, onChange, onBlur } } = useController({
        name: props.name ?? "tags",
        control: props.control,
    })

    const handleSubmit = () => {
        onChange([...value, { title: inputText }]);
        setInputText('');
        onBlur();
    }

    const handleRemove = (idx: number) => {
        onChange((value as Tag[]).filter((_, i) => idx !== i))
        onBlur();
    }


    return (
        <div className={`${classes?.container}`}>
            <div className="input-wrapper relative">
                <input
                    type='text'
                    className={`input-text inline-block ${classes?.input}`}
                    placeholder={placeholder}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={e => {
                        if (e.key === 'Enter' && inputText.trim().length > 1) { e.preventDefault(); handleSubmit() }
                    }}
                />
                {inputText.length > 2 && <motion.span
                    initial={{ scale: 1, y: "-50%" }}
                    animate={{ scale: 1.05 }}
                    transition={{
                        repeat: Infinity,
                        repeatType: 'mirror',
                        duration: .9
                    }}
                    className="text-gray-500 absolute top-1/2 right-16">
                    Enter to Insert
                </motion.span>}
            </div>
            <div className="flex mt-16 gap-8 flex-wrap">
                {(value as Tag[]).map((tag, idx) => <Badge color="gray" key={tag.title} onRemove={() => handleRemove(idx)} >{tag.title}</Badge>)}
            </div>
        </div>
    )
}
