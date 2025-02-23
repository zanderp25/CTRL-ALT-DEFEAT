import { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Card } from '../../components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';
import { Button } from '../../components/ui/button';
import patients from './patients.json';
import EditPatient from './EditPatient';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// New Deletion Alert Dialog Component
const DeletionRequestAlertDialog = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            A request has been sent to the server admin for patient deletion. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onClose}>Okay</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default function PatientPage({ patientData }) {
  const router = useRouter();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [data, setPatientData] = useState(patientData);

  // If no patient found
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-red-500">Patient Not Found</h2>
      </div>
    );
  }

  // Handle Save Changes in Edit Modal
  const handleSave = (updatedPatient) => {
    setPatientData(updatedPatient);
    setIsEditOpen(false);
  };

  // Handle Delete Button click
  const handleDelete = () => {
    setIsDeleteOpen(true);
  };

  // Navigate to op.tsx when Start Operation button is clicked
  const handleStartOperation = () => {
    router.push('/patient/op');  // Update the path as per your actual route for op.tsx
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-4xl p-6 flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Profile Picture & Basic Info */}
          <div className="flex flex-col items-center w-full">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/sandra.webp" alt={data.name} />
              <AvatarFallback>{data.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center mt-4">
              <h2 className="text-xl font-semibold">{data.name}</h2>
              <p className="text-gray-500 dark:text-gray-400">Age: {data.age}</p>
              <p className="text-gray-500 dark:text-gray-400">Sex: {data.sex}</p>
              <p className="text-gray-500 dark:text-gray-400">{data.medicalHistory}</p>
            </div>
          </div>

          {/* Right Side - Medications & Stats */}
          <div className="flex flex-col w-full lg:items-center lg:text-center gap-6">
            {/* Medications */}
            <div className="w-full lg:w-1/2">
              <h3 className="text-lg font-semibold">Medications</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300">
                {data.medications.map((med, index) => (
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
                <strong>Temperature:</strong> {data.statistics.temperature}°F
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Blood Pressure:</strong> {data.statistics.bloodPressure}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Blood Glucose:</strong> {data.statistics.bloodGlucose} mg/dL
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-4 justify-center w-full">
          <Button onClick={handleStartOperation}>Start Operation</Button>  {/* This triggers navigation */}
          <Button variant="outline" onClick={() => setIsEditOpen(true)}>Edit</Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Request Sent</AlertDialogTitle>
                <AlertDialogDescription>
                  A request has been sent to the server admin for patient deletion.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>OK</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Back Button */}
        <div className="flex justify-center mt-4 w-full">
          <Button variant="link" onClick={() => router.back()}>← Back</Button>
        </div>

        {/* Edit Patient Modal */}
        <EditPatient 
          patient={data} 
          isOpen={isEditOpen} 
          onClose={() => setIsEditOpen(false)} 
          onSave={handleSave} 
        />
      </Card>
    </div>
  );
}

// Fetch patient data on the server side
export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const patientData = patients.find((p) => p.id === Number(id)) || null;

  return {
    props: {
      patientData,
    },
  };
};
