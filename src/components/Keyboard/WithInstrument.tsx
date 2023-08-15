import { useInstrument } from "../../state/Instrument";
import SoundfontProvider from "../../adapters/SoundFont";
import useAudioContext from "../../hooks/useAudioContext";
import Keyboard from "./Keyboard";

const KeyboardWithInstrument = () => {
  const AudioContext = useAudioContext()!;
  const { instrument } = useInstrument();

  return (
    <SoundfontProvider
      AudioContext={AudioContext}
      instrument={instrument}
      render={(props) => <Keyboard {...props} />}
    />
  );
};

export default KeyboardWithInstrument;
