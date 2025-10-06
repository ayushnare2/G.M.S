import React from 'react';
import './Dashboard.css'; // Custom styles

const Dashboard = () => {
  const stats = {
    totalMembers: 120,
    expiredPlans: 15,
    newThisWeek: 8,
    newThisMonth: 22,
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <div className="card-grid">

        <div className="card card-blue">
          <h3>Total Members</h3>
          <p>{stats.totalMembers}</p>
        </div>

        <div className="card card-red">
          <h3>Expired Plans</h3>
          <p>{stats.expiredPlans}</p>
        </div>

        <div className="card card-green">
          <h3>Members This Week</h3>
          <p>{stats.newThisWeek}</p>
        </div>

        <div className="card card-yellow">
          <h3>Members This Month</h3>
          <p>{stats.newThisMonth}</p>
        </div>

        <div className="card card-gray">
          <h3>Welcome to GymX</h3>
          <p>Track members, payments, and plans all in one place.</p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;