import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import * as SecureStore from "expo-secure-store";

export async function saveToken(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getToken(key: string) {
  const result = await SecureStore.getItemAsync(key);
  return result;
}

let token = "";


const useAxios = async function apiRequest(
  request: AxiosRequestConfig
): Promise<AxiosResponse> {
  const token = "958455015C7DB0F3CEDD56F8F3E50E94568905B636A4954A478030E2603E8A7758F8843B7A6EDC837CA5C6B57B262FDF3B44C7FF706DC3EB991EECFC7840FEC7";
  const resp = await axios.request({
    ...request,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": 3456,
      "Host": "68.169.57.98:82",
      "Authorization": `Bearer ${token}`,
      "auth-token": `Bearer ${token}`,
      ...request.headers,
    },
  });
  if (resp.status === 401) {
    console.log("clear");
  }
  return resp;
};
export default useAxios;
