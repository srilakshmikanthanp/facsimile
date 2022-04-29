// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Modal, FloatingLabel, Form } from "react-bootstrap";
import React, { HTMLAttributes, useState } from "react";
import styles from "./InputModal.module.css";
import { Pair } from "../../interfaces";

// Component Properties
interface IProps extends HTMLAttributes<HTMLDivElement> {
  onAdded?: (pair: Pair) => void;
  onCancelled?: () => void;
  initial?: Pair;
  keyError?: boolean;
  show: boolean;
}

// Actual Component
export default function InputModal({ show, onAdded, onCancelled, initial = { key: "", value: "" }, keyError = false }: IProps) {
  // States for compoennt
  const [isValidated, setIsValidated] = useState(false);
  const [key, setKey] = useState(initial.key);
  const [value, setValue] = useState(initial.value);

  // On Submit Handler
  const onSubmit = () => {
    if (key === "" || value === "") {
      setIsValidated(true);
      return;
    }

    onAdded && onAdded({
      key: key, value: value
    });

    setIsValidated(false);
    setKey("");
    setValue("");
  }

  // Render
  return (
    <Modal show={show} onHide={onCancelled} centered={true} dialogClassName={styles.Modal}>
      <Modal.Header className={styles.Header} closeButton />
      <Modal.Body className={styles.Body}>
        <Form noValidate validated={isValidated}>
          <FloatingLabel controlId="keyinput" label="Key" className="mb-3">
            <Form.Control
              onChange={e => setKey(e.target.value)}
              type="text"
              placeholder="Key"
              required
              isInvalid={keyError}
              value={key}
            />
          </FloatingLabel>
          <FloatingLabel controlId="valueinput" label="Value">
            <Form.Control
              onChange={e => setValue(e.target.value)}
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
