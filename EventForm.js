import React, { useState } from "react";

const EventForm = ({ onCreateEvent }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: 'Online'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert date to ISO string if not already
    const isoDate = formData.date ? new Date(formData.date).toISOString() : "";
    onCreateEvent({ ...formData, date: isoDate });
  };

  return (
    <div className="event-form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title*</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label>Date*</label>
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Location</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
          >
            <option value="Online">Online</option>
            <option value="In-Person">In-Person</option>
          </select>
        </div>
        
        <button className="btn btn-primary" type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default EventForm;