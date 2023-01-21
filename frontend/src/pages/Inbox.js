import { useMessageContext } from "../hooks/useMessageContext";
import { Link } from "react-router-dom";
import { useReadMessageContext } from "../hooks/useReadMessageContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Inbox = () => {
  const { dispatch } = useReadMessageContext();
  const { messages, dispatch:dispatchMessage } = useMessageContext();
  const {user} = useAuthContext()

  const handleClick = async(message) => {
    localStorage.setItem("message", JSON.stringify(message));
    message.isRead = true;

    dispatch({ type: "READ_MESSAGE", payload: message });

    // send request to backend API
    const response = await fetch('http://localhost:5000/message/' + message._id, {
      method: 'PATCH',
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if(response.ok){
      dispatchMessage({type: 'UPDATE_MESSAGE', payload: json})
    }
  };

  console.log("messages:",messages);

  return (
    <div className="inbox">
      {messages &&
        messages.map((message) => (
          <div key={message._id} onClick={(e) => handleClick(message)}>
            <Link to="/message"> {message.subject}</Link>
          </div>
        ))}
    </div>
  );
};

export default Inbox;
