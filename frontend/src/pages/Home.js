import { Link } from "react-router-dom";
import { useMessageContext } from "../hooks/useMessageContext";
import { useAuthContext } from "../hooks/useAuthContext";

import "./Home.css";

// custom hook for fetching data
import {useFetch} from "../hooks/useFetch";

const Home = () => {
  const { user } = useAuthContext();
// get all messages
  useFetch()

  const { messages, error } = useMessageContext(); // global state

  console.log('Home page: ', error);
  
    const unreadMessages = messages?.filter(message => !message.isRead)

  if(error){
    return <p className="error" >{error} </p>
  }

  return (
    <div className="home">
      <h3>Hello {user?.name} </h3>
      {messages?.length > 0 ? (
        <>
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
        </>
      ):<p>Checking inbox...</p> }
    </div>
  );
};

export default Home;
