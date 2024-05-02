'use client'

import { usePathname } from 'next/navigation';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DescriptionComponent from '../../../components/DescriptionComponent';
interface DateDetail {
  date: string;
}

interface Event {
  event_id: number;
  name: string;
  dates: DateDetail[];
  address: string | null;
  description: string;
  img: string;
}

const EventPage: React.FC = () => {
  const pathname = usePathname();
  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);
  const id = pathname.split('/').pop();

  useEffect(() => {
    // Check if the router is ready and eventId is defined in the query
    const eventId = id;
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/events/${eventId}`);
        // Modify the image url as required
        const modifiedEvent = {
          ...response.data,
          img: decodeURIComponent(response.data.img).replace('http://localhost:8000/', '')
        };
        setEvent(modifiedEvent);
        
      } catch (error) {
        console.error('Error fetching event:', error);
        setError('Failed to fetch event. Please try again later.');
      }
    };

    fetchEvent();
  }, []); // Listening to changes in router.isReady and router.query.eventId

  if (!event) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-center font-bold text-4xl mb-8">{event.name}</div>
      <div className="flex items-center justify-center font-bold text-4xl mb-8"><img src={event.img} alt={event.name} className="w-full max-w-4xl h-auto object-cover rounded-lg mb-4"/></div>
      
      <p className="text-lg mb-1">Адрес: {event.address || 'Not available'}</p>
      <div className="flex items-center justify-center"><DescriptionComponent description={event.description} /></div>
    </div>
  );
};

export default EventPage;
