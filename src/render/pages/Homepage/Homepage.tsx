// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Addbutton, Keyvalue } from "../../components";
import styles from "./Homepage.module.css";
import { InputModal } from "../../modals";
import { Pair } from "../../interfaces";
import React, { useState } from "react";

// Home Page of the Application
export default function Homepage() {
  // Component States
  const [isModalShowing, setIsModalShowing] = useState(false);

  // Click Handler for the Key Value
  const selectHandler = (pair: Pair) => {
    console.log(pair);
  }

  // on Add Handler
  const onValueAdded = (pair: Pair) => {
    console.log(pair);
    setIsModalShowing(false);
  }

  // on Cancel Handler
  const onCancelled = () => {
    setIsModalShowing(false);
  }

  // Add Handler
  const onAddHandler = () => {
    setIsModalShowing(true);
  }

  // Delete Handler
  const onDelete = (pair: Pair) => {
    console.log(pair);
  }

  // Rename Handler
  const onRename = (oldKey: string, newKey: string) => {
    console.log(oldKey, newKey);
  }

  // A Constant Pairs before states
  const pairs: Pair[] = [
    { key: "Microsoft", value: "xxx" },
    { key: "Google", value: "xxx" },
    { key: "Amazon", value: "xxx" },
    { key: "Amazon", value: "xxx" },
    { key: "Amazon", value: "xxx" },
    { key: "Amazon", value: "xxx" },
    { key: "Amazon", value: "xxx" },
    { key: "Amazon", value: "xxx" },
  ]

  // Key Value Elements
  const elements = pairs.map((value, index) => {
    return (
      <Keyvalue
        onSelected={selectHandler}
        onDelete={onDelete}
        onRenamed={onRename}
        pair={value}
        tabIndex={index}
      />
    );
  });

  return (
    <div className={styles.Homepage}>
      <div>
        <InputModal
          onCancelled={onCancelled}
          show={isModalShowing}
          onAdded={onValueAdded}
        />
      </div>
      <div className={styles.Pairs}>
        {elements}
      </div>
      <div className={styles.Adder}>
        <Addbutton
          onAdd={onAddHandler}
        />
      </div>
    </div>
  )
}
