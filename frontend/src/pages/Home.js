import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMessageContext } from "../hooks/useMessageContext";
import { useAuthContext } from "../hooks/useAuthContext";

import "./Home.css";

const Home = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { messages, dispatch } = useMessageContext(); // global state
  const { user } = useAuthContext();
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

  messages &&
    messages.map((message) => {
      if (!message.isRead) {
        unreadMessages.push(message);
      }
    });

  return (
    <div className="home">
      <h3>Hello Albert</h3>
      <h3>
        You have {messages && unreadMessages.length} unread out of{" "}
        {messages && messages.length} messages total{" "}
      </h3>
      <div className="btn-container">
        <button className="btn">
          {" "}
          <Link to="/inbox"> View Messages</Link>{" "}
        </button>
      </div>
      {isPending && <p className="loading"> Loading..</p>}
      {error && <p className="error">An Error has occured</p>}
    </div>
  );
};

export default Home;
