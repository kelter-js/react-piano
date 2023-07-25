import { ChangeEvent } from "react";
import { InstrumentName } from "soundfont-player";
import { useInstrument } from "../../state/Instrument";
import { options } from "./options";
import styles from "./InstrumentSelector.module.css";

const InstrumentSelector = () => {
  const { instrument, setInstrument } = useInstrument();

  const updateValue = ({ target }: ChangeEvent<HTMLSelectElement>) =>
    setInstrument(target.value as InstrumentName);

  const renderInstruments = () => {
    return options.map(({ label, value }) => (
      <option key={value} value={value}>
        {label}
      </option>
    ));
  };

  return (
    <select
      className={styles.instruments}
      onChange={updateValue}
      value={instrument}
    >
      {renderInstruments()}
    </select>
  );
};

export default InstrumentSelector;
