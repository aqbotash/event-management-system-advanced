'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      console.log('response:', response.data[0].img);
      const modifiedResults = response.data.map((event: Event) => ({
        ...event,
        img: decodeURIComponent(event.img).replace('http://localhost:8000/', ' ')
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

  const handlePageChange = (pageNumber: number) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setFilteredEvents(events.slice(startIndex, endIndex));
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
      <div className="text-3xl font-bold p-8 mb-8 flex justify-center items-center">Events in Astana</div>
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
            <Link key={event.event_id} href={`/dashboard/${event.event_id}`} className="p-4 rounded-xl bg-custom-yellow cursor-pointer">
            <img src={event.img} className="w-full h-48 object-cover rounded-md mb-2"/>
            <h2 className="text-lg font-semibold">{event.name}</h2>
            <p className="text-sm text-gray-500 mb-2">{event.address}</p>
            <p className="text-sm">{event.dates[0]?.date} - {event.dates[event.dates.length - 1]?.date}</p>
          </Link>
          ))
        ) : (
          filteredEvents.map((event: any) => (
            <Link key={event.event_id} href={`/dashboard/${event.event_id}`} className="p-4 rounded-xl bg-custom-yellow cursor-pointer">
            <img src={event.img} alt={event.name} className="w-full h-48 object-cover rounded-md mb-2"/>
            <h2 className="text-lg font-semibold">{event.name}</h2>
            <p className="text-sm text-gray-500 mb-2">{event.address}</p>
            <p className="text-sm">{event.dates[0]?.date} - {event.dates[event.dates.length - 1]?.date}</p>
          </Link>
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
      <div className="mt-24 mb-24 flex items-center justify-center">with love by {'\u00a0'} <a href='https://github.com/aqbotash' className="text-blue-600"> aqbota </a> {'\u00a0'} for n!</div>
    </div>
  );
};

export default EventList;