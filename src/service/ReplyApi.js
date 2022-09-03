import axios from "axios";
import { axiosWithToken } from "../lib/axios";

import { queryBuilder } from "../utils";
import { BASE_URL } from "../const";
const REPLY_API_URL = BASE_URL + "/api/reply";

//뉴스 하나 읽어오기
export async function createReply(data) {
  const URL = REPLY_API_URL + `/create`;
  const res = await axiosWithToken.post(URL, data);

  return res;
}
