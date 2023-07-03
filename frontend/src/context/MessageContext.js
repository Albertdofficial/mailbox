import { createContext, useReducer, useEffect } from "react";

export const MessageContext = createContext();

export const messageReducer = (state, action) => {
  // destructor the payload
  const { data, error } = action.payload ?? {};

  switch (action.type) {
    case "SET_MESSAGES":
      return { messages: data, error };
    case "SEND_MESSAGE":
      return {
        messages: [action.payload, ...state.messages],
      };
    case "UPDATE_MESSAGE":
      const updatedMessages = state.messages.map(message => {
        if(message._id === action.payload._id)
          return {...message, isRead:true}
        else
          return message
      })
      return {messages:updatedMessages}
    default:
      return state;
  }
};

export const MessageContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, {
    messages: null,
    error: null,
  });

  // console.log('Message Context State', state.messages);

  return (
    <MessageContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MessageContext.Provider>
  );
};
