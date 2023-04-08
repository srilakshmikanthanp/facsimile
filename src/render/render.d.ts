// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Pair from "./interfaces/Pair";

export interface IkeyvalueAPI {
  getKeyValue: (key: string) => Promise<Pair<string, string>>;
  setKeyValue: (pair: Pair<string, string>) => void;
  delKeyValue: (key: string) => void;
  getAllKeyValues: () => Promise<Array<Pair<string, string>>>;
  copyKeyValue: (key: string) => void,
  hideWindow: () => void,
}

declare global {
  interface Window {
    keyvalueAPI: IkeyvalueAPI;
  }
}
