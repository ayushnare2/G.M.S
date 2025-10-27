import React, { useEffect, useState } from 'react';
import './Trainers.css';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch trainers from backend
  useEffect(() => {
    fetch('https://gym-backendnew.onrender.com/api/trainers')
      .then(res => res.json())
      .then(data => {
        setTrainers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Error fetching trainers:', err.message);
        setLoading(false);
      });
  }, []);

  // Delete trainer by ID
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this trainer?')) {
      try {
        const res = await fetch(`https://gym-backendnew.onrender.com/api/trainers/${id}`, {
          method: 'DELETE',
        });
        const result = await res.json();

        if (result.message) {
          alert('🗑️ Trainer deleted!');
          setTrainers(prev => prev.filter(trainer => trainer._id !== id));
        } else {
          alert('Failed to delete trainer.');
        }
      } catch (err) {
        console.error('❌ Delete error:', err.message);
        alert('Error connecting to backend.');
      }
    }
  };

  return (
    <div className="trainers-page">
      <h2 className="trainers-title">Trainers List</h2>

      {loading ? (
        <p className="text-center">Loading trainers...</p>
      ) : (
        <table className="trainers-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Age</th>
              <th>Timing</th>
              <th>Employment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainers.length === 0 ? (
              <tr><td colSpan="6" className="text-center">No trainers found</td></tr>
            ) : (
              trainers.map((trainer, index) => (
                <tr key={trainer._id || index}>
                  <td>{index + 1}</td>
                  <td>{trainer.first_name} {trainer.last_name}</td>
                  <td>{trainer.age}</td>
                  <td>{trainer.timing}</td>
                  <td>{trainer.employment_status}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(trainer._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Trainers;