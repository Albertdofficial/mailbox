import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  // setting initial auth status wit predefined user
  useEffect(() => {
    const user = {
      email: "albert@gmail.com",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2IzMDE1NzE4ODZjN2RmZGJmNTU3YjUiLCJpYXQiOjE2NzQyOTk4MzIsImV4cCI6MTY3NDU1OTAzMn0.hwE9GY4e9TTadKqnU7KMy0XKoqOPpSVC2dvNXS1Nl4k",
    };

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  console.log("AuthContext State", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
