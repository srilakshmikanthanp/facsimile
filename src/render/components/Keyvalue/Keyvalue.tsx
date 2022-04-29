// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { HTMLAttributes, useRef, useState } from "react";
import styles from "./Keyvalue.module.css";
import { Pair } from "../../interfaces";

// Properties to Key Value Component
interface IProps extends HTMLAttributes<HTMLDivElement> {
  pair: Pair;
  onDelete?: (pair: Pair) => void;
  onSelected?: (pair: Pair) => void;
  onRenamed?: (oldKey: string, newKey: string) => void;
}

// Actual Component
export default function Keyvalue({ tabIndex, className, pair, onDelete, onSelected, onRenamed }: IProps) {
  // Is content editable
  const [isContentEditable, setIsContentEditable] = useState(false);

  // Ref for the Div
  const divRef = useRef<HTMLDivElement>(null);

  // Double Click Handler
  const doubleClickHandler = () => onSelected && onSelected(pair);

  // on Key press Handler
  const onKeyDownHandler = (event: React.KeyboardEvent) => {
    if (isContentEditable && event.key === "Enter") {
      applyContentEditable();
    } else if (event.key === "Enter") {
      onSelected && onSelected(pair);
    } else if (event.key === "Delete") {
      onDelete && onDelete(pair);
    } else if (event.key === "F2") {
      setIsContentEditable(true);
    } else if (event.key === "Escape") {
      resetContentEditable();
    }
  }

  // Apply the content editable
  const applyContentEditable = () => {
    if (divRef.current && isContentEditable) {
      const newKey = divRef.current?.innerText ?? "";
      onRenamed && onRenamed(pair.key, newKey);
      setIsContentEditable(false);
    }
  }

  // Reset the content editable
  const resetContentEditable = () => {
    if (isContentEditable && divRef.current) {
      divRef.current.innerText = pair.key;
      setIsContentEditable(false);
    }
  }

  // class names for the component
  const classNames = `${styles.Keyvalue}`;

  // add if className is passed
  if (className) {
    classNames.concat(` ${className}`);
  }

  // Render
  return (
    <div
      contentEditable={isContentEditable}
      onDoubleClick={doubleClickHandler}
      onBlur={resetContentEditable}
      onKeyDown={onKeyDownHandler}
      ref={divRef}
      tabIndex={tabIndex}
      className={classNames}
      suppressContentEditableWarning={true}
    >
      {pair.key}
    </div>
  );
}
