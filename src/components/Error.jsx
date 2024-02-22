const Error = ({ error }) => {
  if (error === null || error === "") {
    return null;
  }

  return <div className="error">{error}</div>;
};

export default Error;
