// pages/api/surgeries/index.ts
// Future Feature

// import type { NextApiRequest, NextApiResponse } from 'next';
// import { getAllSurgeries, createSurgery, Surgery } from '../../../services/surgeryService';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Surgery[] | Surgery | { message: string }>
// ) {
//   if (req.method === 'GET') {
//     try {
//       const surgeries = await getAllSurgeries();
//       return res.status(200).json(surgeries);
//     } catch (error) {
//       console.error('Error fetching surgeries:', error);
//       return res.status(500).json({ message: 'Internal Server Error' });
//     }
//   } else if (req.method === 'POST') {
//     const { patient_id, scheduled_at, status, notes } = req.body;
//     if (!patient_id || !scheduled_at || !status) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }
//     try {
//       const newSurgery = await createSurgery({ patient_id, scheduled_at, status, notes });
//       return res.status(201).json(newSurgery);
//     } catch (error) {
//       console.error('Error creating surgery:', error);
//       return res.status(500).json({ message: 'Internal Server Error' });
//     }
//   } else {
//     res.setHeader('Allow', ['GET', 'POST']);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
