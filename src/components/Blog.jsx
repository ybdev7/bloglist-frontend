import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, like, deleteBlog, user }) => {
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
  //console.log("user=", user.username.toString(), blog.user.username.toString());
  const authorizedToDelete =
    user.username.toString() == blog.user.username.toString();

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
      {showDetails && authorizedToDelete && (
        <button
          onClick={() => {
            deleteBlog(blog);
          }}
        >
          Remove
        </button>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
export default Blog;
