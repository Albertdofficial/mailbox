import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMessageContext } from "../hooks/useMessageContext";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

import "./inbox.css";

// custom hook for fetching data
import { useFetch } from "../hooks/useFetch";

const Inbox = () => {
  // fetch request to get all messages
  useFetch();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { user } = useAuthContext();

  // use the messages from the context
  const { messages, dispatch } = useMessageContext(); // global state

  let sortedMessages;

  // displaying unread messages at the top
  sortedMessages = messages
    .slice()
    .sort((msg1, msg2) => Number(msg1.isRead) - Number(msg2.isRead));

  const handleClick = async (id) => {
    try {
      setIsPending(true);
      const isRead = true;
      const response = await axios.patch(
        "http://localhost:5000/api/messages/" + id,
        { isRead },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token} `,
          },
        }
      );
      const message = response.data;

      console.log("Inbox: ", message);

      // dispatch an update request
      dispatch({ type: "UPDATE_MESSAGE", payload: message });
      // console.log('in useFetch', message);
      setIsPending(false);
    } catch (err) {
      // setIsPending(false)

      let error_msg = err.response.data.error ?? err.message;

      setError(error_msg);
    }
  };

  return (
    <div className="inbox">
      {sortedMessages &&
        sortedMessages.map((message) => (
          <div key={message._id} className="messages">
            <Link
              to={`/message/${message._id}`}
              className={message.isRead ? "read-message" : "unread-message"}
              onClick={() => handleClick(message._id)}
            >
              {message.content.split(" ").slice(0, 3).join(" ")}...
            </Link>
          </div>
        ))}
      {error && <p className="error">{error} </p>}
      {isPending && <p className="isPending">Loading...</p>}
    </div>
  );
};

export default Inbox;
