import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import * as SecureStore from "expo-secure-store";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const registerUser = async (value) => {
    try {
      await SecureStore.setItemAsync("userData", value);
      setUserData(value);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async () => {
    // try {
    //   const response = await SecureStore.getItemAsync(key);
    //   setUserData(response);
    //   setIsLoggedIn(true);
    //   return response;
    // } catch (error) {
    //   console.log(error);
    //   setIsLoggedIn(false);
    // }
  };

  const logoutUser = async () => {
    try {
      await SecureStore.deleteItemAsync("userData");
      setUserData(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
    }
  };

  const refreshUser = async () => {
    try {
      const response = await SecureStore.getItemAsync("userData");
      setUserData(response);
      setIsLoggedIn(true);
      return response;
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    refreshUser("userData");
  });

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        userData,
        registerUser,
        loginUser,
        logoutUser,
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
