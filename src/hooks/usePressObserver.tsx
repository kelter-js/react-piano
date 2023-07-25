import { useEffect, useState } from "react";
import { Key } from "../components/domain/keyboard";

type IsPressed = boolean;
type EventCode = string;
type CallbackFunction = VoidFunction;

type Settings = {
  watchKey: Key;
  onStartPress: CallbackFunction;
  onFinishPress: CallbackFunction;
};

const fromEventCode = (code: EventCode): Key => {
  const prefixRegex = /Key|Digit/gi;
  return code.replace(prefixRegex, "");
};

const equal = (watchedKey: Key, eventCode: EventCode): boolean => {
  return fromEventCode(eventCode).toUpperCase() === watchedKey.toUpperCase();
};

const usePressObserver = ({
  watchKey,
  onStartPress,
  onFinishPress,
}: Settings): IsPressed => {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const handlePressStart = ({ code }: KeyboardEvent): void => {
      if (pressed || !equal(watchKey, code)) return;
      setPressed(true);
      onStartPress();
    };

    const handlePressFinish = ({ code }: KeyboardEvent): void => {
      if (!pressed || !equal(watchKey, code)) return;
      setPressed(false);
      onFinishPress();
    };

    document.addEventListener("keydown", handlePressStart);
    document.addEventListener("keyup", handlePressFinish);

    return () => {
      document.removeEventListener("keydown", handlePressStart);
      document.removeEventListener("keyup", handlePressFinish);
    };
  }, [watchKey, pressed, setPressed, onStartPress, onFinishPress]);

  return pressed;
};

export default usePressObserver;
