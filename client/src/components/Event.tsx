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

const Event: FC = () => {
    const [formData, setFormData] = useState({
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
  const [form,setForm] = useState(false);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/event");
      const fetchedEvents = response.data.map((event: any) => ({
        title: event.eventname,
        start: event.startTime,
        end: event.endTime,
        extendedProps: {
          location: event.venue,
          capacity : event.capacity,
          price: event.price,
          repeatEvents:event.repeatEvent
        },
        // color: event.color,
      }));

      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => { 

    fetchEvents();
  }, []);

  const staticEvents = [
    {
      title: "Event 1",
      start: "2024-06-16T10:00:00",
      end: "2024-06-16T12:00:00",
      color: "blue",
    },
  ];

  const handleEventClick = (info: any) => {
    setEventInfo({
      title: info.event.title,
      startStr: info.event.start.toUTCString(),
      endStr: info.event.end ? info.event.end.toUTCString() : "",
      location: info.event.extendedProps.location,
      capacity: info.event.extendedProps.capacity,
      price: info.event.extendedProps.price,
      repeatEvents :  info.event.extendedProps.repeatEvents
    });
    console.log("Event clicked:", info.event);
  };

  const handleDateClick = (info: any) => {
    console.log("Date clicked:", info.date);
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


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post("http://localhost:4000/api/event", formData)
      .then((response) => {
        console.log("Event created:", response.data);
        setEvents([...events, response.data]);
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
        console.error("Error creating event:", error);
      });
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

                   {form && (
                <form onSubmit={handleSubmit}>
                  <label>
                    Event Name:
                    <input
                      type="text"
                      name="eventname"
                      value={formData.eventname}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Venue:
                    <input
                      type="text"
                      name="venue"
                      value={formData.venue}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Start Time:
                    <input
                      type="datetime-local"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    End Time:
                    <input
                      type="datetime-local"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Capacity:
                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Price:
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
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
                onChange={handleInputChange}
              />
              <label className="form-check-label">Daily</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                name="repeatEvent"
                value="weekly"
                // checked={repeatEvent === "Female"}
                onChange={handleInputChange}
              />
              <label className="form-check-label">Weekly</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                name="repeatEvent"
                value="monthly"
                // checked={repeatEvent === "Female"}
                onChange={handleInputChange}
              />
              <label className="form-check-label">Monthly</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                name="repeatEvent"
                value="Weekly"
                // checked={repeatEvent === "Female"}
                onChange={handleInputChange}
              />
              <label className="form-check-label">Weekly</label>
            </div>
          </div>
        </div>
                  <button type="submit">Create Event</button>
                  
                </form>
              )}
      {eventInfo && (
        <div className="event-popup">
          <div className="event-popup-content">
            <h3>{eventInfo.title}</h3>
            <p>Start: {eventInfo.startStr}</p>
            <p>End: {eventInfo.endStr}</p>
            <p>Location:{eventInfo.location}</p>
            <p>Capacity:{eventInfo.capacity}</p>
            <p>Price:{eventInfo.price}</p>
            <p>Repeat Event:{eventInfo.repeatEvents}</p>
            <button onClick={closeEventPopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Event;
