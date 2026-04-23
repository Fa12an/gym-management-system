import { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../config';
import './AdminDashboard.css';

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [members, setMembers] = useState([]);
  const [stats, setStats] = useState({
    total_bookings: 0,
    pending_bookings: 0,
    total_members: 0,
    active_members: 0
  });
  const [activeTab, setActiveTab] = useState('bookings');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [memberForm, setMemberForm] = useState({
    name: '',
    phone: '',
    email: '',
    plan: 'monthly',
    start_date: '',
    end_date: '',
    fee: 1499
  });

  const showNotification = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [bookingsRes, membersRes, statsRes] = await Promise.all([
        axios.get(`${API_URL}/admin/bookings`),
        axios.get(`${API_URL}/admin/members`),
        axios.get(`${API_URL}/admin/stats`)
      ]);
      setBookings(bookingsRes.data);
      setMembers(membersRes.data);
      setStats(statsRes.data);
    } catch (error) {
      showNotification('Error fetching data', 'error');
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      await axios.put(`${API_URL}/admin/bookings/${bookingId}/status?status=${status}`);
      showNotification(`Booking ${status} successfully!`, 'success');
      fetchData();
    } catch (error) {
      showNotification('Error updating status', 'error');
    }
  };

  const deleteBooking = async (bookingId) => {
    if (window.confirm('Delete this booking?')) {
      try {
        await axios.delete(`${API_URL}/admin/bookings/${bookingId}`);
        showNotification('Booking deleted!', 'success');
        fetchData();
      } catch (error) {
        showNotification('Error deleting booking', 'error');
      }
    }
  };

  const addMember = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/admin/members`, memberForm);
      showNotification('Member added successfully!', 'success');
      setShowMemberForm(false);
      setMemberForm({ name: '', phone: '', email: '', plan: 'monthly', start_date: '', end_date: '', fee: 1499 });
      fetchData();
    } catch (error) {
      showNotification('Error adding member', 'error');
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending': return <span className="badge-pending">Pending</span>;
      case 'confirmed': return <span className="badge-confirmed">Confirmed</span>;
      case 'completed': return <span className="badge-completed">Completed</span>;
      case 'cancelled': return <span className="badge-cancelled">Cancelled</span>;
      default: return <span className="badge-pending">Pending</span>;
    }
  };

  return (
    <div className="admin-dashboard">
      {showToast && (
        <div className={`toast-notification ${toastType}`}>
          <span>{toastType === 'success' ? '✅' : '❌'}</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Manage trial bookings and members</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h3>{stats.total_bookings}</h3>
            <p>Total Bookings</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>{stats.pending_bookings}</h3>
            <p>Pending</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.total_members}</h3>
            <p>Total Members</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💪</div>
          <div className="stat-info">
            <h3>{stats.active_members}</h3>
            <p>Active Members</p>
          </div>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>
          📋 Trial Bookings
        </button>
        <button className={`tab ${activeTab === 'members' ? 'active' : ''}`} onClick={() => setActiveTab('members')}>
          👥 Members
        </button>
      </div>

      {activeTab === 'bookings' && (
        <div className="bookings-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Goal</th>
                <th>Preferred Date</th>
                <th>Preferred Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="8" className="no-data">No trial bookings yet</td>
                </tr>
              ) : (
                bookings.map(booking => (
                  <tr key={booking.id}>
                    <td>{booking.name}</td>
                    <td>{booking.phone}</td>
                    <td>{booking.email}</td>
                    <td>{booking.goal}</td>
                    <td>{booking.preferred_date}</td>
                    <td>{booking.preferred_time}</td>
                    <td>{getStatusBadge(booking.status)}</td>
                    <td className="actions-cell">
                      <select onChange={(e) => updateBookingStatus(booking.id, e.target.value)} value={booking.status}>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <button className="delete-btn" onClick={() => deleteBooking(booking.id)}>🗑️</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'members' && (
        <div>
          <div className="section-header">
            <button className="add-btn" onClick={() => setShowMemberForm(true)}>+ Add New Member</button>
          </div>
          
          {showMemberForm && (
            <div className="modal" onClick={(e) => { if (e.target.className === 'modal') setShowMemberForm(false); }}>
              <div className="modal-content">
                <div className="modal-header">
                  <h2>Add New Member</h2>
                  <button className="close-modal" onClick={() => setShowMemberForm(false)}>✕</button>
                </div>
                <form onSubmit={addMember}>
                  <input type="text" placeholder="Full Name" value={memberForm.name} onChange={(e) => setMemberForm({...memberForm, name: e.target.value})} required />
                  <input type="tel" placeholder="Phone" value={memberForm.phone} onChange={(e) => setMemberForm({...memberForm, phone: e.target.value})} required />
                  <input type="email" placeholder="Email" value={memberForm.email} onChange={(e) => setMemberForm({...memberForm, email: e.target.value})} required />
                  <select value={memberForm.plan} onChange={(e) => setMemberForm({...memberForm, plan: e.target.value, fee: e.target.value === 'monthly' ? 1499 : e.target.value === 'quarterly' ? 3999 : 12999})}>
                    <option value="monthly">Monthly - ₹1,499</option>
                    <option value="quarterly">Quarterly - ₹3,999</option>
                    <option value="yearly">Yearly - ₹12,999</option>
                  </select>
                  <input type="date" placeholder="Start Date" value={memberForm.start_date} onChange={(e) => setMemberForm({...memberForm, start_date: e.target.value})} required />
                  <input type="date" placeholder="End Date" value={memberForm.end_date} onChange={(e) => setMemberForm({...memberForm, end_date: e.target.value})} required />
                  <div className="form-buttons">
                    <button type="submit" className="save-btn">Save Member</button>
                    <button type="button" className="cancel-btn" onClick={() => setShowMemberForm(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          <div className="members-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Plan</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {members.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="no-data">No members added yet</td>
                  </tr>
                ) : (
                  members.map(member => (
                    <tr key={member.id}>
                      <td>{member.name}</td>
                      <td>{member.phone}</td>
                      <td>{member.email}</td>
                      <td>{member.plan}</td>
                      <td>{member.start_date}</td>
                      <td>{member.end_date}</td>
                      <td><span className={`badge-${member.status}`}>{member.status}</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
