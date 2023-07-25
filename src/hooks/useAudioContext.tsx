import { useRef } from "react";
import { Optional } from "../components/domain/types";
import { accessContext } from "../components/domain/audio";

const useAudioContext = (): Optional<AudioContextType> => {
  const AudioCtx = useRef(accessContext());
  
  return AudioCtx.current;
};

export default useAudioContext;
