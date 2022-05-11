import { useToggle } from "@react-hookz/web";
import React from "react";
import { FileDrop } from "react-file-drop";

export default function DropInput({
  value: files,
  onChange,
  emptyContent,
  draggingContent,
  hasFilesContent,
  height,
  multiple = false,
  allowedType = "*",
  classes = {},
}) {
  const [isDragging, toggleDrag] = useToggle(false);
  const fileInputRef = React.useRef(null);

  const onAddFiles = (_files) => {
    onChange(_files);
    // do something with your files...
  };

  const uploadClick = () => {
    fileInputRef.current.click();
  };

  const status = isDragging ? "dragging" : files ? "has-files" : "empty";

  return (
    <div
      style={{
        height: height + "px",
      }}
    >
      <FileDrop
        onDrop={(files) => onAddFiles(files)}
        onTargetClick={uploadClick}
        onFrameDragEnter={() => toggleDrag(true)}
        onFrameDragLeave={() => toggleDrag(false)}
        onFrameDrop={() => toggleDrag(false)}
        className={`h-full cursor-pointer`}
        targetClassName={`h-full ${classes.wrapper}`}
        draggingOverFrameClassName={`${classes.dragging}`}
      >
        {status === "dragging" && draggingContent}
        {status === "empty" && emptyContent}
        {status === "has-files" && hasFilesContent}
      </FileDrop>
      <input
        onChange={(e) => onAddFiles(e.target.files)}
        ref={fileInputRef}
        type="file"
        className="hidden"
        multiple={multiple}
        accept={allowedType}
      />
    </div>
  );
}
