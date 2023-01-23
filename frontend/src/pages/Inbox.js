import { useMessageContext } from "../hooks/useMessageContext";
import { useAuthContext } from "../hooks/useAuthContext";
import ReadMessageList from "../components/ReadMessageList";
import UnreadMessageList from "../components/UnreadMessageList";

import "./inbox.css";

// custom hook for fetching data
import {useFetch} from "../hooks/useFetch";

const Inbox = () => {
  const{error, isPending} = useFetch()
  const { messages} = useMessageContext(); // global state
  const { user } = useAuthContext();
  const readMessages = [];
  const unreadMessages = [];

  const handleClick = async (message) => {
    await fetch(
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
      {isPending && <p className="loading"> Loading..</p>}
      {error && <p className="error">An Error has occured</p>}
    </div>
  );
};

export default Inbox;
