// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Modal, FloatingLabel, Form } from "react-bootstrap";
import React, { HTMLAttributes, useEffect, useState } from "react";
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

  console.log(initial);

  // initializes the component
  const initializer = () => {
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
    setKey("");
    setValue("");
  }

  // use Effect to set the initial value
  useEffect(initializer, [initial]);

  // Render
  return (
    <Modal show={show} onHide={onCancelled} centered={true} dialogClassName={styles.Modal}>
      <Modal.Header className={styles.Header} closeButton />
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
            />
          </FloatingLabel>
          <FloatingLabel controlId="valueinput" label="Value">
            <Form.Control
              onChange={e => setValue(e.target.value ?? value)}
              type="password"
              placeholder="Key"
              required
              value={value}
            />
          </FloatingLabel>
        </Form>
      </Modal.Body>
      <Modal.Footer className={styles.Footer}>
        <div className={styles.Button} onClick={onSubmit}>
          ➜
        </div>
      </Modal.Footer>
    </Modal>
  );
}
