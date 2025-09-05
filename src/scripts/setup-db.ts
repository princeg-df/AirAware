import 'dotenv/config';
import pool from '../lib/db';

const createTablesQueries = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS homes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    home_name VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY,
    home_id INTEGER REFERENCES homes(id) ON DELETE CASCADE,
    room_name VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS devices (
    id SERIAL PRIMARY KEY,
    device_id VARCHAR(50) UNIQUE NOT NULL,
    mac_address VARCHAR(50) UNIQUE NOT NULL,
    device_name VARCHAR(150) NOT NULL,
    device_type VARCHAR(100),
    product_number VARCHAR(100),
    real_device_name VARCHAR(150),
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    room_id INTEGER REFERENCES rooms(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS device_configurations (
    id SERIAL PRIMARY KEY,
    device_id INTEGER REFERENCES devices(id) ON DELETE CASCADE,
    custom_device_name VARCHAR(150),
    device_category VARCHAR(100),
    device_config VARCHAR(50),
    system_type VARCHAR(100),
    udid VARCHAR(100) UNIQUE,
    uhid VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS telemetry_data (
    id SERIAL PRIMARY KEY,
    device_id INTEGER REFERENCES devices(id) ON DELETE CASCADE,
    pm25 FLOAT,
    co2 FLOAT,
    humidity FLOAT,
    aqi FLOAT,
    temperature FLOAT,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

async function setupDatabase() {
  console.log('Connecting to the database...');
  const client = await pool.connect();
  console.log('Connection successful. Creating tables...');
  try {
    await client.query(createTablesQueries);
    console.log('Tables created successfully!');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    client.release();
    console.log('Database connection closed.');
    await pool.end();
  }
}

setupDatabase();
