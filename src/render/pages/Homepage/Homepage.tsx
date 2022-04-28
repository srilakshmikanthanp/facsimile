// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Addbutton, Keyvalue } from "../../components";
import styles from "./Homepage.module.css";
import { Pair } from "../../interfaces";
import React from "react";


export default function Homepage() {
  // Click Handler for the Key Value
  const selectHandler = (pair: Pair) => {
    console.log(pair);
  }

  // Add Handler
  const addHandler = () => {
    console.log("New Add");
  }

  // A Constant Pairs before states
  const pairs: Pair[] = [
    { key: "Microsoft", value: "xxx" },
    { key: "Google", value: "xxx" },
    { key: "Amazon", value: "xxx" },
  ]

  // Key Value Elements
  const elements = pairs.map((value, index) => {
    return (
      <Keyvalue 
        onSelected={selectHandler} 
        pair={value} 
        tabIndex={index}
      />
    );
  });

  return (
    <div className={styles.Homepage}>
      <div className={styles.Pairs}>
        {elements}
      </div>
      <div className={styles.Adder}>
        <Addbutton onAdd={addHandler}/>
      </div>
    </div>
  )
}
