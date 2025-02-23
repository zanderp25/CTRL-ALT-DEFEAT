// components/DeletePatient.tsx
import { Button } from '../ui/button';

const DeletePatient = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Do not render the modal if it's not open

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Patient Deletion Request</h2>
        <p className="text-gray-600">A request has been sent to the server admin for patient deletion.</p>
        <div className="flex justify-center mt-4">
          <Button onClick={onClose}>Okay</Button>
        </div>
      </div>
    </div>
  );
};

export default DeletePatient;
