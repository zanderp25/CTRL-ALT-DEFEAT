// pages/api/patients/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getPatientById, deletePatient, Patient } from '../../../services/patientService';
import { adminOnly, AuthenticatedRequest } from '../../../lib/utils';

async function handler(req: AuthenticatedRequest, res: NextApiResponse<Patient | { message: string }>) {
  const { id } = req.query;
  const parsedId = Number(id);
  if (isNaN(parsedId)) {
    return res.status(400).json({ message: 'Invalid id' });
  }

  if (req.method === 'DELETE') {
    try {
      const success = await deletePatient(parsedId);
      if (!success) return res.status(404).json({ message: 'Patient not found' });
      return res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
      console.error('Error deleting patient:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default adminOnly(handler);
