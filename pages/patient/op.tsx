import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@radix-ui/react-accordion';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function OpPage() {
  const [formData, setFormData] = useState({
    item1: { signatures: ['', ''], checkboxes: [false, false, false] },
    item2: { signatures: ['', ''], checkboxes: [false, false, false] },
    item3: { signatures: ['', ''], checkboxes: [false, false, false] },
  });

  const [activeTab, setActiveTab] = useState("item1");

  const handleSignatureChange = (section: keyof typeof formData, index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        signatures: prev[section].signatures.map((sig, i) => (i === index ? value : sig)),
      },
    }));
  };

  const handleCheckboxChange = (section: keyof typeof formData, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        checkboxes: prev[section].checkboxes.map((checked, i) => (i === index ? !checked : checked)),
      },
    }));
  };

  const isSectionComplete = (section: keyof typeof formData) =>
    formData[section].signatures.every(sig => sig.trim() !== '') &&
    formData[section].checkboxes.every(checked => checked);

  const handleAccordionChange = (value: string) => {
    if (value === "item2" && !isSectionComplete("item1")) return;
    if (value === "item3" && !isSectionComplete("item2")) return;
    setActiveTab(value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h1 className="text-2xl font-semibold text-center mb-6">Operation Details</h1>

        <Accordion type="single" collapsible value={activeTab} onValueChange={handleAccordionChange} className="space-y-4">
          
          {/* Patient Information */}
          <AccordionItem value="item1">
            <div className="flex justify-between items-center">
              <AccordionTrigger className="text-lg font-medium text-gray-800 dark:text-gray-100">
                Pre-Operation
              </AccordionTrigger>
              {activeTab === "item1" && (
                <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                  STOP
                </Button>
              )}
            </div>
            <AccordionContent className="p-4 bg-gray-200 dark:bg-gray-700 rounded">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                This section contains all relevant details about the patient's medical history and related info.
              </p>

              {/* Checkboxes */}
              <div className="flex flex-col space-y-2 mb-4">
              <label>
                  <input 
                    type="checkbox" 
                    checked={formData.item1.checkboxes[0]}
                    onChange={() => handleCheckboxChange("item1", 0)}
                  />
                  Review Patient Info: Elevated Blood Pressure, Fever, Type 2 Diabetic. 
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.item1.checkboxes[1]}
                    onChange={() => handleCheckboxChange("item1", 1)}
                  />
                  Patient Pre-Op Confirmation: Fast for 12-Hours, Stop Naproxen for 3 Days
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.item1.checkboxes[2]}
                    onChange={() => handleCheckboxChange("item1", 2)}
                  />
                  Tool-Count: Swann-Morton #10 Blade, Kelly Hemostatic Forceps, Mayo-Hegar Needle Holder, Lap Sponge
                </label>
              </div>

              {/* E-Signature Fields */}
              <div className="flex justify-end space-x-4 mt-4">
                <input 
                  type="text"
                  placeholder="Signature 1"
                  className="border p-2 rounded w-40"
                  value={formData.item1.signatures[0]}
                  onChange={(e) => handleSignatureChange("item1", 0, e.target.value)}
                />
                <input 
                  type="text"
                  placeholder="Signature 2"
                  className="border p-2 rounded w-40"
                  value={formData.item1.signatures[1]}
                  onChange={(e) => handleSignatureChange("item1", 1, e.target.value)}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Intra Operation  */}
          <AccordionItem value="item2" disabled={!isSectionComplete("item1")}>
            <div className="flex justify-between items-center">
              <AccordionTrigger className="text-lg font-medium text-gray-800 dark:text-gray-100">
                Intra-Operation
              </AccordionTrigger>
              {activeTab === "item2" && (
                <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                  STOP
                </Button>
              )}
            </div>
            <AccordionContent className="p-4 bg-gray-200 dark:bg-gray-700 rounded">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                An overview of the operation, including steps and confirmations.
              </p>

              {/* Checkboxes */}
              <div className="flex flex-col space-y-2 mb-4">
            
              <label>
                  <input 
                    type="checkbox" 
                    checked={formData.item2.checkboxes[0]}
                    onChange={() => handleCheckboxChange("item2", 0)}
                  />
                  Antibiotic Administration: Administer Cefazolin 1g IV prior to incision.
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.item2.checkboxes[1]}
                    onChange={() => handleCheckboxChange("item2", 1)}
                  />
                  Incision Site Confirmation: Confirm transverse incision and incision site based on pre-op imaging and surgical plan
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.item2.checkboxes[2]}
                    onChange={() => handleCheckboxChange("item2", 2)}
                  />
                  Hemostasis:Ensure clamping using Kelly hemostatic clamp is sufficiently placed 
                </label>
              
              </div>

              {/* E-Signature Fields */}
              <div className="flex justify-end space-x-4 mt-4">
                <input 
                  type="text"
                  placeholder="Signature 1"
                  className="border p-2 rounded w-40"
                  value={formData.item2.signatures[0]}
                  onChange={(e) => handleSignatureChange("item2", 0, e.target.value)}
                />
                <input 
                  type="text"
                  placeholder="Signature 2"
                  className="border p-2 rounded w-40"
                  value={formData.item2.signatures[1]}
                  onChange={(e) => handleSignatureChange("item2", 1, e.target.value)}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Post-Operation Care */}
          <AccordionItem value="item3" disabled={!isSectionComplete("item2")}>
            <div className="flex justify-between items-center">
              <AccordionTrigger className="text-lg font-medium text-gray-800 dark:text-gray-100">
                Post-Operation Care
              </AccordionTrigger>
              {activeTab === "item3" && (
                <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                  STOP
                </Button>
              )}
            </div>
            <AccordionContent className="p-4 bg-gray-200 dark:bg-gray-700 rounded">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Instructions for post-operation care and follow-ups.
              </p>

              {/* Checkboxes */}
              <div className="flex flex-col space-y-2 mb-4">
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.item3.checkboxes[0]}
                    onChange={() => handleCheckboxChange("item3", 0)}
                  />
                  Vascular Access Device Removal: Remove vascular access devices ensuring no bleeding or air embolism(s)
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.item3.checkboxes[1]}
                    onChange={() => handleCheckboxChange("item3", 1)}
                  />
                  Staples/Sutures Check:Confirm sutures or staples are sufficient for healing
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.item3.checkboxes[2]}
                    onChange={() => handleCheckboxChange("item3", 2)}
                  />
                  Tool-Count:Swann-Morton #10 Blade, Kelly Hemostatic Forceps, Mayo-Hegar Needle Holder, Lap Sponge
                </label>
              </div>
              {/* E-Signature Fields */}
              <div className="flex justify-end space-x-4 mt-4">
                <input 
                  type="text"
                  placeholder="Signature 1"
                  className="border p-2 rounded w-40"
                  value={formData.item3.signatures[0]}
                  onChange={(e) => handleSignatureChange("item3", 0, e.target.value)}
                />
                <input 
                  type="text"
                  placeholder="Signature 2"
                  className="border p-2 rounded w-40"
                  value={formData.item3.signatures[1]}
                  onChange={(e) => handleSignatureChange("item3", 1, e.target.value)}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {isSectionComplete("item3") && (
            <a className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded block" href="/dashboard">
            Continue
            </a>
        )}
      </div>
    </div>
  );
}
