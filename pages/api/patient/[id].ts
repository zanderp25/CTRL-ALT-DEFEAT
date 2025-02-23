// pages/api/patients/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

type Patient = {
  id: number;
  name: string;
  email: string;
  age: number;
  sex: string;
  medicalHistory: string;
  medications: JSON;
  allergies: string;
  statistics: JSON;
};

const dbPromise = open({
  filename: './mydb.sqlite',
  driver: sqlite3.Database,
});

(async () => {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      age INTEGER NOT NULL,
      sex TEXT NOT NULL,
      medicalHistory TEXT,
      medications TEXT,
      allergies TEXT,
      statistics TEXT
    );
  `);
})();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Patient | { message: string }>
) {
  const { id } = req.query;
  const parsedId = Number(id);

  if (isNaN(parsedId)) {
    return res.status(400).json({ message: 'Invalid id' });
  }

  try {
    const db = await dbPromise;

    if (req.method === 'GET') {
      const patient: Patient = await db.get(
        'SELECT * FROM patients WHERE id = ?',
        parsedId
      );
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      return res.status(200).json(patient);
    } else if (req.method === 'PUT') {
      const { name, email, age, sex, medicalHistory, medications, allergies, statistics } = req.body;

      const result = await db.run(
        `UPDATE patients
         SET name = $name, email = $email, age = $age, sex = $sex, 
             medicalHistory = $medicalHistory, medications = $medications, 
             allergies = $allergies, statistics = $statistics
         WHERE id = $id`,
        {
          $id: parsedId,
          $name: name,
          $email: email,
          $age: age,
          $sex: sex,
          $medicalHistory: medicalHistory,
          $medications: medications,
          $allergies: allergies,
          $statistics: statistics,
        }
      );

      if (result.changes === 0) {
        return res.status(404).json({ message: 'Patient not found' });
      }

      const updatedPatient: Patient = await db.get(
        'SELECT * FROM patients WHERE id = ?',
        parsedId
      );
      return res.status(200).json(updatedPatient);
    } else if (req.method === 'DELETE') {
      const result = await db.run(
        'DELETE FROM patients WHERE id = ?',
        parsedId
      );
      if (result.changes === 0) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      return res.status(200).json({ message: 'Patient deleted successfully' });
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error handling patient:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
