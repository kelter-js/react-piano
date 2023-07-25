import { useEffect } from "react";

import { useInstrument } from "../../state/Instrument";
import useSoundfont from "../../adapters";
import useAudioContext from "../../hooks/useAudioContext";
import Keyboard from "./Keyboard";

const KeyboardWithInstrument = () => {
  const AudioContext = useAudioContext()!;
  const { instrument } = useInstrument();

  const { loading, current, play, stop, load } = useSoundfont({
    AudioContext,
  });

  useEffect(() => {
    if (!loading && instrument !== current) {
      load(instrument);
    }
  }, [load, loading, current, instrument]);

  return <Keyboard loading={loading} play={play} stop={stop} />;
};

export default KeyboardWithInstrument;
