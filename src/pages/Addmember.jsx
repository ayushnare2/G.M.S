import { useState } from 'react';

const Addmember = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    age: '',
    gender: '',
    plan: '',
    wantTrainer: '',
    paymentStatus: '',
    joinDate: '',
    endDate: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    let updatedForm = { ...form, [name]: value };

    
    if (name === 'joinDate' || name === 'plan') {
      const join = new Date(name === 'joinDate' ? value : form.joinDate);
      const plan = name === 'plan' ? value : form.plan;

      if (join && plan) {
        let months = 0;
        if (plan === '3 Months') months = 3;
        else if (plan === '6 Months') months = 6;
        else if (plan === '1 Year') months = 12;

        const end = new Date(join);
        end.setMonth(end.getMonth() + months);
        updatedForm.endDate = end.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      }
    }

    setForm(updatedForm);
  };

  const handleSubmit = e => {
  e.preventDefault();

  const wantTrainerBool = form.wantTrainer === "Yes";

  const payload = {
    ...form,
    wantTrainer: wantTrainerBool,
    trainerId: wantTrainerBool ? 1 : null
  };

  // fetch("http://127.0.0.1:5000/add_member", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify(payload)
  // })
  // .then(res => res.json())
  // .then(data => {
  //   if (data.message) {
  //     alert("✅ Member added successfully!");
  //     console.log(data);
  //   } else {
  //     alert("❌ Failed to add member.");
  //     console.error(data);
  //   }
  // })
  // .catch(err => {
  //   alert("❌ Error connecting to backend.");
  //   console.error(err);
  // });

  
};

  return (
    <form onSubmit={handleSubmit} className='form-container'>
      <h2>Add Member</h2>

      <label className='form-label'><strong>First Name:</strong></label>
      <input className='form-intput' type="text" name="firstName" value={form.firstName} onChange={handleChange} required />

      <label className='form-label'><strong>Last Name:</strong></label>
      <input className='form-intput' type="text" name="lastName" value={form.lastName} onChange={handleChange} required />

      <label className='form-label'><strong>Phone Number:</strong></label>
      <input className='form-intput' type="number" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />

      <label className='form-label'><strong>Age:</strong></label>
      <input className='form-intput' type="number" name="age" value={form.age} onChange={handleChange} required />

      <label className='form-label'><strong>Gender:</strong></label>
      <select className='form-intput' name="gender" value={form.gender} onChange={handleChange} required>
        <option value="">Select</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <label className='form-label'><strong>Plan Type:</strong></label>
      <select className='form-intput' name="plan" value={form.plan} onChange={handleChange} required>
        <option value="">Select</option>
        <option value="3 Months">3 Months</option>
        <option value="6 Months">6 Months</option>
        <option value="1 Year">1 Year</option>
      </select>

      <label className='form-label'><strong>Join Date:</strong></label>
      <input className='form-intput' type="date" name="joinDate" value={form.joinDate} onChange={handleChange} required />

      <label className='form-label'><strong>End Date:</strong></label>
      <input className='form-intput' type="text" name="endDate" value={form.endDate} readOnly />

      <label className='form-label'><strong>Want Trainer:</strong></label>
      <select className='form-intput' name="wantTrainer" value={form.wantTrainer} onChange={handleChange} required>
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <label className='form-label'><strong>Payment Status:</strong></label>
      <select className='form-intput' name="paymentStatus" value={form.paymentStatus} onChange={handleChange} required>
        <option value="">Select</option>
        <option value="Paid">Paid</option>
        <option value="Unpaid">Unpaid</option>
      </select>

      <br /><br />
      <button className='form-btn' type="submit">Add Member</button>
    </form>
  );
};

export default Addmember;