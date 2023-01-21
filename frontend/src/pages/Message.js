import { useReadMessageContext } from "../hooks/useReadMessageContext";

const Message = () => {
  const { message } = useReadMessageContext();

  return (
    <div>
      <p> {message.subject}</p>
      <p> {message.content}</p>
    </div>
  );
};

export default Message;
