// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT


// get the service name of app
export function getServiceName(): string {
  return process.env.APP_NAME ?? "Facsimile";
}
