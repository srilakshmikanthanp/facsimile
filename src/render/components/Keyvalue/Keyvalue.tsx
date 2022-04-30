// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { HTMLAttributes } from "react";
import styles from "./Keyvalue.module.css";
import { Pair } from "../../interfaces";

// Properties to Key Value Component
interface IProps extends HTMLAttributes<HTMLDivElement> {
  onEditRequested?: (pair: Pair) => void;
  onSelected?: (pair: Pair) => void;
  onDeleteRequested?: (pair: Pair) => void;
  pair: Pair;
}

// Actual Component
export default function Keyvalue({ tabIndex, className, pair, onDeleteRequested: onDelete, onSelected, onEditRequested }: IProps) {
  // Double Click Handler
  const doubleClickHandler = () => onSelected && onSelected(pair);

  // on Key press Handler
  const onKeyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key === "F2") {
      onEditRequested && onEditRequested(pair);
    } else if (event.key === "Enter") {
      onSelected && onSelected(pair);
    } else if (event.key === "Delete") {
      onDelete && onDelete(pair);
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
      onKeyDown={onKeyDownHandler}
      tabIndex={tabIndex}
      className={classNames}
    >
      {pair.key}
    </div>
  );
}
