import { selectKey } from "../domain/keyboard";
import { notes, MidiValue } from "../domain/note";
import Key from "../Key/Key";
import styles from "./Keyboard.module.css";

export type KeyboardProps = {
  loading: boolean;
  play: (note: MidiValue) => Promise<void>;
  stop: (note: MidiValue) => Promise<void>;
};

const Keyboard = ({ loading, stop, play }: KeyboardProps): JSX.Element => (
  <div className={styles.keyboard}>
    {notes.map(({ midi, type, index, octave }) => {
      const label = selectKey(octave, index);
      return (
        <Key
          key={midi}
          type={type}
          label={label}
          disabled={loading}
          onDown={() => play(midi)}
          onUp={() => stop(midi)}
        />
      );
    })}
  </div>
);

export default Keyboard;
