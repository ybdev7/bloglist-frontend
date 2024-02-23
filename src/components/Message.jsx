const Message = ({ message, isError = false }) => {
  //   if (message === null || message === "") {
  //     return <div className="empty"></div>;
  //   } else if (isError) {
  //     return <Error error={message} />;
  //   }
  //   return <Notification message={message} />;
  if (!message || message === "") {
    return <div className="empty"></div>;
  }
  if (isError) {
    return <div className="error">{message}</div>;
  }
  return <div className="notification">{message}</div>;
};

export default Message;
