import React, { useState, useEffect } from "react";
import { Keyboard } from "react-native";

export default function useKeyboardStatus() {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(undefined);
  const keyboardOpen = () => setIsKeyboardOpen(true);
  const keyboardHide = () => {
    setIsKeyboardOpen(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    const open = Keyboard.addListener("keyboardDidShow", keyboardOpen);
    const hide = Keyboard.addListener("keyboardDidHide", keyboardHide);

    return () => {
      open.remove();
      hide.remove();
    };
  }, []);
  return { isKeyboardOpen, keyboardHide };
}
