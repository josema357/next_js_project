// eslint-disable-next-line semi
"use client";

import axios from "axios";
import { createContext, useContext, useState } from "react";
import endPoints from "@/services/api";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  //Usuario logeado
  const [user] = useState(null);
  //Mostrar modal de error
  const [openModal, setOpenModal]=useState(false);
  //Iniciar sesion
  const signIn = async (email, password) => {
    const options = {
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
    };
    const { data: access_token } = await axios.post(
      endPoints.auth.login,
      { email, password },
      options
    );
    if (access_token) {
      Cookies.set("token", access_token.access_token, { expires: 5 });
      console.log(access_token);
    }
  };

  return {
    user,
    signIn,
    openModal,
    setOpenModal
  };
}
