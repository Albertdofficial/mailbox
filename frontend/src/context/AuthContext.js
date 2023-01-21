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

  // setting initial auth status
  useEffect(() => {
    // fetch from local storage
    // const json = localStorage.getItem("user");
    const user = {
      email: "email:albert@gmail.com",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2IzMDE1NzE4ODZjN2RmZGJmNTU3YjUiLCJpYXQiOjE2NzQxNDg4NTYsImV4cCI6MTY3NDQwODA1Nn0.0qiMWjXk2hPezsm7p2GQcVB09HvjN6ibEXjc_T60o2c",
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
