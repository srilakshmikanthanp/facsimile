// Copyright (c) 2023 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import IPair from "../interfaces/IPair";

// Component Properties
interface IKeyValueModalProps {
  onPairEntered?: (pair: IPair<string, string>) => void;
  onCancelled?: () => void;
  onClosed?: () => void;
  titleText: string;
  cancelText: string;
  okayText: string;
  isVisible: boolean;
  placeholder?: IPair<string, string>;
}

// Component
export default function KeyValueModal(props: IKeyValueModalProps) {
  // State Variables
  const [key, setKey] = useState<string>("");
  const [val, setVal] = useState<string>("");

  // use effect
  useEffect(() => {
    setKey(props.placeholder?.key || "");
    setVal(props.placeholder?.val || "");
  }, [props.placeholder]);

  // on okay handler
  const onOkayHandler = () => {
    if (key && val) props.onPairEntered?.({ key, val });
  }

  // Render
  return (
    <Dialog open={props.isVisible} onClose={props.onClosed}>
      <DialogTitle>{props.titleText}</DialogTitle>
      <DialogContent>
        <TextField 
          margin="dense"
          label="Key" 
          value={key} 
          type="text" 
          onChange={(e) => setKey(e.target.value)} 
        />
        <TextField 
          margin="dense"
          label="Value" 
          value={val} 
          type="password" 
          onChange={(e) => setVal(e.target.value)} 
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onCancelled?.()}>
          {props.cancelText}
        </Button>
        <Button onClick={onOkayHandler} disabled={!key || !val}>
          {props.okayText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
