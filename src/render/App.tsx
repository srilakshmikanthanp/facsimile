// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { addNewKeyValue, removeKeyValue, selectKeyValues } from "./redux/slices";
import KeyValueModal from "./modals/KeyValueInput";
import PairItem from "./components/PairItem";
import IPair from "./interfaces/IPair";
import Welcome from "./components/Welcome";
import AddButton from "./components/AddButton";
import './App.css';

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

// Application Container
const ApplicationContainer = styled(Container)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: flex;
`;

// Add Button Container
const AddButtonContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

// App Component
export default function App() {
  // State Variables
  const [editingPair, setEditingPair] = useState<IPair<string, string>>();
  const [showModal, setShowModal] = useState<boolean>(false);

  // Dispatcher
  const dispatch = useDispatch();

  // On Pair Entered Event
  const addNewPairHandler = (pair: IPair<string, string>) => {
    dispatch(addNewKeyValue(pair));
  }

  // Remove key value pair
  const onDeleteRequested = (pair: IPair<string, string>) => {
    dispatch(removeKeyValue(pair));
  }

  // Select key value pair
  const onSelected = (pair: IPair<string, string>) => {
    window.keyValueAPI.copyKeyValue(pair.key);
  }

  // Add new key value pair
  const onEditRequested = (pair: IPair<string, string>) => {
    setEditingPair(pair);
    dispatch(removeKeyValue(pair));
    setShowModal(true);
  }

  // on Pair Edited
  const onPairEdited = (pair: IPair<string, string>) => {
    dispatch(addNewKeyValue(pair));
    setShowModal(false);
  }

  // on Cancelled
  const onCancelled = () => {
    dispatch(addNewKeyValue(editingPair));
    setShowModal(false);
    setEditingPair(undefined);
  }

  // on Closed
  const onClosed = () => {
    if (editingPair) {
      dispatch(addNewKeyValue(editingPair));
      setEditingPair(undefined);
    }

    setShowModal(false);
  }

  // Key values
  const keyValues = useSelector(selectKeyValues).map((pair, index) => {
    return (
      <PairItem
        onDeleteRequested={onDeleteRequested}
        onSelected={onSelected}
        onEditRequested={onEditRequested}
        pair={pair}
        tabIndex={index}
      />
    )
  });

  return (
    <ApplicationContainer fluid={true} className="w-100 h-100">
      {keyValues.length === 0 ? <Welcome /> : keyValues}
      <AddButtonContainer>
        <AddButton onPairEntered={addNewPairHandler} />
      </AddButtonContainer>
      <KeyValueModal
        onPairEntered={onPairEdited}
        onClosed={onClosed}
        onCancelled={onCancelled}
        isVisible={showModal}
        titleText="Edit Key Value"
        okayText="Edit"
        cancelText="Cancel"
        placeholder={editingPair}
      />
    </ApplicationContainer>
  );
}
