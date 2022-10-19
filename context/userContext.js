import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { SECURE_STORAGE_KEY } from "./constants";
import { compareUserData } from "../helpers";
import { AUTH_ERRORS } from "../screens/constants";

export const UserContext = createContext(null);
export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkSecurityStore = async () =>
    await SecureStore.getItemAsync(SECURE_STORAGE_KEY);

  const registerUser = async (value) => {
    try {
      await SecureStore.setItemAsync(SECURE_STORAGE_KEY, JSON.stringify(value));
      setUserData(value);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async (data) => {
    const response = await checkSecurityStore();
    if (!response) {
      throw new Error(AUTH_ERRORS.noUser);
    }
    const user = JSON.parse(response);
    const isUserSubmitted = compareUserData(data, user);

    if (isUserSubmitted) {
      setIsLoggedIn(true);
      setUserData(user);
      return;
    }
    throw new Error(AUTH_ERRORS.userError);
  };

  const logoutUser = async () => {
    try {
      await SecureStore.deleteItemAsync(SECURE_STORAGE_KEY);
      setUserData(null);
      setIsLoggedIn(false);
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  const refreshUser = async () => {
    const response = await checkSecurityStore();
    if (!response) {
      setIsLoggedIn(false);
      return;
    }
    setUserData(JSON.parse(response));
    setIsLoggedIn(true);
  };

  useEffect(() => {
    // refreshUser();
  }, [isLoggedIn]);

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
