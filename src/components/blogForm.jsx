import { useState } from "react";

const BlogForm = ({ addBlog }) => {
  const [newTitle, setTitle] = useState("");
  const [newAuthor, setAuthor] = useState("");
  const [newUrl, setUrl] = useState("");
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await addBlog(newTitle, newAuthor, newUrl);
    console.log(result);

    //clear fields if successful, otherwise leave as is
    if (result) {
      setAuthor("");
      setTitle("");
      setUrl("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        Title <input value={newTitle} onChange={handleTitleChange} />
      </div>
      <div>
        Author <input value={newAuthor} onChange={handleAuthorChange} />{" "}
      </div>
      <div>
        URL <input value={newUrl} onChange={handleUrlChange} />{" "}
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default BlogForm;
