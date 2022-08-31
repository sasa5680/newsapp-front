import axios from "axios";
//import { axiosWithToken } from "../lib/axios"

import { BASE_URL } from "../const";
import { axiosWithToken } from "../lib/axios";
const USER_API_URL = BASE_URL + "/api/user";


//회원가입 요청
export async function signUp(formData) {

  const URL = USER_API_URL + "/create";
  const res = await axios.post(URL, formData, {
    headers: {
      "Context-Type": "multipart/form-data",
    },
  });

  return res;
}

//이메일 중복확인 
export async function userEmailDupCheck(email) {
  
  const URL = USER_API_URL + `/email/${email}`;
  const res = await axios.get(URL);

  return res;
}


//유저명 중복확인 
export async function userNameDupCheck(name) {
  
  const URL = USER_API_URL + `/name/${name}`;
  const res = await axios.get(URL);

  return res;
}

//유저 읽어오기
export async function readUser(userName) {
  const URL = USER_API_URL + `/${userName}`;
  const res = await axios.get(URL);

  return res;
}

//유저 업데이트
export async function updateUser({userId, form}) {
  

  const URL = USER_API_URL + `/${userId}`;
  const res = await axiosWithToken.put(URL, form, {
    headers: {
      "Context-Type": "multipart/form-data",
    },
  });

  return res;
}

//UUID 유효 확인
export async function userConfirmUUID(uuid){
  const URL = USER_API_URL + `/confirm/${uuid}`

  const res =  await axios.get(URL);
  return res;
}