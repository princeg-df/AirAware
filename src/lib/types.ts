export type User = {
  id: string;
  name: string;
  email: string;
};

export type Device = {
  id: string;
  name: string;
  status: 'online' | 'offline';
  lastSeen: string;
  userEmail: string;
  telemetry: TelemetryData;
};

export type TelemetryData = {
  temperature: number;
  humidity: number;
  pm25: number;
  co2: number;
  aqi: number;
};

export type HistoricalData = {
  date: string;
} & Partial<TelemetryData>;
