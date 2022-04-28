// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { HTMLAttributes } from "react";
import styles from "./Keyvalue.module.css";

// Properties to Key Value Component
interface IProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  onSelected?: (key: string, value: string) => void;
}

// Actual Component
export default function Keyvalue({ tabIndex, className, label, value, onSelected }: IProps) {
  // Double Click Handler
  const doubleClickHandler = () => onSelected && onSelected(label, value);

  // on Key press Handler
  const onKeyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      onSelected && onSelected(label, value);
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
      onDoubleClick={doubleClickHandler}
      tabIndex={tabIndex}
      className={classNames}
      onKeyDown={onKeyDownHandler}
    >
      {label}
    </div>
  );
}
