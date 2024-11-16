"use client";

import React, { createContext, useContext, useState } from "react";

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [state, setState] = useState(null);

  const setNavigationState = (data) => setState(data);
  const getNavigationState = () => state;

  return (
    <NavigationContext.Provider
      value={{ setNavigationState, getNavigationState }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationState = () => useContext(NavigationContext);
