import type { Device, HistoricalData, User } from '@/lib/types';

export const USERS: User[] = [
  { id: 'user-1', name: 'Alice', email: 'alice@example.com' },
  { id: 'user-2', name: 'Bob', email: 'bob@example.com' },
  { id: 'user-3', name: 'Charlie', email: 'charlie@example.com' },
];


export const DEVICES: Device[] = [
  {
    id: 'living-room-monitor',
    name: 'Living Room Monitor',
    status: 'online',
    lastSeen: '2 minutes ago',
    userEmail: 'alice@example.com',
    telemetry: {
      temperature: 22.5,
      humidity: 45,
      pm25: 12,
      co2: 550,
      aqi: 48,
    },
  },
  {
    id: 'bedroom-station',
    name: 'Bedroom Station',
    status: 'online',
    lastSeen: '5 minutes ago',
    userEmail: 'alice@example.com',
    telemetry: {
      temperature: 21.8,
      humidity: 52,
      pm25: 8,
      co2: 600,
      aqi: 32,
    },
  },
  {
    id: 'office-sensor',
    name: 'Office Sensor',
    status: 'offline',
    lastSeen: '3 hours ago',
    userEmail: 'bob@example.com',
    telemetry: {
      temperature: 23.1,
      humidity: 40,
      pm25: 15,
      co2: 750,
      aqi: 55,
    },
  },
  {
    id: 'kitchen-hub',
    name: 'Kitchen Hub',
    status: 'online',
    lastSeen: '10 seconds ago',
    userEmail: 'charlie@example.com',
    telemetry: {
      temperature: 24.0,
      humidity: 60,
      pm25: 25,
      co2: 800,
      aqi: 79,
    },
  },
  {
    id: 'garage-sensor',
    name: 'Garage Sensor',
    status: 'online',
    lastSeen: '1 minute ago',
    userEmail: 'bob@example.com',
    telemetry: {
      temperature: 19.5,
      humidity: 55,
      pm25: 5,
      co2: 450,
      aqi: 25,
    },
  },
];

const generateHistoricalData = (days: number): HistoricalData[] => {
  const data: HistoricalData[] = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      temperature: 20 + Math.random() * 5,
      humidity: 40 + Math.random() * 15,
      pm25: 5 + Math.random() * 20,
      co2: 400 + Math.random() * 300,
      aqi: 20 + Math.random() * 50,
    });
  }
  return data;
};

export const HISTORICAL_DATA: { [key: string]: HistoricalData[] } = {
  '24h': generateHistoricalData(1).map((d, i) => ({ ...d, date: `${i}:00`})).slice(0, 24),
  '7d': generateHistoricalData(7),
  '30d': generateHistoricalData(30),
};
