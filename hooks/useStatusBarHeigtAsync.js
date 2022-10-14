import React, { useState, useEffect } from "react";
import StatusBarHeight from "@expo/status-bar-height";

export default function useStatusBarHeigtAsync() {
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  const getStatusBarHeight = async () => {
    const height = await StatusBarHeight.getAsync();
    setStatusBarHeight(height);
  };

  useEffect(() => {
    getStatusBarHeight();
  }, [statusBarHeight]);

  return { statusBarHeight };
}
