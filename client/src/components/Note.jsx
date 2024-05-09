import React from "react";

export default function Note(props) {
  const [isEdit, setEdit] = React.useState(false);
  const [title, setTitle] = React.useState(props.title);
  const [content, setContent] = React.useState(props.content);

  function deleteNote() {
    props.onDelete(props.id);
  }

  function editNote() {
    props.onEdit(props.id, title, content);
    setEdit(false);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "title") {
      setTitle(value);
    } else if (name === "content") {
      setContent(value);
    }
  }

  return (
    <div>
      {isEdit ? (
          <div className="note">
            <div className="edit-note">
              <input
                name="title"
                onChange={handleChange}
                value={title}
                required
              />
              <textarea
                name="content"
                onChange={handleChange}
                value={content}
                rows="3"
                required
              /> 
              <button onClick={editNote}>Submit</button>
            </div>
          </div>
        ) : (
          <div className="note">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button onClick={deleteNote}>Delete</button>
            <button onClick={() => setEdit(true)}>Edit</button>
          </div>
        )
      }
    </div>
  );
};
