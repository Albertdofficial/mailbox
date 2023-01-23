import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

import "./Message.css";

const Message = () => {
  const [message, setMessage] = useState({});
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const { id } = useParams();

  useEffect(() => {
    const controller = new AbortController();

    const getMessage = async () => {
      try {
        const data = await fetch(
          "http://localhost:5000/api/message/" + id,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          },
          {
            signal: controller.signal,
          }
        );

        const json = await data.json();

        if (json?._id) {
          setMessage(json);
        } else {
          throw new Error("Requested messaged was not fetched");
        }
        setIsPending(false);
      } catch (error) {
        if (error.name === "AbortError") {
          // we don't want to update any kind of state here
          console.log("The fetch was aborted");
        } else {
          setError(error.message);
          setIsPending(false);
        }
      }
    };
    getMessage();

    return () => {
      controller.abort();
    };
  }, [id, user.token]);

  return (
    <div className="container">
      <div className="message">
        <h1>{message.subject}</h1>
        <p> {message.content}</p>
      </div>
      {isPending && <p className="loading"> Loading...</p>}
      {error && <p className="error">An Error has occured</p>}
    </div>
  );
};

export default Message;
