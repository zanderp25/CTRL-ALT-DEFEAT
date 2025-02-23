import { SetStateAction, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/patient.module.css';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';
import { Button } from '../../components/ui/button';
import patients from './patients.json';
import EditPatient from './EditPatient'; // Import the modal component

export default function PatientPage() {
  const router = useRouter();
  const { id } = router.query;

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [patientData, setPatientData] = useState(patients.find((p) => p.id === Number(id)) || null);

  // If no patient found
  if (!patientData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-red-500">Patient Not Found</h2>
      </div>
    );
  }

  // Handle Save Changes in Modal
  const handleSave = (updatedPatient: SetStateAction<{ id: number; name: string; email: string; age: number; sex: string; medicalHistory: string; medications: { name: string; dosage: string; frequency: string; }[]; allergies: { name: string; }[]; statistics: { temperature: number; bloodPressure: string; ECG: string; SPO2: number; respiratoryRate: number; bloodGlucose: number; }; } | null>) => {
    setPatientData(updatedPatient);
    setIsEditOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-4xl p-6 flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left Side - Profile Picture & Basic Info */}
          <div className="flex flex-col items-center w-full">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/sandra.webp" alt={patientData.name} />
              <AvatarFallback>{patientData.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="text-center mt-4">
              <h2 className="text-xl font-semibold">{patientData.name}</h2>
              <p className="text-gray-500 dark:text-gray-400">Age: {patientData.age}</p>
              <p className="text-gray-500 dark:text-gray-400">Sex: {patientData.sex}</p>
              <p className="text-gray-500 dark:text-gray-400">{patientData.medicalHistory}</p>
            </div>
          </div>

          {/* Right Side - Medications & Stats */}
          <div className="flex flex-col w-full lg:items-center lg:text-center gap-6">
            
            {/* Medications */}
            <div className="w-full lg:w-1/2">
              <h3 className="text-lg font-semibold">Medications</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300">
                {patientData.medications.map((med, index) => (
                  <li key={index}>
                    {med.name} - {med.dosage} ({med.frequency})
                  </li>
                ))}
              </ul>
            </div>

            {/* Statistics */}
            <div className="w-full lg:w-1/2">
              <h3 className="text-lg font-semibold">Statistics</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Temperature:</strong> {patientData.statistics.temperature}°F
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Blood Pressure:</strong> {patientData.statistics.bloodPressure}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Blood Glucose:</strong> {patientData.statistics.bloodGlucose} mg/dL
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-4 justify-center w-full">
          <Button onClick={() => alert('Start Operation')}>Start Operation</Button>
          <Button variant="outline" onClick={() => setIsEditOpen(true)}>Edit</Button>
          <Button variant="destructive" onClick={() => alert('Delete')}>Delete</Button>
        </div>

        {/* Back Button */}
        <div className="flex justify-center mt-4 w-full">
          <Button variant="link" onClick={() => router.back()}>← Back</Button>
        </div>

      </Card>

      {/* Edit Patient Modal */}
      <EditPatient 
        patient={patientData} 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        onSave={handleSave} 
      />
    </div>
  );
}
