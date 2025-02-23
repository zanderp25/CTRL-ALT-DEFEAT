-- scripts/createTables.sql

-- Users table for authentication with simulated CACs
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  card_id TEXT UNIQUE NOT NULL,  -- Simulated Common Access Card ID
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'user',      -- 'user' or 'admin'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Patients table for managing patient records
CREATE TABLE IF NOT EXISTS patients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  age INTEGER,
  sex TEXT,
  medicalHistory TEXT,
  medications TEXT,  -- JSON data stored as text
  allergies TEXT,
  statistics TEXT,   -- JSON data stored as text
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Surgeries table for scheduling and tracking surgeries
CREATE TABLE IF NOT EXISTS surgeries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_id INTEGER,
  scheduled_at TIMESTAMP,         -- Date and time of the surgery
  status TEXT,                    -- E.g., 'Scheduled', 'In Progress', 'Completed'
  notes TEXT,                     -- Additional details or observations
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id)
);
