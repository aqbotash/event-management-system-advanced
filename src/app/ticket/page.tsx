// pages/index.tsx
'use client'
import React, { useState } from 'react';
import SeatMap from '../../components/SeatMap';
import { Seat, SeatStatus } from '../../types';

const HomePage: React.FC = () => {
  const initialSeats: Seat[] = new Array(50).fill(0).map((_, index) => ({
    id: index,
    label: `S${index + 1}`,
    status: 'available' as SeatStatus
  }));

  const [seats, setSeats] = useState<Seat[]>(initialSeats);

  const handleSelectSeat = (selectedId: number) => {
    const newSeats = seats.map(seat => {
      if (seat.id === selectedId) {
        return { ...seat, status: seat.status === 'selected' ? 'available' : 'selected' };
      }
      return seat;
    });
    setSeats(newSeats);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Select Your Seats</h1>
      <SeatMap seats={seats} onSeatSelect={handleSelectSeat} />
    </div>
  );
};

export default HomePage;
