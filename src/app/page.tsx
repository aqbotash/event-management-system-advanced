'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Event {
  event_id: number;
  name: string;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8000/api/events/')
      .then(res => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load events');
        setLoading(false);
      });
  }, []);

  const addToCalendar = (eventId: number) => {
    // Assuming the endpoint returns the URL for the OAuth flow
    setLoading(true);
    axios.get(`http://localhost:8000/api/events/${eventId}/add-to-calendar/`)
      .then(res => {
        console.log(res.data.url); // Log the OAuth URL
        window.location.href = res.data.url; // Redirect to the OAuth URL
      })
      .catch(err => {
        setError('Failed to add to calendar');
      })
      .finally(() => {
        setLoading(false); // This will execute after the redirection
      });
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Events</h1>
      {events.map(event => (
        <div key={event.event_id}>
          <h2>{event.name}</h2>
          <button onClick={() => addToCalendar(event.event_id)} disabled={loading}>
            Add to Google Calendar
          </button>
        </div>
      ))}
    </div>
  );
}
