import { Control, useController } from "react-hook-form";
import styles from "./styles.module.scss";

interface Props {
  control?: Control;
  name?: string;
}

export default function RawMarkdownEditor(props: Props) {
  const {
    field: { value, onChange },
  } = useController({
    control: props.control,
    name: props.name ?? "content",
  });

  return (
    <div className={`${styles["grow-wrap"]}`}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-16 pt-32"
        placeholder={`Write your **stroy** content in raw markdown here...
        `}
      />
    </div>
  );
}
