import { createContext, useState } from "react";

const initialState = {
  user: null,
  isAuthenticated: false,
  toggleAuth: () => null,
};

export const AuthContext = createContext(initialState);

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState({
    user: null,
    isAuthenticated: false,
  });

  const toggleAuth = (user) =>
    setIsLoggedIn({
      user: user,
      isAuthenticated: !isLoggedIn.isAuthenticated,
    });

  return (
    <AuthContext.Provider value={{ ...isLoggedIn, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
