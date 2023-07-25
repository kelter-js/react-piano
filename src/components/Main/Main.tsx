import Playground from "../Playground";
import NoAudioMessage from "../NoAudioMessage";
import useAudioContext from "../../hooks/useAudioContext";

const Main = () => {
  const AudioContext = useAudioContext();
  return !!AudioContext ? <Playground /> : <NoAudioMessage />;
};

export default Main;
