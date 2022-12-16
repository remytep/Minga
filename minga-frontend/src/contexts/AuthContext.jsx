// src/contexts/auth.context.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { ENTRYPOINT } from "../config";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const AuthContext = createContext(initialState);

const AuthProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();
  useEffect(() => {
    let jwtoken = localStorage.getItem("jwtoken");
    if (jwtoken) {
      const user = jwtDecode(jwtoken);
      setState({
        user,
        isAuthenticated: true,
      });
    }
  }, []);

  const registration = (email, password) => {
    return axios
      .post(`${ENTRYPOINT}/users`, {
        email,
        plainPassword: password,
      })
      .then((response) => {
        if (response.status === 201) {
          login(email, password);
        }
      })
      .catch((error) => console.log(error));
  };

  const login = (email, password) => {
    return axios
      .post(`${ENTRYPOINT}/login`, {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("jwtoken", response.data.token);
          localStorage.setItem("refresh_token", response.data.refresh_token);
          const user = jwtDecode(response.data.token);
          setState({
            user,
            isAuthenticated: true,
          });
        }
        navigate("/");
        return response.data;
      })
      .catch((error) => console.log(error));
  };

  const logout = () => {
    localStorage.removeItem("jwtoken");
    localStorage.removeItem("refresh_token");
    navigate("/");
    setState(initialState);
  };

  const refreshToken = () => {
    let refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
      return axios
        .post(`${ENTRYPOINT}/refresh/token`, {
          refresh_token: refreshToken,
        })
        .then((response) => {
          if (response.data.token) {
            const newUser = jwtDecode(response.data.token);
            localStorage.setItem("jwtoken", response.data.token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
            setState({
              user: newUser,
              isAuthenticated: true,
            });
          }
          return response.data;
        });
    } else {
      Promise.reject();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        login,
        logout,
        registration,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
