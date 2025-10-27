import React, { useState } from 'react';
import './AdminNotes.css';

const AdminNotes = () => {
  const [notes, setNotes] = useState('');

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all notes?')) {
      setNotes('');
    }
  };

  return (
    <div className="admin-notes-container">
      <h2>Admin Notes</h2>
      <textarea
        className="notes-textarea"
        placeholder="Write your workout plan, diet, split, or reminders here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button className="clear-button" onClick={handleClear}>
        Clear Page
      </button>
    </div>
  );
};

export default AdminNotes;