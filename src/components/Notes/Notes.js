import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "./Notes.css";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editingNote, setEditingNote] = useState(null);
  const { auth, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/notes", {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setNotes(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotes();
  }, [auth.token]);

  const handleChange = (e) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditingNote({ ...editingNote, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/notes", newNote, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setNotes([...notes, res.data]);
      setNewNote({ title: "", content: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3000/notes/${editingNote._id}`,
        editingNote,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      setNotes(
        notes.map((note) => (note._id === res.data._id ? res.data : note))
      );
      setEditingNote(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/notes/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h2>Notes</h2>
        <button onClick={logout}>Logout</button>
      </div>
      <form className="notes-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newNote.title}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={newNote.content}
          onChange={handleChange}
        />
        <button type="submit">Add Note</button>
      </form>
      <div className="notes-list">
        <ul>
          {notes.map((note) => (
            <li className="note-item" key={note._id}>
              {editingNote && editingNote._id === note._id ? (
                <form onSubmit={handleEditSubmit} className="edit-form">
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={editingNote.title}
                    onChange={handleEditChange}
                    className="edit-input"
                  />
                  <textarea
                    name="content"
                    placeholder="Content"
                    value={editingNote.content}
                    onChange={handleEditChange}
                    className="edit-textarea"
                  />
                  <button type="submit" className="edit-button">
                    Save
                  </button>
                </form>
              ) : (
                <>
                  <h3>{note.title}</h3>
                  <p>{note.content}</p>
                  <button onClick={() => setEditingNote(note)}>Edit</button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(note._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notes;
