import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Note from "./Note";
import CreateNote from "./CreateNote";
import axios from "axios";

export default function App() {
  const [currNotes, setNotes] = React.useState([]);
  // const [title, setTitle] = React.useState([]);
  // const [content, setContent] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://localhost:8000/notes")
      .then((res) => {
        console.log(res.data);
        setNotes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function addNote(passed_note) {
    const note = {
      title: passed_note.title,
      content: passed_note.content,
    };
    
    axios
      .post("http://localhost:8000/notes", note)
      .then((res) => {
        console.log(res.data);
        setNotes((prevNotes) => {
          return [...prevNotes, res.data];
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // setTitle("");
    // setContent("");
  }

  function deleteNote(id) {
    axios
      .delete("http://localhost:8000/notes/" + id)
      .then((res) => {
        console.log(res.data);
        setNotes((prevNotes) => {
          return prevNotes.filter((note) => {
            return note._id !== id;
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function editNote (id, title, content) {
    const note = {
      title: title,
      content: content,
    };

    axios
      .patch("http://localhost:8000/notes/" + id, note)
      .then((res) => {
        console.log(res.data);
        setNotes((prevNotes) => {
          return prevNotes.map((note) => {
            if (note._id === id) {
              return res.data;
            } else {
              return note;
            }
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <Header />
      <CreateNote onAdd={addNote} />
      {currNotes.map((note, index) => (
        <Note
          key={index}
          id={note._id} // changed to mongo db schema
          title={note.title}
          content={note.content}
          onDelete={deleteNote}
          onEdit={editNote}
        />
      ))}
      <Footer />
    </div>
  );
}
