import React, { useMemo } from "react";
import ReactDOM from "react-dom";

const getContainer = (id) => {
  const el = document.getElementById(id);
  if (el) return el;

  const newEl = document.createElement("div");
  newEl.id = id;
  document.body.appendChild(newEl);
  return newEl;
};

export const Portal = ({ children, id = "root-id" }) => {
  const container = useMemo(() => getContainer(id), [id]);

  return ReactDOM.createPortal(children, container);
};
