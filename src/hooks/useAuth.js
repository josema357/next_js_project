// eslint-disable-next-line semi
"use client";

import axios from "axios";
import { createContext, useContext, useState } from "react";
import endPoints from "@/services/api/endPoints";
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
  const [user, setUser] = useState(null);
  //Mostrar modal de error al iniciar sesion
  const [openModal, setOpenModal]=useState(false);
  //Offset del endpoint de products
  const [offSet, setOffSet] = useState(0);
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
      const token = access_token.access_token;
      Cookies.set("token", access_token.access_token, { expires: 5 });

      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const {data:user} = await axios.get(endPoints.auth.profile);
      setUser(user);
    }
  };

  return {
    user,
    signIn,
    openModal,
    setOpenModal,
    offSet,
    setOffSet,
  };
}
