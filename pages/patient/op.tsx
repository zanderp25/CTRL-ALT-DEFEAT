import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@radix-ui/react-accordion';
import { Button } from '@/components/ui/button';

export default function OpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h1 className="text-2xl font-semibold text-center mb-6">Operation Details</h1>
        
        {/* Accordion */}
        <Accordion type="multiple" className="space-y-4">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-medium text-gray-800 dark:text-gray-100">
              Patient Information
            </AccordionTrigger>
            <AccordionContent className="p-4 bg-gray-200 dark:bg-gray-700 rounded">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                This section contains all relevant details about the patient's medical history, medications, and other necessary information for the operation.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-medium text-gray-800 dark:text-gray-100">
              Operation Overview
            </AccordionTrigger>
            <AccordionContent className="p-4 bg-gray-200 dark:bg-gray-700 rounded">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                An in-depth overview of the operation, including steps, procedures, and necessary preparations.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-medium text-gray-800 dark:text-gray-100">
              Post-Operation Care
            </AccordionTrigger>
            <AccordionContent className="p-4 bg-gray-200 dark:bg-gray-700 rounded">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Instructions for post-operation care and necessary follow-up steps for the patient’s recovery.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Button to Navigate Back */}
        <div className="flex justify-center mt-6">
          <Button variant="link" onClick={() => window.history.back()}>
            ← Back to Patient Details
          </Button>
        </div>
      </div>
    </div>
  );
}
