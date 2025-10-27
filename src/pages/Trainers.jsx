import React, { useEffect, useState } from 'react';
import './Trainers.css';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
     fetch('https://your-backend-url/trainers')
       .then(res => res.json())
       .then(data => setTrainers(data));

    setTrainers([
      {
        id: 1,
        first_name: 'Amit',
        last_name: 'Sharma',
        age: 32,
        timing: '6am–10am',
        employment_status: 'Full-time'
      },
      {
        id: 2,
        first_name: 'Priya',
        last_name: 'Desai',
        age: 28,
        timing: '4pm–8pm',
        employment_status: 'Part-time'
      }
    ]);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this trainer?')) {
 

      setTrainers(trainers.filter(trainer => trainer.id !== id));
    }
  };

  return (
    <div className="trainers-page">
      <h2 className="trainers-title">Trainers List</h2>
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
              <tr key={trainer.id || index}>
                <td>{index + 1}</td>
                <td>{trainer.first_name} {trainer.last_name}</td>
                <td>{trainer.age}</td>
                <td>{trainer.timing}</td>
                <td>{trainer.employment_status}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(trainer.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Trainers;