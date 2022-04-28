// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { HTMLAttributes, useState } from "react";
import styles from "./IPModal.module.css";
import { Pair } from "../../interfaces";
import ReactModal from "react-modal";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  onEntered: (pair: Pair) => void;
}

export default function Modal({ onEntered }: IProps) {
  // All Modal States
  const [isOpen, setOpen] = useState(true);

  // Modal Handlers
  const onRequestClose = () => {
    setOpen(false);
  }

  return (
    <ReactModal 
      onRequestClose={onRequestClose} 
      isOpen={isOpen}
      className={styles.Modal}
    >
      
    </ReactModal>
  );
}
