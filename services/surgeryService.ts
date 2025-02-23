// services/surgeryService.ts
// Future feature
// import { getDB } from '../lib/db';

// export type Surgery = {
//   id: number;
//   patient_id: number;
//   scheduled_at: string; // ISO string for date/time
//   status: string;       // e.g., 'Scheduled', 'In Progress', 'Completed'
//   notes?: string;
//   created_at?: string;
// };

// export async function getAllSurgeries(): Promise<Surgery[]> {
//   const db = await getDB();
//   return db.all<Surgery[]>('SELECT * FROM surgeries ORDER BY scheduled_at ASC');
// }

// export async function getSurgeryById(id: number): Promise<Surgery | undefined> {
//   const db = await getDB();
//   return db.get<Surgery>('SELECT * FROM surgeries WHERE id = ?', id);
// }

// export async function createSurgery(surgeryData: Omit<Surgery, 'id' | 'created_at'>): Promise<Surgery> {
//   const db = await getDB();
//   const { patient_id, scheduled_at, status, notes } = surgeryData;
//   const result = await db.run(
//     `INSERT INTO surgeries (patient_id, scheduled_at, status, notes)
//      VALUES (?, ?, ?, ?)`,
//     patient_id,
//     scheduled_at,
//     status,
//     notes
//   );
//   const newSurgery = await getSurgeryById(result.lastID);
//   if (!newSurgery) throw new Error('Failed to create surgery');
//   return newSurgery;
// }

// export async function updateSurgery(
//   id: number,
//   data: Omit<Surgery, 'id' | 'created_at'>
// ): Promise<Surgery | undefined> {
//   const db = await getDB();
//   const { patient_id, scheduled_at, status, notes } = data;
//   const result = await db.run(
//     `UPDATE surgeries
//      SET patient_id = ?, scheduled_at = ?, status = ?, notes = ?
//      WHERE id = ?`,
//     patient_id,
//     scheduled_at,
//     status,
//     notes,
//     id
//   );
//   if (result.changes === 0) return undefined;
//   return getSurgeryById(id);
// }

// export async function deleteSurgery(id: number): Promise<boolean> {
//   const db = await getDB();
//   const result = await db.run('DELETE FROM surgeries WHERE id = ?', id);
//   return result.changes > 0;
// }
