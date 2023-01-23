import React from 'react'
import { Link } from "react-router-dom";

import './readMessageList.css'


function ReadMessageList({readMessages, handleClick}) {
  return (
    <div className="read-messages">
      {readMessages &&
        readMessages.map((message) => (
          <div className="message-list" key={message._id}>
            <Link
              onClick={() => handleClick(message)}
              className="read-message"
              to={`/message/${message._id}`}
            >
              {" "}
              {message.content.split(" ").slice(0, 3).join(" ")}...
            </Link>
          </div>
        ))}
    </div>
  )
}

export default ReadMessageList