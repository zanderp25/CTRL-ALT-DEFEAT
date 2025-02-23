import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'sqlite3';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure you have this set in your environment
});

type Medication = {
  "name": string,
  "dosage": string,
  "frequency": string
}

type statistics = {
  "temperature": number,
  "bloodPressure": string,
  "ECG": string,
  "SPO2": number,
  "respiratoryRate": number,
  "bloodGlucose": number
}

type Patient = {
    "id": number,
    "name": string,
    "email": string,
    "age": number,
    "sex": string,
    "medicalHistory": string,
    "medications": Medication[
    ],
    "allergies": [
      {
        "name": string
      }
    ],
    "statistics": statistics,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Patient[] | Patient | { message: string }>
) {
  if (req.method === 'GET') {
    try {
      const { rows } = await pool.query<Patient>('SELECT * FROM patients');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching patients:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    const { id, name, email, age, sex, medicalHistory, medications, allergies, statistics } = req.body;
    try {
      const { rows } = await pool.query<Patient>(
        'INSERT INTO patients (id, name, email, age, sex, medicalHistory, medications, allergies, statistics) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        [id, name, email, age, sex, medicalHistory, medications, allergies, statistics]
      );
      res.status(201).json(rows[0]);
    } catch (error) {
      console.error('Error creating patient:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
