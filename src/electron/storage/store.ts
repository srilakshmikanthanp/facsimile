// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as C from "../constants/constants";
import Pair from '../interface/pair';
import keytar from "keytar";


// get all account and passwords
export async function getAllKeyValues(): Promise<Pair<string, string>[]> {
  return (await keytar.findCredentials(C.APP_SERVICE_NAME)).map((
    value: { account: string, password: string }
  ) => {
    return { key: value.account, val: value.password };
  });
}

// set new account password
export async function setKeyValue({ key, val }: Pair<string, string>) {
  return keytar.setPassword(C.APP_SERVICE_NAME, key, val);
}

// get the account password
export async function getKeyValue(key: string) {
  return keytar.getPassword(C.APP_SERVICE_NAME, key);
}

// delete the account
export async function deleteKey(key: string) {
  return keytar.deletePassword(C.APP_SERVICE_NAME, key);
}
