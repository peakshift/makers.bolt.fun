import { useMountEffect } from "@react-hookz/web";
import React, { useEffect } from "react";

interface Props {
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export default function WindowConfirm(props: Props) {
  useMountEffect(() => {
    if (window.confirm(props.message)) props.onConfirm?.();
    else props.onCancel?.();
  });

  return null;
}
