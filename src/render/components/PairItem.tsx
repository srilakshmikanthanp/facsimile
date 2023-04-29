// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { HTMLAttributes } from "react";
import IPair from "../interfaces/IPair";
import styled from "styled-components";

// Base Properties for the Component
interface IPairItemProps extends HTMLAttributes<HTMLDivElement> {
  onDeleteRequested?: (pair: IPair<string, string>) => void;
  onSelected?: (pair: IPair<string, string>) => void;
  onEditRequested?: (pair: IPair<string, string>) => void;
  pair: IPair<string, string>;
}

// ListItem
const ListItem = styled.div`
  height: max-content;
  width: 100%;
  text-align: center;
  padding: 10px;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: bold;
  outline: none;

  :hover {
    backdrop-filter: brightness(1.2) blur(2px) saturate(1.2);
    cursor: pointer;
  }

  :focus {
    background-color: #007bff;
    color: white;
  }
`;

// Actual Component
export default function PairItem(props: IPairItemProps) {
  // on Key press Handler
  const onKeyDown = (event: React.KeyboardEvent) => {
    // current target of the event
    const target = event.currentTarget;

    // switch on key
    switch (event.key) {
      case "ArrowUp":
        (target.previousSibling as HTMLElement)?.focus();
        break;
      case "ArrowDown":
        (target.nextSibling as HTMLElement)?.focus();
        break;
      case "Delete":
        props.onDeleteRequested?.(props.pair);
        break;
      case "Enter":
        props.onSelected?.(props.pair);
        break;
      case "F2":
        props.onEditRequested?.(props.pair);
        break;
    }
  }

  // Double Click Handler
  const onDoubleClick = () => {
    props.onSelected?.(props.pair);
  }

  // Render
  return (
    <ListItem
      onDoubleClick={onDoubleClick}
      onKeyDown={onKeyDown}
      tabIndex={props.tabIndex}>
      {props.pair.key}
    </ListItem>
  );
}
