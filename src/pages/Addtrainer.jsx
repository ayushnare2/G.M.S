import { useState } from 'react';
import './Addmember.css';

const Addtrainer = () => {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    age: '',
    timing: '',
    employment_status: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await fetch('https://gym-backendnew.onrender.com/api/trainers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (result.message) {
        alert(' Trainer added successfully!');
        setForm({
          first_name: '',
          last_name: '',
          age: '',
          timing: '',
          employment_status: '',
        });
      } else {
        alert(' Failed to add trainer.');
      }
    } catch (err) {
      console.error(' Error adding trainer:', err.message);
      alert('Error connecting to backend.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form-container'>
      <h2>Add Trainer</h2>

      <label className='form-label'><strong>First Name:</strong></label>
      <input className='form-intput' type="text" name="first_name" value={form.first_name} onChange={handleChange} required />

      <label className='form-label'><strong>Last Name:</strong></label>
      <input className='form-intput' type="text" name="last_name" value={form.last_name} onChange={handleChange} required />

      <label className='form-label'><strong>Age:</strong></label>
      <input className='form-intput' type="number" name="age" value={form.age} onChange={handleChange} required />

      <label className='form-label'><strong>Timing:</strong></label>
      <input className='form-intput' type="text" name="timing" placeholder="e.g. 6am–10am" value={form.timing} onChange={handleChange} required />

      <label className='form-label'><strong>Employment Status:</strong></label>
      <select className='form-intput' name="employment_status" value={form.employment_status} onChange={handleChange} required>
        <option value="">Select Type</option>
        <option value="Part Time">Part Time</option>
        <option value="Full Time">Full Time</option>
      </select>

      <br /><br />
      <button className='form-btn' type="submit">Add Trainer</button>
    </form>
  );
};

export default Addtrainer;