import React from "react";

const formatDate = (dateString) => {
  try {
    return new Date(dateString).toLocaleString();
  } catch {
    return 'Invalid date';
  }
};

const EventList = ({ events, onJoin, showJoinButton, currentUser }) => {
  if (!events || events.length === 0) {
    return <p>No events found</p>;
  }

  return (
    <div className="event-list">
      {events.map(event => (
        <div key={event._id} className="event-card">
          <h4>{event.title}</h4>
          <p>{event.description}</p>
          <p>Date: {formatDate(event.date)}</p>
          <p>Location: {event.location}</p>
          <p>Creator: {event.createdBy?.name || 'Unknown'}</p>
          <p>Attendees: {event.participants?.length || 0}</p>
          
          {showJoinButton && (
            <button 
              onClick={() => onJoin(event._id)}
              disabled={event.participants?.some(p => p._id === currentUser._id)}
            >
              {event.participants?.some(p => p._id === currentUser._id) ? 'Joined' : 'Join'}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default EventList;