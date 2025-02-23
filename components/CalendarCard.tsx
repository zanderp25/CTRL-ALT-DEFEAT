import { useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Calendar,
  momentLocalizer,
  Event,
} from "react-big-calendar"; // Import necessary components
import moment from 'moment'; // Import moment

import "react-big-calendar/lib/css/react-big-calendar.css"; // Import styles

const localizer = momentLocalizer(moment); // Set up localizer with moment

const CalendarCard = () => {
  const [isCalendarActive, setIsCalendarActive] = useState(false);
  const [date, setDate] = useState(new Date());
  const router = useRouter();

  interface OperationEvent extends Event {
    id: string;
    surgeon: string;
  }

  // SAMPLE STATICDATA 
  const operationsData: OperationEvent[] = [
    {
      id: "1",
      title: "Appendectomy",
      start: new Date("2025-02-26T09:00:00"),
      end: new Date("2025-02-26T10:00:00"),
      surgeon: "Dr. Smith",
    },
    {
      id: "2",
      title: "Knee Replacement",
      start: new Date("2025-02-25T13:00:00"),
      end: new Date("2025-02-25T14:00:00"),
      surgeon: "Dr. Jones",
    },
    {
      id: "3",
      title: "Vasectomy",
      start: new Date("2025-02-24T11:00:00"),
      end: new Date("2025-02-24T12:00:00"),
      surgeon: "Dr. Brown",
    },
  ];

  // Function to navigate to the operation details page
  const handleEventSelect = (event: OperationEvent) => {
    router.push(`/patient/${event.id}`); // Navigate to operation details
  };

  return (
    <div className="relative">
      {!isCalendarActive && (
        <Card
          className="p-6 shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-200"
          onClick={() => setIsCalendarActive(true)} // Activate calendar on click
        >
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center">Calendar</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-60">
            <p className="text-gray-600 text-center">Click to view surgeon's operations</p>
          </CardContent>
        </Card>
      )}

      {isCalendarActive && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-4">
          <h2 className="text-2xl font-bold mb-4">Surgeon's Operations</h2>
          <Calendar
            localizer={localizer}
            events={operationsData}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "90vh", width: "100%" }} // Set height and width
            onSelectEvent={handleEventSelect} // Handle event selection
            defaultView="month" // Default to month view
            views={["month", "week", "day"]} // Available views
            eventPropGetter={(event) => ({
              style: { backgroundColor: "lightblue", border: "none" }, // Style events
            })}
            popup // Enable event popups
            dayPropGetter={(date) => ({
              style: { backgroundColor: date.getDay() === 0 ? "#f9f9f9" : "white" }, // Highlight Sundays
            })}
            // Add these props to set Sunday as the first day of the week
            min={new Date(0, 0, 0, 0, 0, 0)} // Start of the day
            max={new Date(0, 0, 0, 23, 59, 59)} // End of the day
            step={30} // 30-minute increments
            timeslots={2} // Two 30-minute slots per hour
            defaultDate={new Date()} // Set default date to today
            onNavigate={(date) => setDate(date)} // Handle date navigation
          />

          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setIsCalendarActive(false)} // Close the calendar
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
};

export default CalendarCard;