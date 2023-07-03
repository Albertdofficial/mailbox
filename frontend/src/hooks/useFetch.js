import { useEffect } from "react";
import { useMessageContext } from "../hooks/useMessageContext";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

export function useFetch() {
  const { dispatch } = useMessageContext(); // global state
  const { user } = useAuthContext();

  useEffect(() => {
    // fetchs all messages
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/messages", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token} `,
          },
        });
        const data = await response.data;

        const update = { data, error: null };

        // console.log(data);

        dispatch({ type: "SET_MESSAGES", payload: update });
      } catch (err) {
       
        let error;
        console.log("useFetch: ", err);

        error = err.response.data.error ?? err.message;
        // dispatch
        const update = { data: null, error };

        dispatch({ type: "  SET_MESSAGES", payload: update });
      }
    };

    // fetch messages if a user
    if (user) {
      fetchMessages();
    }
  }, [dispatch, user]);
}
