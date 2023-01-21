import { createContext, useEffect, useReducer } from "react";

export const ReadMessageContext = createContext();

export const readReducer = (state, action) => {
  switch (action.type) {
    case "READ_MESSAGE":
      return { message: action.payload };
    default:
      return state;
  }
};

export const ReadMessageContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(readReducer, { message: null });

  useEffect(() => {
    // fetch message from local storage
    const message = JSON.parse(localStorage.getItem("message"));

    if (message) {
      dispatch({ type: "READ_MESSAGE", payload: message });
    }
  }, []);

  console.log("ReadMessageContext state:", state);

  return (
    <ReadMessageContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ReadMessageContext.Provider>
  );
};
