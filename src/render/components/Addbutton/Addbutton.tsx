// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { HTMLAttributes } from "react";
import styles from "./Addbutton.module.css";

// Properties to Add button Component
interface IProps extends HTMLAttributes<HTMLDivElement> {
  onAddRequest?: () => void;
} 

// Actual Component
export default function Addbutton({ className, onAddRequest }: IProps) {
  // Click Handler
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const clickHandler = (_event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onAddRequest();
  }

  // class names for the component
  const classNames = `${styles.Addbutton}`;

  // add if className is passed
  if (className) {
    classNames.concat(` ${className}`);
  }

  // Renderer
  return (
    <div className={classNames} onClick={clickHandler}>
      +
    </div>
  );
}
