import React,{FC} from "react";
import Sidebar from "./Sidebar";
// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Event:React.FC = () =>{
    return(
        <div className="container-fluid">
        <div className="row flex-nowrap">
          <Sidebar/>
            <div className="col py-3">
             
        
        <div className="container">
        <div className="App">
      <FullCalendar

    
        themeSystem="Simplex"
        plugins={[dayGridPlugin]}

      />
      <FullCalendar

        // themeSystem="Simplex"
        // header={{
        //   left: "prev,next",
        //   center: "title",
        //   right: "dayGridMonth,timeGridWeek,timeGridDay",
        // }}
        plugins={[dayGridPlugin]}

        eventColor={"#" + Math.floor(Math.random() * 16777215).toString(16)}
      />
    </div>
        </div>
    </div>
    </div>
    </div>
    )
}

export default Event