// pages/api/surgeries/[id].ts
// Future Feature

// import type { NextApiRequest, NextApiResponse } from 'next';
// import { getSurgeryById, updateSurgery, deleteSurgery, Surgery } from '../../../services/surgeryService';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Surgery | { message: string }>
// ) {
//   const { id } = req.query;
//   const parsedId = Number(id);
//   if (isNaN(parsedId)) return res.status(400).json({ message: 'Invalid id' });
  
//   if (req.method === 'GET') {
//     try {
//       const surgery = await getSurgeryById(parsedId);
//       if (!surgery) return res.status(404).json({ message: 'Surgery not found' });
//       return res.status(200).json(surgery);
//     } catch (error) {
//       console.error('Error fetching surgery:', error);
//       return res.status(500).json({ message: 'Internal Server Error' });
//     }
//   } else if (req.method === 'PUT') {
//     const { patient_id, scheduled_at, status, notes } = req.body;
//     if (!patient_id || !scheduled_at || !status) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }
//     try {
//       const updatedSurgery = await updateSurgery(parsedId, { patient_id, scheduled_at, status, notes });
//       if (!updatedSurgery) return res.status(404).json({ message: 'Surgery not found' });
//       return res.status(200).json(updatedSurgery);
//     } catch (error) {
//       console.error('Error updating surgery:', error);
//       return res.status(500).json({ message: 'Internal Server Error' });
//     }
//   } else if (req.method === 'DELETE') {
//     try {
//       const success = await deleteSurgery(parsedId);
//       if (!success) return res.status(404).json({ message: 'Surgery not found' });
//       return res.status(200).json({ message: 'Surgery deleted successfully' });
//     } catch (error) {
//       console.error('Error deleting surgery:', error);
//       return res.status(500).json({ message: 'Internal Server Error' });
//     }
//   } else {
//     res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
