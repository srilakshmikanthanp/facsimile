// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { HTMLAttributes, useEffect, useState, KeyboardEvent } from "react";
import { Modal, FloatingLabel, Form } from "react-bootstrap";
import styles from "./KeyvalueModal.module.css";
import { Pair } from "../../interfaces";

// Component Properties
interface IProps extends HTMLAttributes<HTMLDivElement> {
  onPairEntered?: (pair: Pair) => void;
  onCancelled?: () => void;
  initial?: Pair;
  keyError?: boolean;
  show: boolean;
}

// Actual Component
export default function KeyvalueModal({
  onPairEntered,
  initial,
  keyError,
  show,
  onCancelled
}: IProps) {
  // States for compoennt
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [key, setKey] = useState<string>(initial?.key ?? "");
  const [value, setValue] = useState<string>(initial?.value ?? "");

  // initializes the component key value pair
  const initializeKeyvalue = () => {
    setKey(initial?.key ?? "");
    setValue(initial?.value ?? "");
  }

  // On Submit Handler
  const onSubmit = () => {
    if (key === "" || value === "") {
      setIsValidated(true);
      return;
    }

    onPairEntered && onPairEntered({
      key: key, value: value
    });

    setIsValidated(false);
  }

  // on Key Down Handler Submit
  const onKeyDownSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  }

  // on key Event Handler 
  const onKeyDownWindow = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Escape") {
      e.stopPropagation();
      e.stopPropagation();
      console.log("Escape");
    }
  }

  // use Effect to set the initial value
  useEffect(initializeKeyvalue, [initial]);

  // Render
  return (
    <Modal show={show} onHide={onCancelled} centered={true} dialogClassName={styles.Modal}>
      <Modal.Header className={styles.Header} closeButton onKeyDown={onKeyDownWindow}/>
      <Modal.Body className={styles.Body}>
        <Form noValidate validated={isValidated}>
          <FloatingLabel controlId="keyinput" label="Key" className="mb-3">
            <Form.Control
              onChange={e => setKey(e.target.value ?? key)}
              type="text"
              placeholder="Key"
              required
              isInvalid={keyError ?? false}
              value={key}
              tabIndex={1}
            />
          </FloatingLabel>
          <FloatingLabel controlId="valueinput" label="Value">
            <Form.Control
              onChange={e => setValue(e.target.value ?? value)}
              type="password"
              placeholder="Key"
              required
              value={value}
              tabIndex={2}
            />
          </FloatingLabel>
        </Form>
      </Modal.Body>
      <Modal.Footer className={styles.Footer}>
        <div 
          className={styles.Button} 
          onClick={onSubmit} 
          tabIndex={3} 
          onKeyDown={onKeyDownSubmit}
        >
          ➜
        </div>
      </Modal.Footer>
    </Modal>
  );
}
