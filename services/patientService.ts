// services/patientService.ts
import { getDB } from '../lib/db';

export type Patient = {
  id: number;
  name: string;
  email?: string;
  age?: number;
  sex?: string;
  medicalHistory?: string;
  medications?: any; // Stored as JSON (string) in SQLite
  allergies?: string;
  statistics?: any;  // Stored as JSON (string) in SQLite
  created_at?: string;
};

export async function getAllPatients(): Promise<Patient[]> {
  const db = await getDB();
  const patients = await db.all<Patient[]>('SELECT * FROM patients');
  // Parse JSON fields for each patient
  return patients.map((patient) => ({
    ...patient,
    medications: patient.medications ? JSON.parse(patient.medications) : null,
    statistics: patient.statistics ? JSON.parse(patient.statistics) : null,
  }));
}

export async function getPatientById(id: number): Promise<Patient | undefined> {
  const db = await getDB();
  const patient = await db.get<Patient>('SELECT * FROM patients WHERE id = ?', id);
  if (patient) {
    return {
      ...patient,
      medications: patient.medications ? JSON.parse(patient.medications) : null,
      statistics: patient.statistics ? JSON.parse(patient.statistics) : null,
    };
  }
  return undefined;
}

export async function createPatient(patientData: Omit<Patient, 'id' | 'created_at'>): Promise<Patient> {
  const db = await getDB();
  const {
    name,
    email,
    age,
    sex,
    medicalHistory,
    medications,
    allergies,
    statistics,
  } = patientData;

  const result = await db.run(
    `INSERT INTO patients (name, email, age, sex, medicalHistory, medications, allergies, statistics)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    name,
    email,
    age,
    sex,
    medicalHistory,
    medications ? JSON.stringify(medications) : null,
    allergies,
    statistics ? JSON.stringify(statistics) : null
  );
  
  // Retrieve the created patient using the last inserted id
  if (result.lastID === undefined) throw new Error('Failed to create patient');
  const newPatient = await getPatientById(result.lastID);
  if (!newPatient) throw new Error('Failed to create patient');
  return newPatient;
}

export async function updatePatient(
  id: number,
  data: Omit<Patient, 'id' | 'created_at'>
): Promise<Patient | undefined> {
  const db = await getDB();
  const {
    name,
    email,
    age,
    sex,
    medicalHistory,
    medications,
    allergies,
    statistics,
  } = data;
  
  const result = await db.run(
    `UPDATE patients
     SET name = ?,
         email = ?,
         age = ?,
         sex = ?,
         medicalHistory = ?,
         medications = ?,
         allergies = ?,
         statistics = ?
     WHERE id = ?`,
    name,
    email,
    age,
    sex,
    medicalHistory,
    medications ? JSON.stringify(medications) : null,
    allergies,
    statistics ? JSON.stringify(statistics) : null,
    id
  );
  
  if (result.changes === 0) return undefined;
  
  return getPatientById(id);
}

export async function deletePatient(id: number): Promise<boolean> {
  const db = await getDB();
  const result = await db.run('DELETE FROM patients WHERE id = ?', id);
  return result.changes !== undefined && result.changes > 0;
}
