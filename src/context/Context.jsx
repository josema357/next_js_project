"use client";

import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  //Mostrar el formulario par agregar productos
  const [openForm, setOpenForm] = useState(false);
  //Actualizar la lista de todos los productos
  const [reloadAllProducts, setReloadAllProducts] = useState(false);
  //Mostrar u ocultar Nav
  const [showNav, setShowNav] = useState(false);
  return (
    <GlobalContext.Provider
      value={{
        openForm,
        setOpenForm,
        reloadAllProducts,
        setReloadAllProducts,
        showNav,
        setShowNav,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
