import React from 'react'
import { Link } from "react-router-dom";

import './UnreadMessageList.css'

function UnreadMessageList({unreadMessages, handleClick}) {
  return (
    <div>
      {unreadMessages &&
        unreadMessages.map((message) => (
          <div className="message-list" key={message._id}>
            <Link
              onClick={() => handleClick(message)}
              className="unread-message"
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

export default UnreadMessageList