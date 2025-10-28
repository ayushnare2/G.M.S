import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Container } from 'react-bootstrap';
import './Members.css';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get("https://gym-backendnew.onrender.com/api/members");
        setMembers(res.data);
      } catch (err) {
        console.error("❌ Error fetching members:", err.response?.data || err.message);
      }
    };

    fetchMembers();
  }, []);

  const getPlanStatus = (endDate) => {
    const today = new Date();
    const expiry = new Date(endDate);
    return expiry >= today ? 'Active' : 'Expired';
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`https://gym-backendnew.onrender.com/api/members/${id}`);
      if (res.data.message) {
        alert("🗑️ Member deleted!");
        setMembers(prev => prev.filter(member => member._id !== id));
      } else {
        alert("⚠️ Failed to delete member.");
        console.error("Delete response:", res.data);
      }
    } catch (err) {
      console.error("❌ Delete error:", err.response?.data || err.message);
      alert("Error connecting to backend.");
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

      <Table className="members-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Contact</th>
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
                <td>{member.phoneNumber || 'N/A'}</td>
                <td>{member.joinDate || 'N/A'}</td>
                <td>{member.endDate || 'N/A'}</td>
                <td>{member.paymentStatus || 'N/A'}</td>
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
              <td colSpan="8" className="text-center">No members found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Members;