import { useState } from "react";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PatientLookupCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients] = useState([
    { id: "1", name: "Sandra Smith" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Michael Johnson" },
  ]);
  const [isSearchActive, setIsSearchActive] = useState(false); // State to control search visibility
  const router = useRouter();

  // Function to navigate to the patient's page when their name is clicked
  const handleSelectPatient = (id: string) => {
    router.push(`/patient/${id}`);
    setIsSearchActive(false); // Close the search after selecting a patient
  };

  return (
    <div className="relative">
      {/* Card that triggers the search */}
      {!isSearchActive && (
        <Card
          className="p-6 shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-200"
          onClick={() => setIsSearchActive(true)} // Activate search on click
        >
          <CardHeader>
            <CardTitle>Patient Lookup</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-32">
            <p className="text-gray-600 text-center">Click to search for patients</p>
          </CardContent>
        </Card>
      )}

      {/* Fullscreen Search Overlay */}
      {isSearchActive && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-4">
          <Input
            placeholder="Type patient's name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 w-full md:w-1/2 lg:w-1/3 text-lg"
            autoFocus
          />
          <div className="space-y-2 w-full md:w-1/2 lg:w-1/3">
            {patients
              .filter((patient) =>
                patient.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((patient) => (
                <Button
                  key={patient.id}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleSelectPatient(patient.id)}
                >
                  {patient.name}
                </Button>
              ))}
          </div>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setIsSearchActive(false)} // Close the search
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
};

export default PatientLookupCard;
