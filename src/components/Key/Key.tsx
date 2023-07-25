import clsx from "clsx";

import { NoteType } from "../domain/note";
import usePressObserver from "../../hooks/usePressObserver";
import styles from "./Key.module.css";

type PressCallback = () => void;
type KeyProps = {
  type: NoteType;
  label: string;
  disabled?: boolean;

  onUp: PressCallback;
  onDown: PressCallback;
};

const Key = ({ type, label, onDown, onUp, ...rest }: KeyProps) => {
  const pressed = usePressObserver({
    watchKey: label,
    onStartPress: onDown,
    onFinishPress: onUp,
  });

  return (
    <button
      className={clsx(
        styles.key,
        styles[type],
        pressed && styles["is-pressed"]
      )}
      onMouseDown={onDown}
      onMouseUp={onUp}
      type="button"
      {...rest}
    >
      {label}
    </button>
  );
};

export default Key;
