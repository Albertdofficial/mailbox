import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMessageContext } from "../hooks/useMessageContext";
import { useAuthContext } from "../hooks/useAuthContext";

import "./Home.css";

const Home = () => {
  const { messages, dispatch } = useMessageContext(); // global state
  const { user } = useAuthContext();
  const unreadMessages = [];

  useEffect(() => {
    // fetchs all messages
    const fetchMessages = async () => {
      const response = await fetch("http://localhost:5000/api/message", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token} `,
        },
      });
      const data = await response.json();
      

      if (response.ok) {
        dispatch({ type: "GET_MESSAGES", payload: data });
      }
    };
    // fetch messages if a user
    if (user) {
      fetchMessages();
    }
  }, [dispatch, user]);

  messages && console.log('homapage',messages);

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
    </div>
  );
};

export default Home;
