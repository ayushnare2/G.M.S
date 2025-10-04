import React, { useState, useEffect } from 'react';
import { Table, Form, Container } from 'react-bootstrap';
import './members.css';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data — replace with backend or localStorage later
useEffect(() => {
  fetch("http://127.0.0.1:5000/get_members") // ask your friend for the exact GET endpoint
    .then(res => res.json())
    .then(data => setMembers(data))
    .catch(err => {
      console.error("Error fetching members:", err);
    });
}, []);

  const getPlanStatus = (endDate) => {
    const today = new Date();
    const expiry = new Date(endDate);
    return expiry >= today ? 'Active' : 'Expired';
  };

 const handleDelete = async (id) => {
  try {
    const res = await fetch(`http://127.0.0.1:5000/delete_member/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();

    if (result.message) {
      alert("🗑️ Member deleted!");
      setMembers(prev => prev.filter(member => member._id !== id));
    } else {
      alert("❌ Failed to delete member.");
    }
  } catch (err) {
    console.error("Delete error:", err);
    alert("❌ Error connecting to backend.");
  }
};

  const filteredMembers = members.filter(member =>
    `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="members-container">
      <h2 className="members-title">Members List</h2>

      <Form.Control
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="members-search"
      />

      <Table striped bordered hover responsive className="members-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Join Date</th>
            <th>End Date</th>
            <th>Payment Status</th>
            <th>Plan Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member, index) => (
              <tr key={member._id}>
                <td>{index + 1}</td>
                <td>{member.firstName} {member.lastName}</td>
                <td>{member.joinDate}</td>
                <td>{member.endDate}</td>
                <td>{member.paymentStatus}</td>
                <td className={getPlanStatus(member.endDate) === 'Active' ? 'status-active' : 'status-expired'}>
                  {getPlanStatus(member.endDate)}
                </td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(member._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No members found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Members;