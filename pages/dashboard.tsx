import PatientLookupCard from "@/components/PatientLookupCard";
import CreatePatientCard from "@/components/CreatePatientCard";
import CalendarCard from "@/components/CalendarCard";

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PatientLookupCard />
        <CreatePatientCard />
        <CalendarCard />  {/* Calendar card for operations */}
      </div>
    </div>
  );
};

export default Dashboard;