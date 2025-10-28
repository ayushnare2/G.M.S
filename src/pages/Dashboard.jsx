import React, { useEffect, useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalMembers: 0,
    expiredPlans: 0,
    newThisWeek: 0,
    newThisMonth: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('https://gym-backendnew.onrender.com/api/members');
        const members = await res.json();

        console.log("📦 Members fetched:", members);

        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const statsCalculated = {
          totalMembers: members.length,
          expiredPlans: members.filter(m => new Date(m.endDate) < now).length,
          newThisWeek: members.filter(m => new Date(m.joinDate) >= startOfWeek).length,
          newThisMonth: members.filter(m => new Date(m.joinDate) >= startOfMonth).length,
        };

        setStats(statsCalculated);
      } catch (err) {
        console.error('❌ Error fetching dashboard stats:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      {loading ? (
        <p>Loading stats...</p>
      ) : (
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
      )}
    </div>
  );
};

export default Dashboard;