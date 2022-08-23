import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AdminPage from "../pages/AdminPage";
import CatePage from "../pages/CatePage";

//import Pages
import EditNews from "../pages/EditNews";
import MainPage from "../pages/MainPage";
import NewsPage from "../pages/NewsPage";
import SearchPage from "../pages/SearchPage";
import SigninPage from "../pages/SignInPage";
import SignUpConfirmPage from "../pages/SignUpConfirmPage";
import SignupPage from "../pages/SignupPage";
import UpdateNews from "../pages/UpdateNews";
import UserPage from "../pages/UserPage";

import {
  useAccountState,
} from "../context/AccountContext"


export default function Router() {
  


  return (
    <Switch>
      <Route exact path="/" component={MainPage}></Route>
      <PrivateRoute Route exact path="/edit" component={EditNews}></PrivateRoute>
      <PrivateRoute exact path="/update/:id" component={UpdateNews}></PrivateRoute>
      <Route exact path="/news/:id" component={NewsPage}></Route>
      <Route exact path="/cate/:cate" component={CatePage}></Route>
      <Route exact path="/search" component={SearchPage}></Route>
      <Route exact path="/signin" component={SigninPage}></Route>
      <Route exact path="/signup" component={SignupPage}></Route>
      <PrivateRoute exact path="/admin" component={AdminPage}></PrivateRoute>
      <Route exact path="/user/:userName" component={UserPage}></Route>
      <Route exact path="/confirm/:uuid" component={SignUpConfirmPage}></Route>
    </Switch>
  );
}

function PrivateRoute({ component: Component, ...rest }) {

  let accountState = useAccountState();
  
    return (
      <Route
        {...rest}
        render={(props) =>{
          
          if (!accountState.isSet) return <></>;
          if (accountState.isLogin) return <Component {...props} />;
          else
            return (
              <Redirect
                to={{ pathname: "/signin", state: { from: props.location } }}
              />
            );
          }
        }
      />
    );
}

