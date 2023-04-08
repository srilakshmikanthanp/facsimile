// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { addNewKeyValue, removeKeyValue, selectKeyValues } from "./redux/slices";
import { useDispatch, useSelector } from "react-redux";
import { Addbutton, Keyvalue } from "./components";
import { KeyvalueModal } from "./modals";
import styles from "./App.module.css";
import Pair from "./interfaces/Pair";
import { useState } from "react";

// Home Page of the Application
export default function App() {
  // Component States
  const [editInitial, setEditInitial] = useState<Pair<string, string>>({ key: "", val: "" });
  const [newInitial, setNewInitial] = useState<Pair<string, string>>({ key: "", val: "" });
  const [isEditModalShowing, setIsEditModalShowing] = useState(false);
  const [isNewModalShowing, setIsNewModalShowing] = useState(false);
  const [isErrorInEdit, setIsErrorInEdit] = useState(false);
  const [isErrorInNew, setIsErrorInNew] = useState(false);
  const dispatch = useDispatch();

  // List of the key value pairs
  const keyvalues = useSelector(selectKeyValues);

  // Click Handler for the Key Value
  const selectHandler = (pair: Pair<string, string>) => {
    window.keyvalueAPI.copyKeyValue(pair.key);
    window.keyvalueAPI.hideWindow();
  }

  // on key down handler for add
  document.body.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === '=' && e.ctrlKey) {
      setIsNewModalShowing(true);
    }
  });

  // Key Value Add Handler
  const onAddRequested = () => {
    setIsNewModalShowing(true);
  }

  // Delete Handler
  const onDeleteRequest = (pair: Pair<string, string>) => {
    dispatch(removeKeyValue(pair));
  }

  // Rename Handler
  const onEditRequest = (pair: Pair<string, string>) => {
    setIsErrorInEdit(false);
    setEditInitial(pair);
    setIsEditModalShowing(true);
  }

  // on Pair Entered Handler
  const onPairEntered = (pair: Pair<string, string>) => {
    if (keyvalues.find(p => p.key === pair.key)) {
      setIsErrorInNew(true);
      return;
    }

    dispatch(addNewKeyValue(pair));
    setIsErrorInNew(false);
    setIsNewModalShowing(false);
    setNewInitial({ key: "", val: "" });
  }

  // on Edit Handler
  const onPairEdited = (pair: Pair<string, string>) => {
    if (keyvalues.find(p => p.key === pair.key && p.key !== editInitial.key)) {
      setIsErrorInEdit(true);
      return;
    }

    dispatch(removeKeyValue(editInitial));
    dispatch(addNewKeyValue(pair));
    setIsErrorInEdit(false);
    setIsEditModalShowing(false);
    setEditInitial({ key: "", val: "" });
  }

  // Key Value Elements
  const elements = keyvalues.map((value, index) => {
    return (
      <Keyvalue
        onDeleteRequested={onDeleteRequest}
        onEditRequested={onEditRequest}
        onSelected={selectHandler}
        key={index}
        pair={value}
        tabIndex={index}
      />
    );
  });
  // Render Component
  const emptyMessage = (
    <div className={styles.EmptyMessage}>
      <p>Add Some Stuff to Get Started</p>
      <p><span>CTRL</span> + <span>+</span> to Add New One</p>
      <p><span>F2</span> to Edit the Existing</p>
      <p><span>DELETE</span> to Delete Existing</p>
      <p><span>CTRL</span> + <span>q</span> to quit</p>
    </div>
  );

  // Render
  return (
    <div className={styles.App}>
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
          show={isNewModalShowing}
          initial={newInitial}
          keyError={isErrorInNew}
        />
      </div>
      <div className={styles.Pairs}>
        {elements.length > 0 ? elements : emptyMessage}
      </div>
      <div className={styles.Adder}>
        <Addbutton onAddRequest={onAddRequested} />
      </div>
    </div>
  )
}
