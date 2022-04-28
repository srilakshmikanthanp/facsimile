// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { HTMLAttributes } from "react";
import styles from "./Addbutton.module.css";

// Properties to Add button Component
interface IProps extends HTMLAttributes<HTMLDivElement> {
  onAdd?: () => void;
} 

// Actual Component
export default function Addbutton({ className, onAdd }: IProps) {
  // Click Handler
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const clickHandler = (_event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onAdd();
  }

  // Key down Handler
  const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key.toLocaleUpperCase() === "A" && event.ctrlKey) {
      onAdd();
    }
  }

  // class names for the component
  const classNames = `${styles.Addbutton}`;

  // add if className is passed
  if (className) {
    classNames.concat(` ${className}`);
  }

  // Renderer
  return (
    <div 
      onKeyDown={keyDownHandler}
      className={classNames} 
      onClick={clickHandler} 
    >
      +
    </div>
  );
}
