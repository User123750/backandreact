import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    refreshNotes();
  }, []);

  const refreshNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5040/api/projetOne/getNotes');
      setNotes(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const addNote = async () => {
    try {
      await axios.post('http://localhost:5040/api/projetOne/AddNotes', {
        newNotes: newNote
      });
      refreshNotes();
      setNewNote("");
    } catch (error) {
      console.log(error);
    }
  }

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5040/api/projetOne/deleteNotes?id=${id}`);
      refreshNotes();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <h1>Todo App</h1>
      <input 
        id="newNotes" 
        value={newNote} 
        onChange={(e) => setNewNote(e.target.value)} 
      />&nbsp;
      <button onClick={addNote}>Add Note</button>
      
      {notes.map(note =>
        <div key={note._id}>
          <p><b>* {note.description}</b></p>
          <button onClick={() => deleteNote(note._id)}>Delete Note</button>
        </div>
      )}
    </div>
  );
}

export default App;
