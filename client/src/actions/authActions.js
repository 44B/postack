import axios from "axios";
import { returnErrors } from "./errorActions";
import {
   USER_LOADING,
   USER_LOADED,
   AUTH_ERROR,
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   LOGOUT_SUCCESS,
   REGISTER_SUCCESS,
   REGISTER_FAIL,
} from "../actions/types";

//look at routes/api/auth to look for user by included in token
export const loadUser = () => (dispatch, getState) => {
   dispatch({ type: USER_LOADING });

   axios
      .get("api/auth/user", tokenConfig(getState))
      .then((res) =>
         dispatch({
            type: USER_LOADED,
            payload: res.data,
         })
      )
      .catch((err) => {
         dispatch(returnErrors(err.response.data, err.response.status));
         dispatch({
            type: AUTH_ERROR,
         });
      });
};

export const register =
   ({ name, email, password }) =>
   (dispatch) => {
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };
      const body = JSON.stringify({ name, email, password });
      axios
         .post("api/users", body, config)
         .then((res) => {
            dispatch({
               type: REGISTER_SUCCESS,
               payload: res.data,
            });
            console.log(res);
            window.localStorage.setItem("USER", res.data.user.id);
         })
         .catch((err) => {
            dispatch(
               returnErrors(
                  err.response.data,
                  err.response.status,
                  "REGISTER_FAIL"
               )
            );
            dispatch({
               type: REGISTER_FAIL,
            });
         });
   };

export const login =
   ({ email, password }) =>
   (dispatch) => {
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };
      const body = JSON.stringify({ email, password });
      axios
         .post("api/auth", body, config)
         .then((res) =>
            dispatch({
               type: LOGIN_SUCCESS,
               payload: res.data,
            })
         )
         .catch((err) => {
            dispatch(
               returnErrors(
                  err.response.data,
                  err.response.status,
                  "LOGIN_FAIL"
               )
            );
            dispatch({
               type: LOGIN_FAIL,
            });
         });
   };
//https://stackoverflow.com/questions/48983708/where-to-store-access-token-in-react-js
export const logout = () => {
   return {
      type: LOGOUT_SUCCESS,
   };
};

export const tokenConfig = (getState) => {
   const token = getState().auth.token;
   const config = {
      headers: {
         "Content-type": "application/json",
      },
   };
   if (token) {
      config.headers["x-auth-token"] = token;
   }
   return config;
};
