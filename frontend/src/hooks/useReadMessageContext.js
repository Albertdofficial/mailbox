import { ReadMessageContext } from "../context/ReadMessageContext";
import { useContext } from "react";

export const useReadMessageContext = () => {
  const context = useContext(ReadMessageContext);
  

  if (context === undefined) {
    throw Error(
      "useReadMessageContext must be used inside a ReadMessageContextProvider"
    );
  }
  return context;
};
