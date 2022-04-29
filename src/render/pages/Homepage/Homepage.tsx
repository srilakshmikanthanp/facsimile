// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { addNewKeyvalue, removeKeyvalue, selectKeyvalues } from "../../redux/slices";
import { useDispatch, useSelector } from "react-redux";
import { Addbutton, Keyvalue } from "../../components";
import { KeyvalueModal } from "../../modals";
import styles from "./Homepage.module.css";
import { Pair } from "../../interfaces";
import React, { useState } from "react";

// Home Page of the Application
export default function Homepage() {
  // Component States
  const [editInitial, setEditInitial] = useState<Pair>({ key: "", value: "" });
  const [isEditModalShowing, setIsEditModalShowing] = useState(false);
  const [isNewModalShowing, setIsNewModalShowing] = useState(false);
  const [isErrorInEdit, setIsErrorInEdit] = useState(false);
  const [isErrorInNew, setIsErrorInNew] = useState(false);
  const dispatch = useDispatch();

  // List of the key value pairs
  const keyvalues = useSelector(selectKeyvalues);

  // Click Handler for the Key Value
  const selectHandler = (pair: Pair) => {
    console.log(pair);
  }

  // Key Value Add Handler
  const onAddRequested = () => {
    setIsNewModalShowing(true);
  }

  // Delete Handler
  const onDelete = (pair: Pair) => {
    dispatch(removeKeyvalue(pair));
  }

  // Rename Handler
  const onUpdate = (pair: Pair) => {
    setIsErrorInEdit(false);
    setEditInitial(pair);
    setIsEditModalShowing(true);
  }

  // on Pair Entered Handler
  const onPairEntered = (pair: Pair) => {
    if (keyvalues.find(p => p.key === pair.key)) {
      setIsErrorInNew(true);
      return;
    }

    dispatch(addNewKeyvalue(pair));
    setIsErrorInNew(false);
    setIsNewModalShowing(false);
  }

  // on Edit Handler
  const onPairEdited = (pair: Pair) => {
    if (keyvalues.find(p => p.key === pair.key && p.key !== editInitial.key)) {
      setIsErrorInEdit(true);
      return;
    }

    dispatch(removeKeyvalue(editInitial));
    dispatch(addNewKeyvalue(pair));
    setIsErrorInEdit(false);
    setIsEditModalShowing(false);
  }

  // Key Value Elements
  const elements = keyvalues.map((value, index) => {
    return (
      <Keyvalue
        onEditRequested={onUpdate} 
        onSelected={selectHandler} 
        onDelete={onDelete}
        key={index}
        pair={value}
        tabIndex={index}
      />
    );
  });

  // Render
  return (
    <div className={styles.Homepage}>
      <div>
        <KeyvalueModal
          onCancelled={() => setIsEditModalShowing(false)}
          onPairEntered={onPairEdited}
          show={isEditModalShowing}
          initial={editInitial}
          keyError={isErrorInEdit}
        />
      </div>
      <div>
        <KeyvalueModal
          onCancelled={() => setIsNewModalShowing(false)}
          onPairEntered={onPairEntered}
          show={(isNewModalShowing)}
          keyError={isErrorInNew}
        />
      </div>
      <div className={styles.Pairs}>
        {elements}
      </div>
      <div className={styles.Adder}>
        <Addbutton onAdd={onAddRequested} />
      </div>
    </div>
  )
}
