// pages/api/patients/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
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
  res: NextApiResponse<Patient | { message: string }>
) {
  const { id } = req.query;
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS patients (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100),
      age INT,
      sex VARCHAR(10),
      medicalHistory TEXT,
      medications JSONB,
      allergies JSONB,
      statistics JSONB
    );
  `;

  try {
    await pool.query(createTableQuery);
  } catch (error) {
    console.error('Error creating table:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
    

  if (!Number(id)) {
    return res.status(400).json({ message: 'Invalid patient ID' });
  }
  if (req.method === 'GET') {
    try {
      const { rows } = await pool.query<Patient>(
        'SELECT * FROM patients WHERE id = $1',
        [id]
      );
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Error fetching patient:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'PUT') {
    const { name, email, age, sex, medicalHistory, medications, allergies, statistics } = req.body;
    try {
      const { rows } = await pool.query<Patient>(
        `UPDATE patients 
         SET name = $2, email = $3, age = $4, sex = $5, medicalHistory = $6, medications = $7, allergies = $8, statistics = $9 
         WHERE id = $1 RETURNING *`,
        [id, name, email, age, sex, medicalHistory, medications, allergies, statistics]
      );
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Error updating patient:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const result = await pool.query(
        'DELETE FROM patients WHERE id = $1',
        [id]
      );
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
      console.error('Error deleting patient:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
