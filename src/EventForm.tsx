// // import React from 'react'
// // import { useFieldArray, useForm } from 'react-hook-form';


// // interface Event {
// //     event: string;
// //     summary: string;
// //     fromDate: Date;
// //     toDate: Date;
// //     description:string;
// //     emails: { address: string }[];
// //   }


// // const EventForm = () => {

// // function onSubmit(data: any) {

// //   console.log("Form Data:", data);

// // }

// //   const { register,control, handleSubmit, formState: { errors } } = useForm<Event>();
// //   const { fields, append, remove } = useFieldArray({
// //     control,
// //     name: "emails"
// //   });
// //   return (
// //     <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
// //     <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
// //       <h2 className="text-center text-3xl font-extrabold text-gray-900">Create Event</h2>
// //       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
// //         <div className="flex flex-col">
// //           <label className="text-sm font-medium text-gray-700">Name of event</label>
// //           <input
// //             type="text"
// //             {...register('event', { required: 'Event name is required' })}
// //             className={`inputboxstyling sm:text-sm ${errors.event ? 'border-red-500' : ''}`}
// //           />
// //           {errors.event && <div className="text-red-500 text-sm mt-1">{errors.event.message}</div>}
// //         </div>

// //         <div className="flex flex-col">
// //           <label className="text-sm font-medium text-gray-700">Description</label>
// //           <input
// //             type="text"
// //             {...register('description', { required: 'Description is required' })}
// //             className={`inputboxstyling sm:text-sm ${errors.description ? 'border-red-500' : ''}`}
// //           />
// //           {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description.message}</div>}
// //         </div>
// //         <div className="flex flex-col">
// //           <label className="text-sm font-medium text-gray-700">Summary</label>
// //           <input
// //             type="text"
// //             {...register('summary', { required: 'Summary is required' })}
// //             className={`inputboxstyling sm:text-sm ${errors.summary ? 'border-red-500' : ''}`}
// //           />
// //           {errors.summary && <div className="text-red-500 text-sm mt-1">{errors.summary.message}</div>}
// //         </div>

// //         <div className="flex flex-col">
// //           <label className="text-sm font-medium text-gray-700">From Date</label>
// //           <input
// //             type="date"
// //             {...register('fromDate', { required: 'From date is required' })}
// //             className={`inputboxstyling sm:text-sm ${errors.fromDate ? 'border-red-500' : ''}`}
// //           />
// //           {errors.fromDate && <div className="text-red-500 text-sm mt-1">{errors.fromDate.message}</div>}
// //         </div>

// //         <div className="flex flex-col">
// //           <label className="text-sm font-medium text-gray-700">To Date</label>
// //           <input
// //             type="date"
// //             {...register('toDate', { required: 'To date is required' })}
// //             className={`inputboxstyling sm:text-sm ${errors.toDate ? 'border-red-500' : ''}`}
// //           />
// //           {errors.toDate && <div className="text-red-500 text-sm mt-1">{errors.toDate.message}</div>}
// //         </div>
// //         <div className="flex flex-col space-y-4">
// //             <label className="text-sm font-medium text-gray-700">Emails</label>
// //             {fields.map((field, index) => (
// //               <div key={field.id} className="flex items-center">
// //                 <input
// //                   type="email"
// //                   {...register(`emails.${index}.address` as const, { required: 'Email is required' })}
// //                   className={`inputboxstyling sm:text-sm ${errors.emails?.[index]?.address ? 'border-red-500' : ''}`}
// //                 />
// //                 <button type="button" onClick={() => remove(index)} className="ml-2 text-red-500">Remove</button>
// //                 {errors.emails?.[index]?.address && <div className="text-red-500 text-sm mt-1">{errors.emails[index].address.message}</div>}
// //               </div>
// //             ))}
// //             <button type="button" onClick={() => append({ address: '' })} className="btnsecondary">Add Email</button>
// //           </div>

// //         <button
// //           type="submit"
// //           className="w-full flex justify-center  font-medium text-white btnprimary"
// //         >
// //           Create Event
// //         </button>
// //       </form>
// //     </div>
// //   </div>
// //   )
// // }

// // export default EventForm




// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useForm, useFieldArray, FieldErrors } from 'react-hook-form';
// import { useNavigate, useParams } from 'react-router-dom';
// import { commonApi } from './services/api';

// interface Email {
//   address: string;
// }

// interface Event {
//   event: string;
//   summary: string;
//   fromDate: Date;
//   toDate: Date;
//   description: string;
//   emails: Email[];
//   redirectUrl: string;
//   recurrence: string
// }

// const EventForm = () => {
//   const { register, control, handleSubmit, formState: { errors },setValue } = useForm<Event>({
//     defaultValues: {
//       emails: [{ address: '' }] // Initialize with at least one email field
//     }
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "emails"
//   });

// const [events,setEvents]=useState([]);
// const [action, setAction]: any = useState(false);
//   const { eventId } = useParams();
//   const navigate = useNavigate();

//   const getSingleEventDetails = async (id: any) => {
//     try {
//       const response = await commonApi.get(`/event/${id}/get`);
//       console.log("ghbn", response)

//       const formattedData = {
//         ...response.data,
       
//       };

//       setEvents(formattedData)
//     } catch (error: any) {
//       alert('Registration failed: ' + error.message);
//     }
//   };

//   // useEffect(() => {

//   //   console.log("sss", eventId)
//   //   if (eventId) {
//   //     setAction(true)
//   //     getSingleEventDetails(eventId)
//   //   }
//   //   if (events) {

//   //     Object.entries(events).forEach(([key, value]) => {
//   //       setValue(key as keyof Event, value);
//   //     });
//   //   }
//   // }, [])


//   useEffect(()=>{

//         console.log("sss", eventId)
//     if (eventId) {
//       setAction(true)
//       getSingleEventDetails(eventId)
//     }
//     if (events) {

//       Object.entries(events).forEach(([key, value]) => {
//         setValue(key as keyof Event, value);
//       });
//     }
//     const fetchToken = async () => {
//       debugger
//       try {
//         const urlParams = new URLSearchParams(window.location.search);
//         const accessToken = urlParams.get('access_token');


//         let bb=localStorage.getItem('token');
//         if (accessToken) {
//           localStorage.setItem('token', accessToken);
//           window.history.replaceState({}, document.title, "/eventform");
//         }  else if(bb){
//           console.log("Ddjjj")
//         }
//         else {
//           navigate('/login'); // Redirect to login if token is not found
//         }
//       } catch (error) {
//         console.error('Error fetching access token:', error);
//         navigate('/login'); // Redirect to login on error
//       }
//     };

//     fetchToken();
//   }, []);

//   const onSubmit = async (data: Event) => {
//     let userId='66730c65cead5761ea0f4fd2'
//       console.log("Form Data:", data);
    
//     await commonApi.post(`http://localhost:4010/create/event`,data)
    
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
//         <h2 className="text-center text-3xl font-extrabold text-gray-900">Create Event</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">Name of event</label>
//             <input
//               type="text"
//               {...register('event', { required: 'Event name is required' })}
//               className={`inputboxstyling sm:text-sm ${errors.event ? 'border-red-500' : ''}`}
//             />
//             {errors.event && <div className="text-red-500 text-sm mt-1">{errors.event.message}</div>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">Description</label>
//             <input
//               type="text"
//               {...register('description', { required: 'Description is required' })}
//               className={`inputboxstyling sm:text-sm ${errors.description ? 'border-red-500' : ''}`}
//             />
//             {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description.message}</div>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">Summary</label>
//             <input
//               type="text"
//               {...register('summary', { required: 'Summary is required' })}
//               className={`inputboxstyling sm:text-sm ${errors.summary ? 'border-red-500' : ''}`}
//             />
//             {errors.summary && <div className="text-red-500 text-sm mt-1">{errors.summary.message}</div>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">From Date</label>
//             <input
//               type="datetime-local"
//               {...register('fromDate', { required: 'From date is required' })}
//               className={`inputboxstyling sm:text-sm ${errors.fromDate ? 'border-red-500' : ''}`}
//             />
//             {errors.fromDate && <div className="text-red-500 text-sm mt-1">{errors.fromDate.message}</div>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">To Date</label>
//             <input
//               type="datetime-local"
//               {...register('toDate', { required: 'To date is required' })}
//               className={`inputboxstyling sm:text-sm ${errors.toDate ? 'border-red-500' : ''}`}
//             />
//             {errors.toDate && <div className="text-red-500 text-sm mt-1">{errors.toDate.message}</div>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">Redirect Url</label>
//             <input
//               type="text"
//               {...register('redirectUrl', { required: 'Redirect is required' })}
//               className={`inputboxstyling sm:text-sm ${errors.redirectUrl ? 'border-red-500' : ''}`}
//             />
//             {errors.redirectUrl && <div className="text-red-500 text-sm mt-1">{errors.redirectUrl.message}</div>}
//           </div>
//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">Meeting Recurrence</label>
//             <select {...register('recurrence', { required: 'Recurrence is required' })}
//               className={`inputboxstyling sm:text-sm ${errors.redirectUrl ? 'border-red-500' : ''}`}>
//               <option value="not-repeat">Not Repeat</option>
//               <option value="weekly">Weekly</option>
//               <option value="bi-weekly">Bi-Weekly</option>
//               <option value="monthly">Monthly</option>
//               <option value="yearly">Yearly</option>
//             </select>
//             {errors.recurrence && <div className="text-red-500 text-sm mt-1">{errors.recurrence.message}</div>}
//           </div>

//           <div className="flex flex-col space-y-4">
//             <label className="text-sm font-medium text-gray-700">Emails</label>
//             {fields.map((field, index) => (
//               <div key={field.id} className="flex items-center">
//                 <input
//                   type="email"
//                   {...register(`emails.${index}.address` as const, { required: 'Email is required' })}
//                   className={`inputboxstyling sm:text-sm ${errors.emails?.[index]?.address ? 'border-red-500' : ''}`}
//                 />
//                 <button type="button" onClick={() => remove(index)} className="ml-2 text-red-500">Remove</button>
//                 {errors.emails?.[index]?.address && <div className="text-red-500 text-sm mt-1">{errors.emails[index]?.address?.message}</div>}
//               </div>
//             ))}
//             <button type="button" onClick={() => append({ address: '' })} className="btnsecondary">Add Email</button>
//           </div>

//           <button
//             type="submit"
//             className="w-full flex justify-center font-medium text-white btnprimary"
//           >
//             Create Event
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default EventForm;

// import React, { useEffect, useState } from 'react';
// import { useForm, useFieldArray } from 'react-hook-form';
// import { useNavigate, useParams } from 'react-router-dom';
// import { commonApi } from './services/api';

// interface Email {
//   address: string;
// }

// interface Event {
//   name: string;
//   summary: string;
//   startDate: Date;
//   endDate: Date;
//   description: string;
//   emails: Email[];
//   redirectUrl: string;
//   recurrence: string;
// }

// const EventForm = () => {
//   const { register, control, handleSubmit, formState: { errors }, setValue } = useForm<Event>({
//     defaultValues: {
//       emails: [{ address: '' }] // Initialize with at least one email field
//     }
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "emails"
//   });

//   const [events, setEvents] = useState<Event | null>(null);
//   const [action, setAction] = useState(false);
//   const { eventId } = useParams();
//   const navigate = useNavigate();

//   const getSingleEventDetails = async (id: any) => {
//     try {
//       const response = await commonApi.get(`/event/${id}/get`);
//       const formattedData = {
//         ...response.data,
//       };

//       setEvents(formattedData);
//       Object.keys(formattedData).forEach((key) => {
//         setValue(key as keyof Event, formattedData[key as keyof Event]);
//       });
//     } catch (error: any) {
//       console.error('Failed to fetch event details:', error);
//       alert('Failed to fetch event details');
//     }
//   };

//   useEffect(() => {
//     if (eventId) {
//       setAction(true);
//       getSingleEventDetails(eventId);
//     }
//   }, [eventId]);

//   const onSubmit = async (data: Event) => {
//     try {
//       console.log("sjjj",data)
//       // Handle form submission, e.g., POST request to create/update event
//       await commonApi.post(`create/event`, data);
//       //navigate('/events'); // Redirect to success page or appropriate route
//     } catch (error) {
//       console.error('Error creating/updating event:', error);
//       alert('Failed to create/update event');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
//         <h2 className="text-center text-3xl font-extrabold text-gray-900">{action ? 'Edit Event' : 'Create Event'}</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {/* <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">Name of event</label>
//             <input
//               type="text"
//               {...register('name', { required: 'Event name is required' })}
//               className={`inputboxstyling sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
//             />
//             {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name.message}</div>}
//           </div> */}

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">Description</label>
//             <input
//               type="text"
//               {...register('description', { required: 'Description is required' })}
//               className={`inputboxstyling sm:text-sm ${errors.description ? 'border-red-500' : ''}`}
//             />
//             {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description.message}</div>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">Summary</label>
//             <input
//               type="text"
//               {...register('summary', { required: 'Summary is required' })}
//               className={`inputboxstyling sm:text-sm ${errors.summary ? 'border-red-500' : ''}`}
//             />
//             {errors.summary && <div className="text-red-500 text-sm mt-1">{errors.summary.message}</div>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">From Date</label>
//             <input
//               type="datetime-local"
//               {...register('startDate', { required: 'From date is required' })}
//               className={`inputboxstyling sm:text-sm ${errors.startDate ? 'border-red-500' : ''}`}
//             />
//             {errors.startDate && <div className="text-red-500 text-sm mt-1">{errors.startDate.message}</div>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">To Date</label>
//             <input
//               type="datetime-local"
//               {...register('endDate', { required: 'To date is required' })}
//               className={`inputboxstyling sm:text-sm ${errors.endDate ? 'border-red-500' : ''}`}
//             />
//             {errors.endDate && <div className="text-red-500 text-sm mt-1">{errors.endDate.message}</div>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">Redirect Url</label>
//             <input
//               type="text"
//               {...register('redirectUrl', { required: 'Redirect is required' })}
//               className={`inputboxstyling sm:text-sm ${errors.redirectUrl ? 'border-red-500' : ''}`}
//             />
//             {errors.redirectUrl && <div className="text-red-500 text-sm mt-1">{errors.redirectUrl.message}</div>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">Meeting Recurrence</label>
//             <select
//               {...register('recurrence', { required: 'Recurrence is required' })}
//               className={`inputboxstyling sm:text-sm ${errors.recurrence ? 'border-red-500' : ''}`}
//             >
//               <option value="not-repeat">Not Repeat</option>
//               <option value="weekly">Weekly</option>
//               <option value="bi-weekly">Bi-Weekly</option>
//               <option value="monthly">Monthly</option>
//               <option value="yearly">Yearly</option>
//             </select>
//             {errors.recurrence && <div className="text-red-500 text-sm mt-1">{errors.recurrence.message}</div>}
//           </div>

//           <div className="flex flex-col space-y-4">
//             <label className="text-sm font-medium text-gray-700">Emails</label>
//             {fields.map((field, index) => (
//               <div key={field.id} className="flex items-center">
//                 <input
//                   type="email"
//                   {...register(`emails.${index}.address` as const, { required: 'Email is required' })}
//                   className={`inputboxstyling sm:text-sm ${errors.emails?.[index]?.address ? 'border-red-500' : ''}`}
//                 />
//                 <button type="button" onClick={() => remove(index)} className="ml-2 text-red-500">Remove</button>
//                 {errors.emails?.[index]?.address && <div className="text-red-500 text-sm mt-1">{errors.emails[index]?.address?.message}</div>}
//               </div>
//             ))}
//             <button type="button" onClick={() => append({ address: '' })} className="btnsecondary">Add Email</button>
//           </div>

//           <button
//             type="submit"
//             className="w-full flex justify-center font-medium text-white btnprimary"
//           >
//             {action ? 'Update Event' : 'Create Event'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default EventForm;


import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { commonApi } from './services/api';

interface Email {
  address: string;
}

interface Event {
  name: string;
  summary: string;
  startDate: Date;
  endDate: Date;
  description: string;
  emails: Email[];
  redirectUrl: string;
  recurrence: string;
}

const EventForm = () => {
  const { register, control, handleSubmit, formState: { errors }, setValue } = useForm<Event>({
    defaultValues: {
      emails: [{ address: '' }] // Initialize with at least one email field
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "emails"
  });

  const [events, setEvents] = useState<Event | null>(null);
  const [action, setAction] = useState(false);
  const { eventId } = useParams();
  const navigate = useNavigate();

  const getSingleEventDetails = async (id: any) => {
    try {
      const response = await commonApi.get(`/event/${id}/get`);
      const formattedData = {
        ...response.data,
      };

      setEvents(formattedData);
      Object.keys(formattedData).forEach((key) => {
        setValue(key as keyof Event, formattedData[key as keyof Event]);
      });
    } catch (error: any) {
      console.error('Failed to fetch event details:', error);
      alert('Failed to fetch event details');
    }
  };

  useEffect(() => {
    if (eventId) {
      setAction(true);
      getSingleEventDetails(eventId);
    }
  }, [eventId]);

  const onSubmit = async (data: Event) => {
    try {
      if (action) {
        // Update event
        await commonApi.post(`/event/${eventId}/update`, data);
        alert('Event updated successfully');
      } else {
        // Create new event
        await commonApi.post(`/create/event`, data);
        alert('Event created successfully');
      }
      navigate('/events'); // Redirect to events page
    } catch (error) {
      console.error('Error creating/updating event:', error);
      alert('Failed to create/update event');
    }
  };

  const onDelete = async () => {
    try {
      await commonApi.delete(`/event/${eventId}/delete`);
      alert('Event deleted successfully');
      navigate('/events'); // Redirect to events page
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">{action ? 'Edit Event' : 'Create Event'}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              {...register('description', { required: 'Description is required' })}
              className={`inputboxstyling sm:text-sm ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description.message}</div>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Summary</label>
            <input
              type="text"
              {...register('summary', { required: 'Summary is required' })}
              className={`inputboxstyling sm:text-sm ${errors.summary ? 'border-red-500' : ''}`}
            />
            {errors.summary && <div className="text-red-500 text-sm mt-1">{errors.summary.message}</div>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">From Date</label>
            <input
              type="datetime-local"
              {...register('startDate', { required: 'From date is required' })}
              className={`inputboxstyling sm:text-sm ${errors.startDate ? 'border-red-500' : ''}`}
            />
            {errors.startDate && <div className="text-red-500 text-sm mt-1">{errors.startDate.message}</div>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">To Date</label>
            <input
              type="datetime-local"
              {...register('endDate', { required: 'To date is required' })}
              className={`inputboxstyling sm:text-sm ${errors.endDate ? 'border-red-500' : ''}`}
            />
            {errors.endDate && <div className="text-red-500 text-sm mt-1">{errors.endDate.message}</div>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Redirect Url</label>
            <input
              type="text"
              {...register('redirectUrl', { required: 'Redirect is required' })}
              className={`inputboxstyling sm:text-sm ${errors.redirectUrl ? 'border-red-500' : ''}`}
            />
            {errors.redirectUrl && <div className="text-red-500 text-sm mt-1">{errors.redirectUrl.message}</div>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Meeting Recurrence</label>
            <select
              {...register('recurrence', { required: 'Recurrence is required' })}
              className={`inputboxstyling sm:text-sm ${errors.recurrence ? 'border-red-500' : ''}`}
            >
              <option value="not-repeat">Not Repeat</option>
              <option value="weekly">Weekly</option>
              <option value="bi-weekly">Bi-Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            {errors.recurrence && <div className="text-red-500 text-sm mt-1">{errors.recurrence.message}</div>}
          </div>

          <div className="flex flex-col space-y-4">
            <label className="text-sm font-medium text-gray-700">Emails</label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center">
                <input
                  type="email"
                  {...register(`emails.${index}.address` as const, { required: 'Email is required' })}
                  className={`inputboxstyling sm:text-sm ${errors.emails?.[index]?.address ? 'border-red-500' : ''}`}
                />
                <button type="button" onClick={() => remove(index)} className="ml-2 text-red-500">Remove</button>
                {errors.emails?.[index]?.address && <div className="text-red-500 text-sm mt-1">{errors.emails[index]?.address?.message}</div>}
              </div>
            ))}
            <button type="button" onClick={() => append({ address: '' })} className="btnsecondary">Add Email</button>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="flex-1 mr-2 justify-center font-medium text-white btnprimary"
            >
              {action ? 'Update Event' : 'Create Event'}
            </button>
            {action && (
              <button
                type="button"
                onClick={onDelete}
                className="flex-1 ml-2 justify-center font-medium text-white btnsecondary bg-red-500"
              >
                Delete Event
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventForm;
