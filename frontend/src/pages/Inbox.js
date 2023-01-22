import { useMessageContext } from "../hooks/useMessageContext";
import { useAuthContext } from "../hooks/useAuthContext";
import ReadMessageList from "../components/ReadMessageList";
import UnreadMessageList from "../components/UnreadMessageList";
import { useEffect, useState } from "react";

import "./inbox.css";

const Inbox = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { messages, dispatch } = useMessageContext(); // global state
  const { user } = useAuthContext();
  const readMessages = [];
  const unreadMessages = [];

  useEffect(() => {
    const controller = new AbortController();
    // fetchs all messages
    const fetchMessages = async () => {
      try{
        setIsPending(true)
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
          setIsPending(false)
          dispatch({ type: "GET_MESSAGES", payload: data });
        }
      }catch(error){
        if(error.name === 'AbortError'){
          console.log('The fetch was aborted');
        }else{
          setError(error.name)
          setIsPending(false)
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

  const handleClick = async (message) => {
    const response = await fetch(
      "http://localhost:5000/api/message/" + message._id,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token} `,
        },
      }
    );
  };

  messages &&
    messages.map((message) => {
      if (!message.isRead) {
        unreadMessages.push(message);
      } else {
        readMessages.push(message);
      }

    });

  return (
    <div className="inbox">
      <UnreadMessageList unreadMessages={unreadMessages} handleClick={handleClick} />

      <ReadMessageList readMessages={readMessages} handleClick={handleClick} />
    </div>
  );
};

export default Inbox;
