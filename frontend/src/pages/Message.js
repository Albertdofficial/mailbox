import { useReadMessageContext } from "../hooks/useReadMessageContext";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Message = () => {
  const [message, setMessage] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const { id } = useParams();

  console.log("id:", id);

  useEffect(() => {
    const abort = new AbortController();
    const signal = abort.signal;

    const getMessage = async () => {
      try {
        const data = await fetch(
          "http://localhost:5000/api/message/" + id,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2IzMDE1NzE4ODZjN2RmZGJmNTU3YjUiLCJpYXQiOjE2NzQyOTk4MzIsImV4cCI6MTY3NDU1OTAzMn0.hwE9GY4e9TTadKqnU7KMy0XKoqOPpSVC2dvNXS1Nl4k`,
            },
          },
          {
            signal,
          }
        );

        const json = await data.json()

        if (json?._id) {
          setMessage(json);
        } else {
          throw new Error("Requested failed");
        }
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
        console.log(error);
      }
    };
    getMessage();

    return () => {
      abort.abort();
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Erro occur</div>;
  }

  return (
    <div>
      <p>{message.subject}</p>
      <p> {message.content}</p>
    </div>
  );
};

export default Message;
