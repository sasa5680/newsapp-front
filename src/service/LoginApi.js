import axios from "axios";
//import { axiosWithToken } from "../lib/axios"

import { BASE_URL } from "../const";
const LOGIN_API_URL = BASE_URL + "/api/login";

//이메일로 로그인 요청
export async function signInEmail(data) {
  const URL = LOGIN_API_URL + "/email";
  const res = await axios.post(URL, data);

  return res;
}
