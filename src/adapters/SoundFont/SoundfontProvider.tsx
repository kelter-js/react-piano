import { ReactElement, useState, useEffect, useRef, useCallback } from "react";
import Soundfont, { InstrumentName, Player } from "soundfont-player";

import { MidiValue } from "../../components/domain/note";
import { Optional } from "../../components/domain/types";
import {
  AudioNodesRegistry,
  DEFAULT_INSTRUMENT,
} from "../../components/domain/sound";
import Keyboard from "../../components/Keyboard";

type ProvidedProps = {
  loading: boolean;
  play(note: MidiValue): Promise<void>;
  stop(note: MidiValue): Promise<void>;
};

type ProviderProps = {
  instrument?: InstrumentName;
  AudioContext: AudioContextType;
  render(props: ProvidedProps): ReactElement;
};

const renderKeyboard = ({
  play,
  stop,
  loading,
}: ProvidedProps): JSX.Element => {
  return <Keyboard play={play} stop={stop} loading={loading} />;
};

const SoundfontProvider = ({
  AudioContext,
  instrument,
  render,
}: ProviderProps) => {
  let activeNodes: AudioNodesRegistry = {};

  const [current, setCurrent] = useState<Optional<InstrumentName>>(null);
  const [loading, setLoading] = useState(false);
  const [player, setPlayer] = useState<Optional<Player>>(null);
  const audio = useRef(new AudioContext());

  const loadInstrument = useCallback(() => load(instrument), [instrument]);

  useEffect(() => {
    if (!loading && instrument !== current) {
      loadInstrument();
    }
  }, [loadInstrument, loading, instrument, current]);

  const load = async (instrument: InstrumentName = DEFAULT_INSTRUMENT) => {
    setLoading(true);
    const player = await Soundfont.instrument(audio.current, instrument);

    setLoading(false);
    setCurrent(instrument);
    setPlayer(player);
  };

  const resume = async () => {
    return audio.current.state === "suspended"
      ? await audio.current.resume()
      : Promise.resolve();
  };

  const play = async (note: MidiValue) => {
    await resume();
    if (!player) {
      return;
    }

    const node = player.play(note.toString());
    activeNodes = { ...activeNodes, [note]: node };
  };

  const stop = async (note: MidiValue) => {
    await resume();
    if (!activeNodes[note]) {
      return;
    }

    activeNodes[note]!.stop();
    activeNodes = { ...activeNodes, [note]: null };
  };

  return render({
    loading,
    play,
    stop,
  });
};

export default SoundfontProvider;
