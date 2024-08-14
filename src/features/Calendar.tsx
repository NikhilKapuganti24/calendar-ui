
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { commonApi } from '../services/api';

// const MyCalendar = () => {
//     const localizer = momentLocalizer(moment);
  
//   const [events, setAllEvents] = useState([]);
//   const fetchEvents = async () => {
//     try {
//       const response = await commonApi.get('/events/getall');
//       setAllEvents(response.data);
//     } catch (error) {
//       console.error('Failed to fetch students:', error);
//     }
//   };

//   useEffect(() => {
//     fetchEvents()
//   }, []);

//   return (
//     <Calendar
//       localizer={localizer}
//       events={events}
//       startAccessor="start"
//       endAccessor="end"
//       style={{ height: 500 }}
//     />
//   );
// };

// export default MyCalendar;

import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Import your API service if you have a separate API handling file
import { commonApi } from '../services/api'; // Make sure this path is correct
import { useNavigate } from 'react-router-dom';

const MyCalendar = () => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const transformEvents = (events: any[]) => {
    return events.map(event => ({
      id: event._id,
      title: event.description,
      start: new Date(event.startDate),
      end: new Date(event.endDate),
      url:event.redirectUrl,
      allDay: false, // or true if events should be shown as all-day events
    }));
  };

    const handleSelectSlot = (slotInfo:any) => {
      console.log(":sdszas",slotInfo)
      navigate('/eventform', { state: { startDate: slotInfo.start } });
    };
    const handleEventClick = (event:any) => {
      console.log("bhdbhjS",event)
      navigate(`/event/${event.id}/edit`)
    };
  

  const fetchEvents = async () => {
    try {
      const response = await commonApi.get('/events/getall');
      const transformedEvents :any= transformEvents(response.data);
      setEvents(transformedEvents);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch events:', error);
     
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 800}}
      selectable={true}
      onSelectSlot={handleSelectSlot}
      onSelectEvent={handleEventClick}
    />
  );
};

export default MyCalendar;

