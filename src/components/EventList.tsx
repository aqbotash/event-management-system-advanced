'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Event {
  event_id: number;
  name: string;
  date: string | null;
  address: string | null;
  description: string;
  img: string;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchFilteredEvents, setSearchFilteredEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const pageSize = 20;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get<any>('http://localhost:8000/api/events/');
      console.log('response:', response.data);
      const modifiedResults = response.data.map((event: Event) => ({
        ...event,
        img: decodeURIComponent(event.img).replace('http://localhost:8000/', '')
      }));
      setEvents(modifiedResults);
      setFilteredEvents(modifiedResults.slice(0, pageSize));
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Error fetching events. See console for details.');
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    filterEvents(event.target.value);
  };

  const filterEvents = (query: string) => {
    const filtered = events.filter(event =>
      event.name.toLowerCase().includes(query.toLowerCase()) ||
      event.description.toLowerCase().includes(query.toLowerCase()) ||
      (event.address && event.address.toLowerCase().includes(query.toLowerCase()))
    );
    setSearchFilteredEvents(filtered);
    setFilteredEvents(filtered.slice(0, pageSize)); // Limit to first page after filtering
  };

  const handleSearchPageChange = (pageNumber: number) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setFilteredEvents(searchFilteredEvents.slice(startIndex, endIndex));
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Events</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {searchQuery ? (
          filteredEvents.map((event: any) => (
            <div key={event.event_id} className="p-4 rounded-xl bg-custom-light-pink">
              <img src={event.img} alt="Event" className="w-full h-48 object-cover rounded-md mb-2" />
              <h2 className="text-lg font-semibold">{event.name}</h2>
              <p className="text-sm text-gray-500 mb-2">{event.description}</p>
            </div>
          ))
        ) : (
          filteredEvents.map((event: any) => (
            <div key={event.event_id} className="p-4 rounded-xl bg-custom-light-pink">
              <img src={event.img} alt="Event" className="w-full h-48 object-cover rounded-md mb-2" />
              <h2 className="text-lg font-semibold">{event.name}</h2>
              <p className="text-sm text-gray-500 mb-2">{event.description}</p>
            </div>
          ))
        )}
      </div>
      <div className="mt-4 flex justify-center">
        {searchQuery ? (
          Array.from({ length: Math.ceil(searchFilteredEvents.length / pageSize) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handleSearchPageChange(i + 1)}
              className="px-3 py-1 mx-1 rounded bg-gray-200 text-gray-800"
            >
              {i + 1}
            </button>
          ))
        ) : (
          Array.from({ length: Math.ceil(events.length / pageSize) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className="px-3 py-1 mx-1 rounded bg-gray-200 text-gray-800"
            >
              {i + 1}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default EventList;
