import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/blogForm";
import Message from "./components/Message";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Toggable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const newBlogFormRef = useRef();

  const showMessage = (message) => {
    setMessage(message);
    setTimeout(() => setMessage(""), 6000);
  };
  const showError = (error) => {
    setError(error);
    setTimeout(() => setError(""), 6000);
  };
  const handleLogout = (event) => {
    event.preventDefault();
    setUser(null);
    window.localStorage.removeItem("loggedBloglistUser");
    blogService.removeToken();
    showMessage("Successfully logged out");
  };
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));

      setUsername("");
      setPassword("");
    } catch (exception) {
      showError("Wrong credentials");
    }
  };

  const addBlog = async (newTitle, newAuthor, newUrl) => {
    try {
      console.log("saving ", newTitle);
      const blog = await blogService.create({
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      });
      setBlogs(blogs.concat(blog));
      showMessage(`Added ${newTitle}`);
      newBlogFormRef.current.toggleVisibility();

      return blog;
    } catch (ex) {
      console.log("!!Error ", ex);

      showError(ex.response.data.error);
      return null;
    }
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  //get token, if previously logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  //App
  const msg = error !== "" ? error : message;
  if (user === null) {
    return (
      <div>
        <h2>Log in to Blogs</h2>
        <Message message={msg} isError={error !== ""} />
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Message message={msg} isError={error !== ""} />
      <div>
        {user.name} is logged in
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Togglable buttonLabel="Create New Blog" ref={newBlogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
