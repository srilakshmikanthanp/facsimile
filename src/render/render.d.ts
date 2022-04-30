// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Pair } from "./interfaces";

export interface IkeyvalueAPI {
  getKeyValue: (key: string) =>  Promise<Pair>;
  setKeyValue: (pair: Pair) => void;
  delKeyValue: (key: string) => void;
  getAllKeyValues: () => Promise<Array<Pair>>;
  copyKeyValue: (key: string) => void,
  hideWindow: () => void,
}

declare global {
  interface Window {
    keyvalueAPI: IkeyvalueAPI;
  }
}
