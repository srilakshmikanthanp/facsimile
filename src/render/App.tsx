// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Keyvalue } from "./components";
import React from "react";

export default function App() {
  return (
    <div className="d-flex flex-column p-2">
      <Keyvalue tabIndex={0} label="Google" value="Hello" />
      <Keyvalue tabIndex={1} label="Amazon" value="Hello" />
      <Keyvalue tabIndex={2} label="Microsoft" value="Hello" />
      <Keyvalue tabIndex={3} label="Asus" value="Hello" />
      <Keyvalue tabIndex={4} label="Outlook" value="Hello" />
    </div>
  );
}
