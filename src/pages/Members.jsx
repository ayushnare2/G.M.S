import React, { useState, useEffect } from 'react';
import { Table, Form, Container, Spinner } from 'react-bootstrap';
import './Members.css';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://gym-backendnew.onrender.com/api/members")
      .then(res => res.json())
      .then(data => {
        setMembers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ Error fetching members:", err.message);
        setLoading(false);
      });
  }, []);

  const getPlanStatus = (endDate) => {
    const today = new Date();
    const expiry = new Date(endDate);
    return expiry >= today ? 'Active' : 'Expired';
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://gym-backendnew.onrender.com/api/members/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (result.message) {
        alert("🗑️ Member deleted!");
        setMembers(prev => prev.filter(member => member._id !== id));
      } else {
        alert("⚠️ Failed to delete member.");
      }
    } catch (err) {
      console.error("❌ Delete error:", err.message);
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

      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" variant="primary" />
          <p>Loading members...</p>
        </div>
      ) : (
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
      )}
    </Container>
  );
};

export default Members;