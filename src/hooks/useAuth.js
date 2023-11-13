// eslint-disable-next-line semi
"use client";

import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
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
  const [openModal, setOpenModal] = useState(false);
  //Offset del endpoint de products
  const [offSet, setOffSet] = useState(0);
  /**
   * Esta funcion obtiene el token del cookie y trae el usuario de la API
   */
  const getUser = useCallback(async () => {
    try {
      const token = Cookies.get("token");
      if (token) {
        axios.defaults.headers.Authorization = `Bearer ${token}`;
        const { data: user } = await axios.get(endPoints.auth.profile);
        setUser(user);
      }
    } catch (error) {
      setUser(null);
    }
  }, []);
  /**
   * Esta funcion inicia sesion, obteniendo el token de la API
   * @param {String} email el email del usuario ingresado en el formulario
   * @param {String} password la contraseña del usuario ingresado en el formulario
   */
  const signIn = async (email, password) => {
    try {
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
        Cookies.set("token", token, { expires: 5 });
      }
      await getUser();
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(()=>{
    getUser();
  },[getUser]);

  /**
   * Esta funcion cierra sesion del usuario borrando el token
   */
  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    delete axios.defaults.headers.Authorization;
    window.location.href = "/login";
  };

  return {
    user,
    signIn,
    openModal,
    setOpenModal,
    offSet,
    setOffSet,
    logout,
  };
}
