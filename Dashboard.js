import React, { useState, useEffect } from "react";
import axios from "axios";
import EventForm from "./EventForm";
import EventList from "./EventList";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user, setUser }) => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (err) {
      setError('Failed to load events');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line
  }, []);

  const handleCreateEvent = async (formData) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/events', {
        ...formData,
        createdBy: user._id,
      });
      setEvents(prev => [response.data, ...prev]);
      setShowForm(false);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinEvent = async (eventId) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:5000/api/events/${eventId}/join`,
        { userId: user._id }
      );
      setEvents(prev => prev.map(event => 
        event._id === eventId ? response.data : event
      ));
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to join event');
    } finally {
      setLoading(false);
    }
  };

  const createdEvents = events.filter(event => 
    event.createdBy && event.createdBy._id && user && user._id && event.createdBy._id === user._id
  );

  const joinedEvents = events.filter(event => 
    Array.isArray(event.participants) && event.participants.some(participant => participant && participant._id === user._id) && 
    event.createdBy && event.createdBy._id !== user._id
  );

  const availableEvents = events.filter(event => 
    Array.isArray(event.participants) && !event.participants.some(participant => participant && participant._id === user._id) && 
    event.createdBy && event.createdBy._id !== user._id
  );

  // Debug logs
  console.log('All events:', events);
  console.log('User:', user);
  console.log('Created events:', createdEvents);
  console.log('Joined events:', joinedEvents);
  console.log('Available events:', availableEvents);

  if (!user || !user._id) {
    return <div>Loading user...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem('event-app-user');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <header className="header">
        <h2 className="header-title">Event Manager</h2>
        <div className="header-user">
          <span>Welcome, {user.username}</span>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="main-content">
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Create New Event'}
        </button>

        {showForm && <EventForm onCreateEvent={handleCreateEvent} />}

        {error && <div className="error-message">{error}</div>}
        {loading && <div>Loading...</div>}

        <h3 className="section-title">My Created Events</h3>
        <div className="card">
          <EventList events={createdEvents} />
        </div>

        <h3 className="section-title">Events I'm Joining</h3>
        <div className="card">
          <EventList events={joinedEvents} />
        </div>

        <h3 className="section-title">Available Events</h3>
        <div className="card">
          <EventList 
            events={availableEvents} 
            onJoin={handleJoinEvent}
            showJoinButton={true}
            currentUser={user}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;