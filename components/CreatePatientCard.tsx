import { useState } from "react";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CreatePatientCard = () => {
  const [isFormActive, setIsFormActive] = useState(false); // State to control form visibility
  const [patientData, setPatientData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    sex: "",
    height: "",
    weight: "",
  });
  const router = useRouter();

  // Function to handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Here you would typically send this data to your backend and get a generated ID
    const newPatientId = Math.random().toString(36).substr(2, 9); // Random ID for example
    // Redirect to the new patient's page
    router.push(`/patient/${newPatientId}`);
    setIsFormActive(false); // Close the form after submission
  };

  return (
    <div className="relative">
      {/* Card that triggers the form */}
      {!isFormActive && (
        <Card
          className="p-6 shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-200"
          onClick={() => setIsFormActive(true)} // Activate form on click
        >
          <CardHeader>
            <CardTitle>Create Patient</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-32">
            <p className="text-gray-600 text-center">Click to enroll a new patient</p>
          </CardContent>
        </Card>
      )}

      {/* Fullscreen Enrollment Form */}
      {isFormActive && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-4">
          <h2 className="text-2xl font-bold mb-4">Enroll New Patient</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full md:w-1/2 lg:w-1/3">
            <Input
              placeholder="First Name"
              name="firstName"
              value={patientData.firstName}
              onChange={handleInputChange}
              required
            />
            <Input
              placeholder="Last Name"
              name="lastName"
              value={patientData.lastName}
              onChange={handleInputChange}
              required
            />
            <Input
              type="date"
              name="dateOfBirth"
              value={patientData.dateOfBirth}
              onChange={handleInputChange}
              required
            />
            <select
              name="sex"
              value={patientData.sex}
              onChange={handleInputChange}
              className="p-2 border rounded"
              required
            >
              <option value="" disabled>Select Sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <Input
              type="number"
              placeholder="Height (cm)"
              name="height"
              value={patientData.height}
              onChange={handleInputChange}
              required
            />
            <Input
              type="number"
              placeholder="Weight (kg)"
              name="weight"
              value={patientData.weight}
              onChange={handleInputChange}
              required
            />
            <Button type="submit">Submit</Button>
          </form>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setIsFormActive(false)} // Close the form
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreatePatientCard;
