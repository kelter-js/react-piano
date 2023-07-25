import { useState, ReactNode } from "react";
import { DEFAULT_INSTRUMENT } from "../../components/domain/sound";
import { InstrumentContext } from "./Context";

interface IInstrumentContextProviderProps {
  children: ReactNode;
}

const InstrumentContextProvider = ({
  children,
}: IInstrumentContextProviderProps): JSX.Element => {
  const [instrument, setInstrument] = useState(DEFAULT_INSTRUMENT);

  return (
    <InstrumentContext.Provider value={{ instrument, setInstrument }}>
      {children}
    </InstrumentContext.Provider>
  );
};

export default InstrumentContextProvider;
