import React, { useReducer, createContext, useContext, useEffect } from "react";
import { injectStore } from "../lib/axios";
// 초깃값 (상태가 객체가 아니라 그냥 숫자여도 상관 없습니다.)
const initialState = {
  isSet: false,
  isLogin: false,
  isError: false,
  userName: null,
  userProfile: null,
  userRole: null,
  token: null,
};

const AccountStateContext = createContext();
const AccountDispatchContext = createContext();

function AccountReducer(state, action) {
  
  switch (action.type) {

    case "SET" : 

    return {
      ...action.data,
      isSet: true,
    }

    case "LOGIN":

      const newState = {
        ...state,
        isLogin: true,
        token: action.data.token,
        userName: action.data.userName,
        userProfile: action.data.userProfile,
        userEmail: action.data.userEmail,
        userRole: action.data.userRole,
      };
      
      //로컬 스토리지에 등록
      window.localStorage.setItem("user", JSON.stringify(newState));

      return newState;
      
    case "LOGOUT":
      
    //로컬 스토리지 내용을 삭제
      window.localStorage.removeItem("user");

      return {
        ...initialState,
        isSet: true,
      };

    default:
      throw new Error(`Unhandled action type: $`);
  }
}

export function AccountProvider({ children }) {
  
  const [state, dispatch] = useReducer(AccountReducer, initialState);

  //최초 로딩 시 로컬 스토리지의 데이터를 context에 복사
  useEffect(() => {
    dispatch({type: "SET", data: JSON.parse(window.localStorage.getItem("user"))});
  }, []);
  
  injectStore(state);
 
  return (
    <AccountStateContext.Provider value={state}>
      <AccountDispatchContext.Provider value={dispatch}>
        {children}
      </AccountDispatchContext.Provider>
    </AccountStateContext.Provider>
  );
}

export function useAccountState() {
  return useContext(AccountStateContext);
}

export function useAccountDispatch() {
  return useContext(AccountDispatchContext);
}
