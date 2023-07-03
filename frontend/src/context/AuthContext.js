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

  // setting initial auth status with predefined user
  useEffect(() => {
    const user = {
      name: 'Albert',
      email: "albert@gmail.com",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2NlMmEzNjUxODU3YzEzYzA0NDRkODAiLCJpYXQiOjE2NzQ0NTU2MDd9.gAEaAR5bHw5rXC8AyTuhfuV9htlyIUZPpMQ2bbZFKzY",
    };

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
