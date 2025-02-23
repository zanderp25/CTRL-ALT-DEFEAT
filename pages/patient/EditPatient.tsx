import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EditPatient({ patient, isOpen, onClose, onSave }) {
  const [editedPatient, setEditedPatient] = useState({ ...patient });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPatient((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Patient Information</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div>
            <Label>Name</Label>
            <Input name="name" value={editedPatient.name} onChange={handleChange} />
          </div>
          <div>
            <Label>Age</Label>
            <Input name="age" type="number" value={editedPatient.age} onChange={handleChange} />
          </div>
          <div>
            <Label>Sex</Label>
            <Input name="sex" value={editedPatient.sex} onChange={handleChange} />
          </div>
          <div>
            <Label>Medical History</Label>
            <Input name="medicalHistory" value={editedPatient.medicalHistory} onChange={handleChange} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSave(editedPatient)}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
