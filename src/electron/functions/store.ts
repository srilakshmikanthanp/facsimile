// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as property from "../property";
import { Pair } from '../interfaces';
import keytar from "keytar";


// get all account and passwords
export async function getAllKeyValues(): Promise<Pair[]> {
  return (await keytar.findCredentials(
    property.getServiceName()
  )).map((value: { account: string, password: string }) => {
    return { key: value.account, value: value.password };
  })
}

// set new account password
export async function setKeyValue({ key, value }: Pair) {
  return keytar.setPassword(
    property.getServiceName(), key, value
  );
}

// get the account password
export async function getKeyValue(key: string) {
  return keytar.getPassword(
    property.getServiceName(), key
  );
}

// delete the account
export async function deleteKey(key: string) {
  return keytar.deletePassword(
    property.getServiceName(), key
  );
}
