import { useState } from 'react';
import './Addmember.css'

const Addtrainer = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    age: '',
    timing: '',
    employmentstatus: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Trainer Info:', form); 
  };

  return (
    <form onSubmit={handleSubmit} className='form-container'>
      <h2>Add Trainer</h2>

      <label className='form-label'><strong>First Name:</strong></label>
      <input className='form-intput' type="text" name="firstName" value={form.firstName} onChange={handleChange} required />

      <label className='form-label'><strong>Last Name:</strong></label>
      <input className='form-intput' type="text" name="lastName" value={form.lastName} onChange={handleChange} required />

      <label className='form-label'><strong>Age:</strong></label>
      <input className='form-intput' type="number" name="age" value={form.age} onChange={handleChange} required />

      <label className='form-label'><strong>Timing:</strong></label>
      <input className='form-intput' type="text" name="timing" placeholder="e.g. 6am–10am" value={form.timing} onChange={handleChange} required />

      <label className='form-label'><strong>Type:</strong></label>
      <select className='form-intput' name="type" value={form.employmentstatus} onChange={handleChange} required>
        <option value="">Employment Status</option>
        <option value="Part Time">Part Time</option>
        <option value="Full Time">Full Time</option>
      </select>

      <br /><br />
      <button className='form-btn' type="submit">Add Trainer</button>
    </form>
  );
};

export default Addtrainer;