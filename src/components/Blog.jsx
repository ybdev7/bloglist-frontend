import { useState } from "react";

const Blog = ({ blog, like }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = (e) => {
    setShowDetails(!showDetails);
  };

  const handleLike = (e) => {
    like(blog);
  };

  const btnText = showDetails ? "Hide" : "View";

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}{" "}
      <button onClick={handleToggleDetails}>{btnText}</button>
      {showDetails && (
        <p>
          Likes {blog.likes} <button onClick={handleLike}>Like</button>
        </p>
      )}
      {showDetails && <p>{blog.user.name}</p>}
    </div>
  );
};

export default Blog;
