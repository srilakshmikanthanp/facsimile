// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import IPair from "./interfaces/IPair";

export interface IkeyValueAPI {
  getAllKeyValues: () => Promise<Array<IPair<string, string>>>;
  getKeyValue: (key: string) => Promise<IPair<string, string>>;
  setKeyValue: (pair: IPair<string, string>) => void;
  delKeyValue: (key: string) => void;
  copyKeyValue: (key: string) => void,
}

declare global {
  interface Window {
    keyValueAPI: IkeyValueAPI;
  }
}
