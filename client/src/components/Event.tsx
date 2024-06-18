// import React,{FC} from "react";
// import Sidebar from "./Sidebar";
// // import "@fullcalendar/core/main.css";
// // import "@fullcalendar/daygrid/main.css";
// // import "@fullcalendar/timegrid/main.css";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";

// const Event:React.FC = () =>{
//     return(
//         <div className="container-fluid">
//         <div className="row flex-nowrap">
//           <Sidebar/>
//             <div className="col py-3">
             
        
//         <div className="container">
//         <div className="App">
//       <FullCalendar

    
//         themeSystem="Simplex"
//         plugins={[dayGridPlugin]}

//       />
//       <FullCalendar

//         // themeSystem="Simplex"
//         // header={{
//         //   left: "prev,next",
//         //   center: "title",
//         //   right: "dayGridMonth,timeGridWeek,timeGridDay",
//         // }}
//         plugins={[dayGridPlugin]}

//         eventColor={"#" + Math.floor(Math.random() * 16777215).toString(16)}
//       />
//     </div>
//         </div>
//     </div>
//     </div>
//     </div>
//     )
// }

// export default Event

import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import Sidebar from "./Sidebar";
import Modal from "./Modal"; // Import the Modal component

interface FormData {
  eventname: string;
  startTime: string;
  endTime: string;
  venue: string;
  capacity: number;
  price: number;
  repeatEvent: string;
}

const Event: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    eventname: "",
    startTime: "",
    endTime: "",
    venue: "",
    capacity: 0,
    price: 0,
    repeatEvent: "none",
  });

  const [events, setEvents] = useState<any[]>([]);
  const [eventInfo, setEventInfo] = useState<any>(null);
  const [form, setForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [updateFormData, setUpdateFormData] = useState<any>({});

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/event");
      const fetchedEvents = response.data.map((event: any) => ({
        id: event.eventId,
        title: event.eventname,
        start: event.startTime,
        end: event.endTime,
        extendedProps: {
          location: event.venue,
          capacity: event.capacity,
          price: event.price,
          repeatEvents: event.repeatEvent,
        },
      }));
      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEventClick = (info: any) => {
    setEventInfo({
      id: info.event.id,
      title: info.event.title,
      startStr: info.event.start.toString(),
      endStr: info.event.end ? info.event.end.toString() : "",
      location: info.event.extendedProps.location,
      capacity: info.event.extendedProps.capacity,
      price: info.event.extendedProps.price,
      repeatEvents: info.event.extendedProps.repeatEvents,
    });

    setUpdateFormData({
      eventname: info.event.title,
      startTime: info.event.start.toString().slice(0, 16),
      endTime: info.event.end ? info.event.end.toString().slice(0, 16) : "",
      venue: info.event.extendedProps.location,
      capacity: info.event.extendedProps.capacity,
      price: info.event.extendedProps.price,
      repeatEvent: info.event.extendedProps.repeatEvents,
    });

    
  };

  const handleDateClick = (info: any) => {
    setFormData({ ...formData, startTime: info.dateStr });
    setForm(true);
  };

  const closeEventPopup = () => {
    setEventInfo(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const createEvents = () => {
      const events = [];

      const startDate = new Date(formData.startTime);
      const endDate = new Date(formData.endTime);

      if (formData.repeatEvent === "daily") {
        const diffDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

        for (let i = 0; i <= diffDays; i++) {
          const eventStartTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
          const eventEndTime = new Date(eventStartTime.getTime() + (endDate.getTime() - startDate.getTime()));
    

          events.push({
            eventname: formData.eventname,
            startTime: eventStartTime.toISOString(),
            endTime: eventEndTime.toISOString(),
            venue: formData.venue,
            capacity: formData.capacity,
            price: formData.price,
            repeatEvent: formData.repeatEvent,
          });
        }
      } else if (formData.repeatEvent === "weekly") {
        const diffWeeks = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7)) + 1;

        for (let i = 0; i <= diffWeeks; i++) {
             const eventStartTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i * 7);
      const eventEndTime = new Date(eventStartTime.getTime() + (endDate.getTime() - startDate.getTime()));

          events.push({
            eventname: formData.eventname,
            startTime: eventStartTime.toISOString(),
            endTime: eventEndTime.toISOString(),
            venue: formData.venue,
            capacity: formData.capacity,
            price: formData.price,
            repeatEvent: formData.repeatEvent,
          });
        }
      } else if (formData.repeatEvent === "monthly") {
        const diffMonths = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30.5)) + 1;

        for (let i = 0; i <= diffMonths; i++) {
          const eventStartTime = new Date(startDate.getFullYear(), startDate.getMonth() + i, startDate.getDate());
          const eventEndTime = new Date(eventStartTime.getTime() + (endDate.getTime() - startDate.getTime()));
    
          events.push({
            eventname: formData.eventname,
            startTime: eventStartTime.toISOString(),
            endTime: eventEndTime.toISOString(),
            venue: formData.venue,
            capacity: formData.capacity,
            price: formData.price,
            repeatEvent: formData.repeatEvent,
          });
        }
      } else if (formData.repeatEvent === "yearly") {
        const diffYears = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365)) + 1;

        for (let i = 0; i < diffYears; i++) {
          const eventStartTime = new Date(startDate.getFullYear() + i, startDate.getMonth(), startDate.getDate());
          const eventEndTime = new Date(eventStartTime.getTime() + (endDate.getTime() - startDate.getTime()));

          events.push({
            eventname: formData.eventname,
            startTime: eventStartTime.toISOString(),
            endTime: eventEndTime.toISOString(),
            venue: formData.venue,
            capacity: formData.capacity,
            price: formData.price,
            repeatEvent: formData.repeatEvent,
          });
        }
      } else {
        events.push(formData);
      }

      return events;
    };

    const eventsToCreate = createEvents();

    Promise.all(
      eventsToCreate.map((eventData) =>
        axios.post("http://localhost:4000/api/event", eventData)
      )
    )
      .then((responses) => {
        const newEvents = responses.map((response) => response.data);
        setEvents([...events, ...newEvents]);
        setFormData({
          eventname: "",
          startTime: "",
          endTime: "",
          venue: "",
          capacity: 0,
          price: 0,
          repeatEvent: "none",
        });
        setForm(false);
      })
      .catch((error) => {
        console.error("Error creating events:", error);
      });
  };


  const handleUpdateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .patch(`http://localhost:4000/api/event/${eventInfo.id}`, updateFormData)
      .then((response) => {
        setEvents(events.map((ev) => (ev.id === response.data.id ? response.data : ev)));
        setUpdateForm(false);
        setEventInfo(null);
      })
      .catch((error) => {
        console.error("Error updating event:", error);
      });
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/api/event/${eventInfo.id}`);
      setEvents(events.filter((event) => event.id !== id));
      setEventInfo(null);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        <div className="col py-3">
          <div className="container">
            <div className="App">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={[...events]}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                }}
                dayMaxEventRows={3}
                dayMaxEvents={true}
                moreLinkClick="popover"
                dayPopoverFormat={{ weekday: "long", month: "short", day: "numeric", year: "numeric" }}
                editable={true}
                eventClick={handleEventClick}
                dateClick={handleDateClick}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal show={form} onClose={() => setForm(false)}>
  <div className="container">
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="eventName" className="form-label">Event Name:</label>
        <input
          type="text"
          className="form-control"
          id="eventName"
          name="eventname"
          value={formData.eventname}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="venue" className="form-label">Venue:</label>
        <input
          type="text"
          className="form-control"
          id="venue"
          name="venue"
          value={formData.venue}
          onChange={handleInputChange}
        />
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="startTime" className="form-label">Start Time:</label>
          <input
            type="datetime-local"
            className="form-control"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
          />
        </div>
        <div className="col">
          <label htmlFor="endTime" className="form-label">End Time:</label>
          <input
            type="datetime-local"
            className="form-control"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="capacity" className="form-label">Capacity:</label>
          <input
            type="number"
            className="form-control"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
          />
        </div>
        <div className="col">
          <label htmlFor="price" className="form-label">Price:</label>
          <input
            type="text"
            className="form-control"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Repeated Events:</label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="daily"
            name="repeatEvent"
            value="daily"
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="daily">Daily</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="weekly"
            name="repeatEvent"
            value="weekly"
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="weekly">Weekly</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="monthly"
            name="repeatEvent"
            value="monthly"
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="monthly">Monthly</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="yearly"
            name="repeatEvent"
            value="yearly"
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="yearly">Yearly</label>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Create Event</button>
    </form>
  </div>
</Modal>


{eventInfo && (
  <div className="modal fade show" style={{ display: 'block' }}>
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{eventInfo.title}</h5>
          <button type="button" className="btn-close" aria-label="Close" onClick={closeEventPopup}></button>
        </div>
        <div className="modal-body">
          <p>Start: {eventInfo.startStr}</p>
          <p>End: {eventInfo.endStr}</p>
          <p>Location: {eventInfo.location}</p>
          <p>Capacity: {eventInfo.capacity}</p>
          <p>Price: {eventInfo.price}</p>
          <p>Repeat Event: {eventInfo.repeatEvents}</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={() =>{setUpdateForm(true); setEventInfo(null);}}>Update</button>
          <button type="button" className="btn btn-danger" onClick={() => handleDelete(eventInfo.id)}>Delete</button>
          <button type="button" className="btn btn-secondary" onClick={closeEventPopup}>Close</button>
        </div>
      </div>
    </div>
  </div>
)}
      {updateForm && (
        <Modal show={true} onClose={() => setUpdateForm(false)}>
            <form onSubmit={handleUpdateSubmit}>
          <label>
            Event Name:
            <input
              type="text"
              name="eventname"
              value={updateFormData.eventname || (eventInfo ? eventInfo.title : '')}
              onChange={handleUpdateInputChange}
            />
          </label>
          <label>
            Venue:
            <input
              type="text"
              name="venue"
              value={updateFormData.venue || (eventInfo ? eventInfo.location : '')}
              onChange={handleUpdateInputChange}
            />
          </label>
          <label>
            Start Time:
            <input
              type="datetime-local"
              name="startTime"
              value={updateFormData.startTime || (eventInfo ? eventInfo.startStr : '')}
              onChange={handleUpdateInputChange}
            />
          </label>
          <label>
            End Time:
            <input
              type="datetime-local"
              name="endTime"
              value={updateFormData.endTime || (eventInfo ? eventInfo.endStr : '')}
              onChange={handleUpdateInputChange}
            />
          </label>
          <label>
            Capacity:
            <input
              type="number"
              name="capacity"
              value={updateFormData.capacity || (eventInfo ? eventInfo.capacity : '')}
              onChange={handleUpdateInputChange}
            />
          </label>
          <label>
            Price:
            <input
              type="text"
              name="price"
              value={updateFormData.price || (eventInfo ? eventInfo.price : '')}
              onChange={handleUpdateInputChange}
            />
          </label>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Repeated Events:</label>
            <div className="col-sm-10">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="repeatEvent"
                  value="daily"
                  onChange={handleUpdateInputChange}
                />
                <label className="form-check-label">Daily</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="repeatEvent"
                  value="weekly"
                  onChange={handleUpdateInputChange}
                />
                <label className="form-check-label">Weekly</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="repeatEvent"
                  value="monthly"
                  onChange={handleUpdateInputChange}
                />
                <label className="form-check-label">Monthly</label>
              </div>
            </div>
          </div>
          <button type="submit">Update Event</button>
        </form>
        </Modal>
      )}
    </div>
  );
};

export default Event;

