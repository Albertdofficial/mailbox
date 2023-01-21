import { useMessageContext } from "../hooks/useMessageContext";
import { Link } from "react-router-dom";
import { useReadMessageContext } from "../hooks/useReadMessageContext";
import { useAuthContext } from "../hooks/useAuthContext";

import './inbox.css'

const Inbox = () => {
  const { dispatch } = useReadMessageContext();
  const { messages, dispatch:dispatchMessage } = useMessageContext();
  const {user} = useAuthContext()

  return (
    <div className="inbox">
      {messages &&
        messages.map((message) => (
          <div className="message-content" key={message._id}>
            <Link to={`/message/${message._id}` }> {(message.content).split(' ').slice(0, 3).join()}...</Link>
          </div>
        ))}
    </div>
  );
};

export default Inbox;
