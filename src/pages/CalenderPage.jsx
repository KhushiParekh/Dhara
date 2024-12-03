import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal, TextField, Button, Chip } from "@mui/material";
import { NotificationsNone, CalendarToday } from "@mui/icons-material";
import CalenderImg from "../assets/calender.png";


const CalendarApp = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      title: "Safety Inspection",
      start: "2024-12-05",
      end: "2024-12-06",
      type: "Maintenance",
      priority: "high",
    },
    {
      title: "Equipment Maintenance",
      start: "2024-12-10",
      type: "Maintenance",
      priority: "medium",
    },
    {
      title: "Team Meeting",
      start: "2024-12-15",
      end: "2024-12-15",
      type: "Meeting",
      priority: "low",
      completed: true,
    },
    {
      title: "Quarterly Review",
      start: "2024-12-20",
      end: "2024-12-20",
      type: "Meeting",
      priority: "high",
    },
  ]);

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const handleDateClick = (info) => {
    setSelectedEvent({ start: info.dateStr });
    setIsModalOpen(true);
  };

  const handleEventClick = (info) => {
    setSelectedEvent({
      title: info.event.title,
      start: info.event.startStr,
      end: info.event.endStr,
      type: info.event.extendedProps.type,
      priority: info.event.extendedProps.priority,
      completed: info.event.extendedProps.completed,
    });
    setIsModalOpen(true);
  };

  const handleSaveEvent = () => {
    if (selectedEvent?.title) {
      setEvents([...events, selectedEvent]);
    }
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const filteredEvents = events.filter((event) => {
    const today = new Date();
    const eventDate = new Date(event.start);
    return eventDate.getMonth() === currentMonth;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex ">
      {/* Green Glows */}
      <div className="absolute bottom-20 left-60 w-40 h-56 rounded-full bg-green-800 opacity-75 blur-3xl z-10"></div>
      <div className="absolute top-10 right-16 w-40 h-40 rounded-full bg-green-500/80 opacity-81 blur-3xl"></div>

      {/* Sidebar */}
      <div className="flex-1 bg-lime-800/10 p-6 min-h-screen">
        {/* top part */}
        <div className="flex space-x-4 mb-6">
          {/* Left Header Div */}
          <div className="glassmorphic-header pl-3 rounded-lg flex justify-between items-center w-2/3">
            <div className="flex-1  pr-4  w-auto">
              <h1 className="text-3xl text-white font-semibold">
                Mine Manager Calendar
              </h1>
              <h2 className="text-gray-200 mb-3">
                Plan and manage our tasks efficiently.
              </h2>
              <p className="text-gray-400">View Your Notifications here</p>
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{
                  backgroundColor: "#10b981",
                  marginTop: "10px",
                  marginLeft: "5px",
                }}
              >
                View
              </Button>
            </div>
            <img
              src={CalenderImg}
              alt="Mining"
              className="w-[45%] h-auto object-contain"
            />
          </div>
          {/* Right Calendar Preview Div */}
          <div className="glassmorphic-header p-4 rounded-lg w-1/2">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={filteredEvents}
              height="30vh"
              eventContent={(info) => (
                <div
                  className={`event-dot w-2 h-2 rounded-full ${
                    info.event.extendedProps.completed
                      ? "bg-green-500"
                      : `bg-${getPriorityColor(
                          info.event.extendedProps.priority
                        )}-500`
                  }`}
                ></div>
              )}
              dateClick={(info) => {
                // Switch to day view when a date is clicked
                setView("dayGridDay");
                setSelectedDate(info.date);
              }}
            />
          </div>
        </div>

        <div className="glassmorphic-calendar p-4 rounded-lg flex">
          {/* <div className="notifications-container w-1/4 pr-4">
            <div className="flex items-center mb-4">
              <NotificationsNone className="text-white mr-2" />
              <h2 className="text-xl text-white font-semibold">Notifications</h2>
            </div>
            <div className="notifications-list space-y-2">
              <div className="notification p-2 rounded-lg bg-gray-800 text-white flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Owner Update</h3>
                  <p className="text-gray-400">New task assigned: Equipment Inspection</p>
                </div>
                <Button variant="contained" color="primary" size="small" style={{ backgroundColor: "#10b981" }}>
                  View
                </Button>
              </div>
              {/* Add more notifications here */}
          {/* </div>
          </div>  */}

          <div className="calendar-container flex-1">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              editable
              selectable
              date={selectedDate}
              events={filteredEvents}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              height="80vh"
              eventContent={(info) => (
                <div
                  className={`event-item p-2 rounded-lg ${
                    info.event.extendedProps.completed
                      ? "bg-green-500"
                      : `bg-${getPriorityColor(
                          info.event.extendedProps.priority
                        )}-500`
                  }`}
                >
                  <h3 className="text-white font-medium">{info.event.title}</h3>
                  <p className="text-white text-sm">
                    {info.event.extendedProps.type} |{" "}
                    {info.event.extendedProps.completed
                      ? "Completed"
                      : "Pending"}
                  </p>
                </div>
              )}
            />
          </div>
        </div>
       
        {isModalOpen && (
          <Modal open={true} onClose={() => setIsModalOpen(false)}>
            <div className="glassmorphic-modal w-1/3 mx-auto mt-20 p-6 rounded-lg">
              <h2 className="text-lg font-bold text-white mb-4">
                {selectedEvent?.title ? "Edit Event" : "Create Event"}
              </h2>
              <TextField
                label="Event Title"
                className="text-lg font-bold text-white mb-4"
                value={selectedEvent?.title || ""}
                onChange={(e) =>
                  setSelectedEvent({ ...selectedEvent, title: e.target.value })
                }
                fullWidth
                margin="normal"
                className="text-white"
                InputLabelProps={{
                  style: { color: "#9ca3af" },
                }}
              />
              <TextField
                label="Start Date"
                type="date"
                value={selectedEvent?.start || ""}
                onChange={(e) =>
                  setSelectedEvent({ ...selectedEvent, start: e.target.value })
                }
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true, style: { color: "#9ca3af" } }}
              />
              <TextField
                label="End Date"
                type="date"
                value={selectedEvent?.end || ""}
                onChange={(e) =>
                  setSelectedEvent({ ...selectedEvent, end: e.target.value })
                }
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true, style: { color: "#9ca3af" } }}
              />
              <TextField
                label="Time Range"
                type="time"
                value={selectedEvent?.start || ""}
                onChange={(e) =>
                  setSelectedEvent({ ...selectedEvent, start: e.target.value })
                }
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true, style: { color: "#9ca3af" } }}
              />
              <TextField
                label="Event Type"
                value={selectedEvent?.type || ""}
                onChange={(e) =>
                  setSelectedEvent({ ...selectedEvent, type: e.target.value })
                }
                fullWidth
                margin="normal"
                className="text-white"
                InputLabelProps={{
                  style: { color: "#9ca3af" },
                }}
              />
              <TextField
                label="Priority"
                value={selectedEvent?.priority || ""}
                onChange={(e) =>
                  setSelectedEvent({
                    ...selectedEvent,
                    priority: e.target.value,
                  })
                }
                fullWidth
                margin="normal"
                className="text-white"
                InputLabelProps={{
                  style: { color: "#9ca3af" },
                }}
              />
              <div className="flex justify-end space-x-4 mt-4">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveEvent}
                  style={{ backgroundColor: "#10b981" }}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setIsModalOpen(false)}
                  style={{ borderColor: "#6b7280", color: "#6b7280" }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default CalendarApp;
