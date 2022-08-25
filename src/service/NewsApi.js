import axios from "axios";
import { axiosWithToken } from "../lib/axios"

import { queryBuilder } from "../utils";
import { BASE_URL } from "../const";
const NEWS_API_URL = BASE_URL + "/api/news";

//뉴스 하나 읽어오기
export async function readNews(id) {

  const URL = NEWS_API_URL + `/${id}`;
  console.log(URL)
  const res = await axios.get(URL);

  return res;
}

//뉴스 업로드
export async function createNews(form) {

  const URL = NEWS_API_URL + "/create"
  const res = await axiosWithToken.post(URL, form, {
    headers: {
      "Context-Type": "multipart/form-data",
    },
  });

  return res;
}

//뉴스 수정
export async function updateNews({id, form}) {

  const URL = NEWS_API_URL + `/${id}`;
  const res = await axiosWithToken.put(URL, form, {
    headers: {
      "Context-Type": "multipart/form-data",
    },
  });

  return res;  
}

//뉴스 삭제
export async function deleteNews(id){

  const URL = NEWS_API_URL + `/${id}`;
  const res = await axiosWithToken.delete(URL);

  return res;    
}

//뉴스 목록으로 읽어오기(관리자 전용)
export async function newsList(data){
  
  const URL = NEWS_API_URL + "/admin"+ queryBuilder(data) + "&sort=newsId,desc";
  const res = await axiosWithToken.get(URL);

  return res;      
}

//뉴스 목록으로 읽어오기(일반 유저용)
export async function readNewsListUser(data) {
  const URL = NEWS_API_URL + "/user" + queryBuilder(data) + "&sort=newsId,desc";
  console.log(URL)
  const res = await axios.get(URL);

  return res;
}

//유저 작성 뉴스들 가져오기
export async function readUserNews({userName, page, size}) {
  
  const URL = NEWS_API_URL + `/usernews/${userName}?page=${page}&size=${size}&sort=newsId,desc"`;
  const res = await axios.get(URL);

  return res;
}

//메인뉴스들 가져오기
export async function readMainNews(){

  const URL = NEWS_API_URL + "/main";
  const res = await axios.get(URL);

  return res;
}

//뉴스 승인/승인취소
export async function newsApprove({id, approved}){

  const URL = NEWS_API_URL + `/approve/${id}?approved=${approved}`;
  const res = await axiosWithToken.put(URL);

  return res;
}

//뉴스 메인 수정
export async function newsSetMain({id, main}){

  const URL = NEWS_API_URL + `/newsmain/${id}?newsmain=${main}`;
  const res = await axiosWithToken.put(URL);

  return res;
}


