import { useState, useEffect } from "react";
import { useMessageContext } from "../hooks/useMessageContext";
import { useAuthContext } from "../hooks/useAuthContext";

export function useFetch() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useMessageContext(); // global state
  const { user } = useAuthContext();

  useEffect(() => {
    const controller = new AbortController();
    // fetchs all messages
    const fetchMessages = async () => {
      try {
        setIsPending(true);
        const response = await fetch(
          "http://localhost:5000/api/message",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token} `,
            },
          },
          { signal: controller.signal }
        );
        const data = await response.json();

        if (response.ok) {
          setIsPending(false);
          dispatch({ type: "GET_MESSAGES", payload: data });
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("The fetch was aborted");
        } else {
          setError(error.name);
          setIsPending(false);
        }
      }
    };

    // fetch messages if a user
    if (user) {
      fetchMessages();
    }

    // cleanup function
    return () => {
      controller.abort();
    };
  }, [dispatch, user]);

  return {error, isPending}
}

