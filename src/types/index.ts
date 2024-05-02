export type SeatStatus = 'available' | 'selected' | 'unavailable';

export interface Seat {
  id: number;
  label: string;
  status: SeatStatus;
}
