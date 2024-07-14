import React, { useEffect, useState } from 'react';

import { commonApi } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';

const Events= () => {
  const [events, setAllEvents] = useState([]);

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const fetchEvents = async () => {
    try {
      const response = await commonApi.get('/events/getall');
      setAllEvents(response.data);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };



    const fetchToken = async () => {
     
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('access_token');


        let bb=localStorage.getItem('token');
        if (accessToken) {
          localStorage.setItem('token', accessToken);
          window.history.replaceState({}, document.title, "/eventform");
        }  else if(bb){
          console.log("Ddjjj")
        }
        else {
          navigate('/login'); // Redirect to login if token is not found
        }
      } catch (error) {
        console.error('Error fetching access token:', error);
        navigate('/login'); // Redirect to login on error
      }
    };
  useEffect(() => {
    fetchToken()
    fetchEvents();
  }, []);

  const onEdit = (eventId: any) => {
    navigate(`/event/${eventId}/edit`);
  };
  const onDelete = async (eventId: any) => {
    try {
      const response = await commonApi.delete(`event/${eventId}/delete`);
      fetchEvents()
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };
  const onAdd = () => {
    navigate(`/eventform`);
  };

  return (
    <div className='p-8'>
      <div className='d-flex justify-content-between align-items-center'>
        <div className='flex justify-between'>
          <h1 className='mt-1'>Events List</h1>
          <button className='btnprimary' onClick={onAdd}> Add</button>
      
        </div>
       
      </div>
      <div className='card p-3'>
      <Table
        data={events}
        columns={[
          { key: 'eventId', label: 'Event Id' },
          { key: 'summary', label: 'Summary' },
        ]}
        itemsPerPage={15}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      </div>
    
    </div>
  );
};

export default Events;