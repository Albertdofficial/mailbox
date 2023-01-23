import { Link } from "react-router-dom";
import { useMessageContext } from "../hooks/useMessageContext";
import { useAuthContext } from "../hooks/useAuthContext";

import "./Home.css";

// custom hook for fetching data
import {useFetch} from "../hooks/useFetch";

const Home = () => {
  const{error, isPending} = useFetch()
  const { messages } = useMessageContext(); // global state
  const { user } = useAuthContext();
  const unreadMessages = [];

  
  messages &&
    messages.map((message) => {
      if (!message.isRead) {
        unreadMessages.push(message);
      }
    });

  return (
    <div className="home">
      <h3>Hello {user?.name} </h3>
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
