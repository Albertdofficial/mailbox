import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

import "./Message.css";

const Message = () => {
  const [message, setMessage] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const { id } = useParams();

  useEffect(() => {

    const getMessage = async () => {
      try {
        setError(null);
        setIsPending(true);

        const response = await axios.get(
          "http://localhost:5000/api/messages/" + id,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );

        const data = response.data;

        console.log('backend messages', data);

        setMessage(data);

        setIsPending(false);
      } catch (err) {

        setIsPending(false);
        console.log('messages: ', err);

        let error_msg = err.response.data.error ?? err.message;

        setError(error_msg)
      }
    };

    if (user) {
      getMessage();
    }

  }, [id, user, user?.token]);

  return (
    <div className="container">
      <div className="message">
        <h1>{message.subject}</h1>
        <p> {message.content}</p>
      </div>
      {isPending && <p className="loading"> Loading...</p>}
      {error && <p className="error">{error} </p>}
    </div>
  );
};

export default Message;
