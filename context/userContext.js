import React, { createContext, useContext } from "react";
import * as SecureStore from "expo-secure-store";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const registerUser = (key, value) => {
    try {
      await SecureStore.setItemAsync(key, value);
      setUserData(key, value)
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser =(key)=> {
    try {
      const response = await SecureStore.getItemAsync(key);
      setUserData(response);
      setIsLoggedIn(true);
      return response;
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
    }
  }

  const logoutUser = (key) => {
    try {
      await SecureStore.deleteItemAsync(key);
      setUserData(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
    }
  }

  return (
    <UserContext.Provider value={{ isLoggedIn, userData, registerUser, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
