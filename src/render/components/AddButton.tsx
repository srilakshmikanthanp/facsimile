// Copyright (c) 2023 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import KeyValueModal from "../modals/KeyValueInput";
import IPair from "../interfaces/IPair";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";

// Add button Properties
interface IAddButtonProps {
  onPairEntered?: (pair: IPair<string, string>) => void;
}

// Add button component
export default function AddButton({ onPairEntered }: IAddButtonProps) {
  // State variables
  const [showModal, setShowModal] = useState<boolean>(false);

  // On Pair Entered
  const onOkayHandler = (pair: IPair<string, string>) => {
    onPairEntered?.(pair); setShowModal(false);
  }

  // on ctrl + + pressed
  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "=") setShowModal(true);
  });

  // Render
  return (
    <React.Fragment>
      <Fab color="primary" onClick={() => setShowModal(true)}>
        <AddIcon />
      </Fab>
      <KeyValueModal
        onCancelled={() => setShowModal(false)}
        onClosed={() => setShowModal(false)}
        onPairEntered={onOkayHandler}
        isVisible={showModal}
        titleText="Add Key Value"
        okayText="Add"
        cancelText="Cancel"
      />
    </React.Fragment>
  );
}
