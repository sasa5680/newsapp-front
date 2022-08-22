import axios from "axios";

let store; //전역 상태

//전역상태 주입받는 함수
export const injectStore = (_store) => {
  store = _store;
};

//axios 객체 생성 (토큰이 필요한 요청의 경우)
export const axiosWithToken = axios.create({
  withCredentials: true,
});

//인터셉터 설정
axiosWithToken.interceptors.request.use(
  (config) => {

    const token = store.token;
    if (token === "") {
      return config;
    }

    //토큰을 헤더에 넣어준다.
    config.headers = {
      "content-type": "application/json;charset=UTF-8",
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    return config;
  },
  (error) => {
    console.log(error);
  }
);