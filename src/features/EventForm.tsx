// import React, { useEffect, useState } from 'react';
// import { useForm, useFieldArray } from 'react-hook-form';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { commonApi } from '../services/api';

// interface Email {
//   address: string;
// }

// interface Event {
//   name: string;
//   summary: string;
//   startDate: string;
//   endDate: string;
//   description: string;
//   emails: Email[];
//   redirectUrl: string;
//   recurrence: string;
//   file?: FileList;
// }

// const EventForm = () => {
//   const formatDate = (date: Date) => {
//     const offset = date.getTimezoneOffset();
//     const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
//     return adjustedDate.toISOString().slice(0, 16);
//   };

//   const location = useLocation();
//   const { startDate } = location.state || {};
//   const { register, control, handleSubmit, formState: { errors }, setValue } = useForm<Event>({
//     defaultValues: {
//       emails: [{ address: '' }],
//       startDate: startDate ? formatDate(new Date(startDate)) : formatDate(new Date()), // Format the date correctly
//     }
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'emails',
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
//       const formData = new FormData();
//       formData.append('name', data.name);
//       formData.append('summary', data.summary);
//       formData.append('startDate', data.startDate);
//       formData.append('endDate', data.endDate);
//       formData.append('description', data.description);
//       formData.append('redirectUrl', data.redirectUrl);
//       formData.append('recurrence', data.recurrence);
//       data.emails.forEach((email, index) => {
//         formData.append(`emails[${index}][address]`, email.address);
//       });
//       if (data.file && data.file[0]) {
//         formData.append('file', data.file[0]);  // Handle single file upload
//       }

//       const config = { headers: { 'Content-Type': 'multipart/form-data' } };

//       if (action) {
//         await commonApi.post(`/event/${eventId}/update`, formData, config);
//         alert('Event updated successfully');
//       } else {
//         await commonApi.post('/create/event', formData, config);
//         alert('Event created successfully');
//       }
//       navigate('/events');
//     } catch (error) {
//       console.error('Error creating/updating event:', error);
//       alert('Failed to create/update event');
//     }
//   };

//   const onDelete = async () => {
//     try {
//       await commonApi.delete(`/event/${eventId}/delete`);
//       alert('Event deleted successfully');
//       navigate('/events'); // Redirect to events page
//     } catch (error) {
//       console.error('Error deleting event:', error);
//       alert('Failed to delete event');
//     }
//   };


//   return (
//     <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 p-10">
//         <h2 className="text-center text-3xl font-extrabold text-gray-900">{action ? 'Edit Event' : 'Create Event'}</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
//             <label className="text-sm font-medium text-gray-700">Start Date</label>
//             <input
//               type="datetime-local"
//               {...register('startDate', { required: 'Start date is required' })}
//               className={`inputboxstyling sm:text-sm ${errors.startDate ? 'border-red-500' : ''}`}
//             />
//             {errors.startDate && <div className="text-red-500 text-sm mt-1">{errors.startDate.message}</div>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">End Date</label>
//             <input
//               type="datetime-local"
//               {...register('endDate', { required: 'End date is required' })}
//               className={`inputboxstyling sm:text-sm ${errors.endDate ? 'border-red-500' : ''}`}
//             />
//             {errors.endDate && <div className="text-red-500 text-sm mt-1">{errors.endDate.message}</div>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">Redirect Url</label>
//             <input
//               type="text"
//               {...register('redirectUrl', { required: 'Redirect URL is required' })}
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

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">File</label>
//             <input
//               type="file"
//               {...register('file')}
//               className="inputboxstyling sm:text-sm"
//             />
//           </div>

//           <div className="flex justify-between">
//             <button
//               type="submit"
//               className="flex-1 mr-2 justify-center font-medium text-white btnprimary"
//             >
//               {action ? 'Update Event' : 'Create Event'}
//             </button>
//             {action && (
//               <button
//                 type="button"
//                 onClick={onDelete}
//                 className="flex-1 ml-2 justify-center font-medium text-white btnsecondary bg-red-500"
//               >
//                 Delete Event
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default EventForm;
// import React, { useEffect, useState } from 'react';
// import { useForm, useFieldArray } from 'react-hook-form';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { commonApi } from '../services/api';

// interface Email {
//   address: string;
// }

// interface Event {
//   name: string;
//   summary: string;
//   startDate: string;
//   endDate: string;
//   description: string;
//   emails: Email[];
//   redirectUrl: string;
//   recurrence: string;
//   file?: FileList;
// }

// const EventForm = () => {
//   const clientId = process.env.REACT_APP_CLIENT_ID
//   const formatDate = (date: Date) => {
//     const offset = date.getTimezoneOffset();
//     const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
//     return adjustedDate.toISOString().slice(0, 16);
//   };

//   const location = useLocation();
//   const { startDate } = location.state || {};
//   const { register, control, handleSubmit, formState: { errors }, setValue } = useForm<Event>({
//     defaultValues: {
//       emails: [{ address: '' }],
//       startDate: startDate ? formatDate(new Date(startDate)) : formatDate(new Date()), // Format the date correctly
//     }
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'emails',
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
//       const formData = new FormData();
//       formData.append('name', data.name);
//       formData.append('summary', data.summary);
//       formData.append('startDate', data.startDate);
//       formData.append('endDate', data.endDate);
//       formData.append('description', data.description);
//       formData.append('redirectUrl', data.redirectUrl);
//       formData.append('recurrence', data.recurrence);
//       data.emails.forEach((email, index) => {
//         formData.append(`emails[${index}][address]`, email.address);
//       });
//       if (data.file && data.file[0]) {
//         formData.append('file', data.file[0]); // Handle single file upload
//       }

//       const config = { headers: { 'Content-Type': 'multipart/form-data' } };

//       if (action) {
//         await commonApi.post(`/event/${eventId}/update`, formData, config);
//         alert('Event updated successfully');
//       } else {
//         await commonApi.post('/create/event', formData, config);
//         alert('Event created successfully');
//       }
//       navigate('/events');
//     } catch (error) {
//       console.error('Error creating/updating event:', error);
//       alert('Failed to create/update event');
//     }
//   };

//   const onDelete = async () => {
//     try {
//       await commonApi.delete(`/event/${eventId}/delete`);
//       alert('Event deleted successfully');
//       navigate('/events'); // Redirect to events page
//     } catch (error) {
//       console.error('Error deleting event:', error);
//       alert('Failed to delete event');
//     }
//   };

//   const loadPicker = () => {
//     let token =localStorage.getItem('token')
//     const oauthToken =token; // Replace with actual OAuth token

//     const picker:any = new window.google.picker.PickerBuilder()
//       .addView(window.google.picker.ViewId.DOCS)
//       .setOAuthToken(oauthToken)
//       .setDeveloperKey('AIzaSyA-IHXkY2ojOx9SYfU9aYqUWimg14Om1jY') // Replace with actual Developer Key
//       .setCallback(pickerCallback)
//       .build();
//     picker.setVisible(true);
//   };

//   const pickerCallback = (data: any) => {
//     if (data.action === window.google.picker.Action.PICKED) {
//       const file = data.docs[0];
//       console.log('Selected file:', file);
//       // Handle file metadata (e.g., upload to Google Drive)
//     }
//   };

//   useEffect(() => {
//     const loadPickerScript = () => {
//       const script = document.createElement('script');
//       script.src = 'https://apis.google.com/js/api.js';
//       script.onload = () => {
//         window.gapi.load('auth', { callback: onAuthApiLoad });
//         window.gapi.load('picker', { callback: onPickerApiLoad });
//       };
//       document.body.appendChild(script);
//     };

//     const onAuthApiLoad = () => {
//       window.gapi.auth.authorize(
//         {
//           client_id: clientId, // Replace with actual Client ID
//           scope: ['https://www.googleapis.com/auth/drive.file'],
//           immediate: false,
//         },
//         handleAuthResult
//       );
//     };

//     const onPickerApiLoad = () => {
//       // Picker API loaded
//     };

//     const handleAuthResult = (authResult: any) => {
//       if (authResult && !authResult.error) {
//         // OAuth token received
//       }
//     };

//     loadPickerScript();
//   }, []);

//   return (
//     <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 p-10">
//         <h2 className="text-center text-3xl font-extrabold text-gray-900">{action ? 'Edit Event' : 'Create Event'}</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
//             <label className="text-sm font-medium text-gray-700">Start Date</label>
//             <input
//               type="datetime-local"
//               {...register('startDate', { required: 'Start date is required' })}
//               className={`inputboxstyling sm:text-sm ${errors.startDate ? 'border-red-500' : ''}`}
//             />
//             {errors.startDate && <div className="text-red-500 text-sm mt-1">{errors.startDate.message}</div>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">End Date</label>
//             <input
//               type="datetime-local"
//               {...register('endDate', { required: 'End date is required' })}
//               className={`inputboxstyling sm:text-sm ${errors.endDate ? 'border-red-500' : ''}`}
//             />
//             {errors.endDate && <div className="text-red-500 text-sm mt-1">{errors.endDate.message}</div>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">Redirect Url</label>
//             <input
//               type="text"
//               {...register('redirectUrl', { required: 'Redirect URL is required' })}
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
//               <option value="">Select Recurrence</option>
//               <option value="daily">Daily</option>
//               <option value="weekly">Weekly</option>
//               <option value="monthly">Monthly</option>
//               <option value="yearly">Yearly</option>
//             </select>
//             {errors.recurrence && <div className="text-red-500 text-sm mt-1">{errors.recurrence.message}</div>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">Email Addresses</label>
//             {fields.map((field, index) => (
//               <div key={field.id} className="flex items-center">
//                 <input
//                   type="text"
//                   {...register(`emails.${index}.address` as const, { required: 'Email address is required' })}
//                   className={`inputboxstyling sm:text-sm ${errors.emails?.[index]?.address ? 'border-red-500' : ''}`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => remove(index)}
//                   className="ml-2 p-1 text-white bg-red-500 rounded"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => append({ address: '' })}
//               className="mt-2 p-1 text-white bg-blue-500 rounded"
//             >
//               Add Email
//             </button>
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">Attach File</label>
//             <input
//               type="file"
//               {...register('file')}
//               className="inputboxstyling sm:text-sm"
//             />
//           </div>

//           <div className="flex justify-between">
//             <button
//               type="submit"
//               className="flex-1 mr-2 justify-center font-medium text-white btnprimary"
//             >
//               {action ? 'Update Event' : 'Create Event'}
//             </button>
//             {action && (
//               <button
//                 type="button"
//                 onClick={onDelete}
//                 className="flex-1 ml-2 justify-center font-medium text-white btnsecondary bg-red-500"
//               >
//                 Delete Event
//               </button>
//             )}
//           </div>
//         </form>
//         <button
//           type="button"
//           onClick={loadPicker}
//           className="mt-4 p-2 text-white bg-blue-500 rounded"
//         >
//           Attach File from Drive
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EventForm;

// import React, { useEffect, useState } from 'react';
// import { useForm, useFieldArray } from 'react-hook-form';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { commonApi } from '../services/api';

// interface Email {
//   address: string;
// }

// interface Event {
//   name: string;
//   summary: string;
//   startDate: string;
//   endDate: string;
//   description: string;
//   emails: Email[];
//   redirectUrl: string;
//   recurrence: string;
//   file?: FileList;
// }

// const EventForm = () => {
//   const clientId = process.env.REACT_APP_CLIENT_ID;
//   const developerKey = process.env.REACT_APP_DEVELOPER_KEY;

//   const formatDate = (date: Date) => {
//     const offset = date.getTimezoneOffset();
//     const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
//     return adjustedDate.toISOString().slice(0, 16);
//   };

//   const location = useLocation();
//   const { startDate } = location.state || {};
//   const { register, control, handleSubmit, formState: { errors }, setValue } = useForm<Event>({
//     defaultValues: {
//       emails: [{ address: '' }],
//       startDate: startDate ? formatDate(new Date(startDate)) : formatDate(new Date()), // Format the date correctly
//     }
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'emails',
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
//       const formData = new FormData();
//       formData.append('name', data.name);
//       formData.append('summary', data.summary);
//       formData.append('startDate', data.startDate);
//       formData.append('endDate', data.endDate);
//       formData.append('description', data.description);
//       formData.append('redirectUrl', data.redirectUrl);
//       formData.append('recurrence', data.recurrence);
//       data.emails.forEach((email, index) => {
//         formData.append(`emails[${index}][address]`, email.address);
//       });
//       if (data.file && data.file[0]) {
//         formData.append('file', data.file[0]); // Handle single file upload
//       }

//       const config = { headers: { 'Content-Type': 'multipart/form-data' } };

//       if (action) {
//         await commonApi.post(`/event/${eventId}/update`, formData, config);
//         alert('Event updated successfully');
//       } else {
//         await commonApi.post('/create/event', formData, config);
//         alert('Event created successfully');
//       }
//       navigate('/events');
//     } catch (error) {
//       console.error('Error creating/updating event:', error);
//       alert('Failed to create/update event');
//     }
//   };

//   const onDelete = async () => {
//     try {
//       await commonApi.delete(`/event/${eventId}/delete`);
//       alert('Event deleted successfully');
//       navigate('/events'); // Redirect to events page
//     } catch (error) {
//       console.error('Error deleting event:', error);
//       alert('Failed to delete event');
//     }
//   };

//   const loadPicker = () => {
//     const oauthToken = localStorage.getItem('token'); // Use token from local storage

//     const picker = new window.google.picker.PickerBuilder()
//       .addView(window.google.picker.ViewId.DOCS)
//       .setOAuthToken(oauthToken)
//       .setDeveloperKey(developerKey) // Use developer key from environment variable
//       .setCallback(pickerCallback)
//       .build();
//     picker.setVisible(true);
//   };

//   const pickerCallback = (data: any) => {
//     if (data.action === window.google.picker.Action.PICKED) {
//       const file = data.docs[0];
//       console.log('Selected file:', file);
//       // Handle file metadata (e.g., upload to Google Drive)
//     }
//   };

//   useEffect(() => {
//     const loadPickerScript = () => {
//       const script = document.createElement('script');
//       script.src = 'https://apis.google.com/js/api.js';
//       script.onload = () => {
//         window.gapi.load('auth', { callback: onAuthApiLoad });
//         window.gapi.load('picker', { callback: onPickerApiLoad });
//       };
//       document.body.appendChild(script);
//     };

//     const onAuthApiLoad = () => {
//       window.gapi.auth.authorize(
//         {
//           client_id: clientId, // Use client ID from environment variable
//           scope: ['https://www.googleapis.com/auth/drive.file'],
//           immediate: false,
//         },
//         handleAuthResult
//       );
//     };

//     const onPickerApiLoad = () => {
//       // Picker API loaded
//     };

//     const handleAuthResult = (authResult: any) => {
//       if (authResult && !authResult.error) {
//         // OAuth token received
//       }
//     };

//     loadPickerScript();
//   }, []);

//   return (
//     <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 p-10">
//         <h2 className="text-center text-3xl font-extrabold text-gray-900">{action ? 'Edit Event' : 'Create Event'}</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
//             <label className="text-sm font-medium text-gray-700">Start Date</label>
//             <input
//               type="datetime-local"
//               {...register('startDate', { required: 'Start date is required' })}
//               className={`inputboxstyling sm:text-sm ${errors.startDate ? 'border-red-500' : ''}`}
//             />
//             {errors.startDate && <div className="text-red-500 text-sm mt-1">{errors.startDate.message}</div>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">End Date</label>
//             <input
//               type="datetime-local"
//               {...register('endDate', { required: 'End date is required' })}
//               className={`inputboxstyling sm:text-sm ${errors.endDate ? 'border-red-500' : ''}`}
//             />
//             {errors.endDate && <div className="text-red-500 text-sm mt-1">{errors.endDate.message}</div>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">Redirect Url</label>
//             <input
//               type="text"
//               {...register('redirectUrl', { required: 'Redirect URL is required' })}
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
//               <option value="">Select Recurrence</option>
//               <option value="daily">Daily</option>
//               <option value="weekly">Weekly</option>
//               <option value="monthly">Monthly</option>
//               <option value="yearly">Yearly</option>
//             </select>
//             {errors.recurrence && <div className="text-red-500 text-sm mt-1">{errors.recurrence.message}</div>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">Email Addresses</label>
//             {fields.map((field, index) => (
//               <div key={field.id} className="flex items-center">
//                 <input
//                   type="text"
//                   {...register(`emails.${index}.address` as const, { required: 'Email address is required' })}
//                   className={`inputboxstyling sm:text-sm ${errors.emails?.[index]?.address ? 'border-red-500' : ''}`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => remove(index)}
//                   className="ml-2 p-1 text-white bg-red-500 rounded"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => append({ address: '' })}
//               className="mt-2 p-1 text-white bg-blue-500 rounded"
//             >
//               Add Email
//             </button>
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">Attach File</label>
//             <input
//               type="file"
//               {...register('file')}
//               className="inputboxstyling sm:text-sm"
//             />
//           </div>

//           <div className="flex justify-between">
//             <button
//               type="submit"
//               className="flex-1 mr-2 justify-center font-medium text-white btnprimary"
//             >
//               {action ? 'Update Event' : 'Create Event'}
//             </button>
//             {action && (
//               <button
//                 type="button"
//                 onClick={onDelete}
//                 className="flex-1 ml-2 justify-center font-medium text-white btnsecondary bg-red-500"
//               >
//                 Delete Event
//               </button>
//             )}
//           </div>
//         </form>
//         <button
//           type="button"
//           onClick={loadPicker}
//           className="mt-4 p-2 text-white bg-blue-500 rounded"
//         >
//           Attach File from Drive
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EventForm;

// import React, { useEffect, useState } from 'react';
// import { useForm, useFieldArray } from 'react-hook-form';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { commonApi } from '../services/api';

// interface Email {
//   address: string;
// }

// interface Event {
//   name: string;
//   summary: string;
//   startDate: string;
//   endDate: string;
//   description: string;
//   emails: Email[];
//   redirectUrl: string;
//   recurrence: string;
//   file?: FileList;
// }

// const EventForm = () => {
//   const clientId = process.env.REACT_APP_CLIENT_ID;
//   const developerKey = process.env.REACT_APP_DEVELOPER_KEY;

//   const formatDate = (date: Date) => {
//     const offset = date.getTimezoneOffset();
//     const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
//     return adjustedDate.toISOString().slice(0, 16);
//   };

//   const location = useLocation();
//   const { startDate } = location.state || {};
//   const { register, control, handleSubmit, formState: { errors }, setValue } = useForm<Event>({
//     defaultValues: {
//       emails: [{ address: '' }],
//       startDate: startDate ? formatDate(new Date(startDate)) : formatDate(new Date()), // Format the date correctly
//     }
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'emails',
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
//       const formData = new FormData();
//       formData.append('name', data.name);
//       formData.append('summary', data.summary);
//       formData.append('startDate', data.startDate);
//       formData.append('endDate', data.endDate);
//       formData.append('description', data.description);
//       formData.append('redirectUrl', data.redirectUrl);
//       formData.append('recurrence', data.recurrence);
//       data.emails.forEach((email, index) => {
//         formData.append(`emails[${index}][address]`, email.address);
//       });
//       if (data.file && data.file[0]) {
//         formData.append('file', data.file[0]); // Handle single file upload
//       }

//       const config = { headers: { 'Content-Type': 'multipart/form-data' } };

//       if (action) {
//         await commonApi.post(`/event/${eventId}/update`, formData, config);
//         alert('Event updated successfully');
//       } else {
//         await commonApi.post('/create/event', formData, config);
//         alert('Event created successfully');
//       }
//       navigate('/events');
//     } catch (error) {
//       console.error('Error creating/updating event:', error);
//       alert('Failed to create/update event');
//     }
//   };

//   const onDelete = async () => {
//     try {
//       await commonApi.delete(`/event/${eventId}/delete`);
//       alert('Event deleted successfully');
//       navigate('/events'); // Redirect to events page
//     } catch (error) {
//       console.error('Error deleting event:', error);
//       alert('Failed to delete event');
//     }
//   };

//   const loadPicker = () => {
//     const oauthToken = localStorage.getItem('token'); // Use token from local storage

//     const picker = new window.google.picker.PickerBuilder()
//       .addView(window.google.picker.ViewId.DOCS)
//       .setOAuthToken(oauthToken)
//       .setDeveloperKey(developerKey) // Use developer key from environment variable
//       .setCallback(pickerCallback)
//       .build();
//     picker.setVisible(true);
//   };

//   const pickerCallback = (data: any) => {
//     if (data.action === window.google.picker.Action.PICKED) {
//       const file = data.docs[0];
//       console.log('Selected file:', file);
//       // Handle file metadata (e.g., upload to Google Drive)
//     }
//   };

//   useEffect(() => {
//     const loadPickerScript = () => {
//       const script = document.createElement('script');
//       script.src = 'https://apis.google.com/js/api.js';
//       script.onload = () => {
//         window.gapi.load('auth', { callback: onAuthApiLoad });
//         window.gapi.load('picker', { callback: onPickerApiLoad });
//       };
//       document.body.appendChild(script);
//     };

//     const onAuthApiLoad = () => {
//       window.gapi.auth.authorize(
//         {
//           client_id: clientId, // Use client ID from environment variable
//           scope: ['https://www.googleapis.com/auth/drive.file'],
//           immediate: false,
//         },
//         handleAuthResult
//       );
//     };

//     const onPickerApiLoad = () => {
//       // Picker API loaded
//     };

//     const handleAuthResult = (authResult: any) => {
//       if (authResult && !authResult.error) {
//         localStorage.setItem('token', authResult.access_token);
//       }
//     };

//     loadPickerScript();
//   }, []);

//   return (
//     <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 p-10">
//         <h2 className="text-center text-3xl font-extrabold text-gray-900">{action ? 'Edit Event' : 'Create Event'}</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
//             <label className="text-sm font-medium text-gray-700">Start Date</label>
//             <input
//               type="datetime-local"
//               {...register('startDate', { required: 'Start date is required' })}
//               className={`inputboxstyling sm:text-sm ${errors.startDate ? 'border-red-500' : ''}`}
//             />
//             {errors.startDate && <div className="text-red-500 text-sm mt-1">{errors.startDate.message}</div>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">End Date</label>
//             <input
//               type="datetime-local"
//               {...register('endDate', { required: 'End date is required' })}
//               className={`inputboxstyling sm:text-sm ${errors.endDate ? 'border-red-500' : ''}`}
//             />
//             {errors.endDate && <div className="text-red-500 text-sm mt-1">{errors.endDate.message}</div>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">Redirect Url</label>
//             <input
//               type="text"
//               {...register('redirectUrl', { required: 'Redirect URL is required' })}
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
//               <option value="">Select Recurrence</option>
//               <option value="daily">Daily</option>
//               <option value="weekly">Weekly</option>
//               <option value="monthly">Monthly</option>
//               <option value="yearly">Yearly</option>
//             </select>
//             {errors.recurrence && <div className="text-red-500 text-sm mt-1">{errors.recurrence.message}</div>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">Email Addresses</label>
//             {fields.map((field, index) => (
//               <div key={field.id} className="flex items-center">
//                 <input
//                   type="text"
//                   {...register(`emails.${index}.address` as const, { required: 'Email address is required' })}
//                   className={`inputboxstyling sm:text-sm ${errors.emails?.[index]?.address ? 'border-red-500' : ''}`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => remove(index)}
//                   className="ml-2 p-1 text-white bg-red-500 rounded"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => append({ address: '' })}
//               className="mt-2 p-1 text-white bg-blue-500 rounded"
//             >
//               Add Email
//             </button>
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">Attach File</label>
//             <input
//               type="file"
//               {...register('file')}
//               className="inputboxstyling sm:text-sm"
//             />
//           </div>

//           <div className="flex justify-between">
//             <button
//               type="submit"
//               className="flex-1 mr-2 justify-center font-medium text-white btnprimary"
//             >
//               {action ? 'Update Event' : 'Create Event'}
//             </button>
//             {action && (
//               <button
//                 type="button"
//                 onClick={onDelete}
//                 className="flex-1 ml-2 justify-center font-medium text-white btnsecondary bg-red-500"
//               >
//                 Delete Event
//               </button>
//             )}
//           </div>
//         </form>
//         <button
//           type="button"
//           onClick={loadPicker}
//           className="mt-4 p-2 text-black bg-blue-500 rounded"
//         >
//           Attach File from Drive
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EventForm;
// import React, { useEffect, useState } from 'react';
// import { useForm, useFieldArray } from 'react-hook-form';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { commonApi } from '../services/api';


// const MAX_FILE_SIZE = 5 * 1024 * 1024;
// interface Email {
//   address: string;
// }

// interface Event {
//   name: string;
//   summary: string;
//   startDate: string;
//   endDate: string;
//   description: string;
//   emails: Email[];
//   redirectUrl: string;
//   recurrence: string;
//   file?: FileList;
//   driveFileId?: string;
// }

// const EventForm = () => {
//   const clientId = process.env.REACT_APP_CLIENT_ID;
//   const developerKey = process.env.REACT_APP_DEVELOPER_KEY;

//   const formatDate = (date: Date) => {
//     const offset = date.getTimezoneOffset();
//     const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
//     return adjustedDate.toISOString().slice(0, 16);
//   };

//   const location = useLocation();
//   const { startDate } = location.state || {};
//   const { register, control, handleSubmit, setError, clearErrors, watch,formState: { errors }, setValue } = useForm<Event>({
//     defaultValues: {
//       emails: [{ address: '' }],
//       startDate: startDate ? formatDate(new Date(startDate)) : formatDate(new Date()), // Format the date correctly
//     }
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'emails',
//   });

//   const [events, setEvents] = useState<Event | null>(null);
//   const [action, setAction] = useState(false);
//   const { eventId } = useParams();
//   const navigate = useNavigate();

//   const [fileList, setFileList] = useState([]);
 

//   const validateFiles = (files:any) => {
//     let valid = true;
//     let fileArray = Array.from(files);

//     fileArray.forEach((file:any) => {
//       if (file.size > MAX_FILE_SIZE) {
//         valid = false;
//       }
//     });

//     return valid || "Files must be less than 20MB each";
//   };

//   // const handleFileChange = (e:any) => {
//   //   const files = Array.from(e.target.files);
//   //   const validFiles:any = files.filter((file:any) => file.size <= MAX_FILE_SIZE);

//   //   if (files.length !== validFiles.length) {
//   //     setError('file', {
//   //       type: 'manual',
//   //       message: 'One or more files exceed the 20MB limit',
//   //     });
//   //   } else {
//   //     clearErrors('file');
//   //   }

//   //   let a:any=[];
//   //   a.push(validFiles[0])

//   //   setFileList(a);
//   //   console.log("fileList",fileList)
//   //   setValue('file', validFiles);
//   // };
//   const handleFileChange = (e:any) => {
//     const files = Array.from(e.target.files);
//     const validFiles = files.filter((file:any) => file.size <= MAX_FILE_SIZE);

//     if (files.length !== validFiles.length) {
//       setError('file', {
//         type: 'manual',
//         message: 'One or more files exceed the 20MB limit',
//       });
//     } else {
//       clearErrors('file');
//     }

//     const newFileList:any = [...fileList, ...validFiles];
//     setFileList(newFileList);
//     setValue('file', newFileList);
//   };
//   const removeFile = (fileName:any) => {
//     const updatedFileList:any = fileList.filter((file:any) => file.name !== fileName);
//     setFileList(updatedFileList);
//     setValue('file', updatedFileList);
//   };

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
//       const formData = new FormData();
//       formData.append('name', data.name);
//       formData.append('summary', data.summary);
//       formData.append('startDate', data.startDate);
//       formData.append('endDate', data.endDate);
//       formData.append('description', data.description);
//       formData.append('redirectUrl', data.redirectUrl);
//       formData.append('recurrence', data.recurrence);
//       data.emails.forEach((email, index) => {
//         formData.append(`emails[${index}][address]`, email.address);
//       });
//       // fileList.forEach((file, index) => {
//       //   formData.append(`files[${index}]`, file);
//       // });
//       fileList.forEach((file) => {
//         formData.append('files', file);
//       });
//       if (data.driveFileId) {
//         formData.append('driveFileId', data.driveFileId); // Handle file selected from Google Drive
//       }

//       const config = { headers: { 'Content-Type': 'multipart/form-data' } };

//       if (action) {
//         await commonApi.post(`/event/${eventId}/update`, formData, config);
//         alert('Event updated successfully');
//       } else {
//         await commonApi.post('/create/event', formData, config);
//         alert('Event created successfully');
//       }
//       navigate('/events');
//     } catch (error) {
//       console.error('Error creating/updating event:', error);
//       alert('Failed to create/update event');
//     }
//   };

//   const onDelete = async () => {
//     try {
//       await commonApi.delete(`/event/${eventId}/delete`);
//       alert('Event deleted successfully');
//       navigate('/events'); // Redirect to events page
//     } catch (error) {
//       console.error('Error deleting event:', error);
//       alert('Failed to delete event');
//     }
//   };

//   const loadPicker = () => {
//     const oauthToken = localStorage.getItem('token'); // Use token from local storage

//     const picker = new window.google.picker.PickerBuilder()
//       .addView(window.google.picker.ViewId.DOCS)
//       .setOAuthToken(oauthToken)
//       .setDeveloperKey(developerKey) // Use developer key from environment variable
//       .setCallback(pickerCallback)
//       .build();
//     picker.setVisible(true);
//   };

//   const pickerCallback = (data: any) => {
//     if (data.action === window.google.picker.Action.PICKED) {
//       const file = data.docs[0];
//       console.log('Selected file:', file);
//       setValue('driveFileId', file.id);
//     }
//   };

//   useEffect(() => {
//     const loadPickerScript = () => {
//       const script = document.createElement('script');
//       script.src = 'https://apis.google.com/js/api.js';
//       script.onload = () => {
//         window.gapi.load('auth', { callback: onAuthApiLoad });
//         window.gapi.load('picker', { callback: onPickerApiLoad });
//       };
//       document.body.appendChild(script);
//     };

//     const onAuthApiLoad = () => {
//       window.gapi.auth.authorize(
//         {
//           client_id: clientId, // Use client ID from environment variable
//           scope: ['https://www.googleapis.com/auth/drive.file'],
//           immediate: false,
//         },
//         handleAuthResult
//       );
//     };

//     const onPickerApiLoad = () => {
//       // Picker API loaded
//     };

//     const handleAuthResult = (authResult: any) => {
//       if (authResult && !authResult.error) {
//         localStorage.setItem('token', authResult.access_token);
//       }
//     };

//     loadPickerScript();
//   }, []);

//   return (
//     <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 p-10">
//         <h2 className="text-center text-3xl font-extrabold text-gray-900">{action ? 'Edit Event' : 'Create Event'}</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
//             <label className="text-sm font-medium text-gray-700">Start Date</label>
//             <input
//               type="datetime-local"
//               {...register('startDate', { required: 'Start date is required' })}
//               className={`inputboxstyling sm:text-sm ${errors.startDate ? 'border-red-500' : ''}`}
//             />
//             {errors.startDate && <div className="text-red-500 text-sm mt-1">{errors.startDate.message}</div>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">End Date</label>
//             <input
//               type="datetime-local"
//               {...register('endDate', { required: 'End date is required' })}
//               className={`inputboxstyling sm:text-sm ${errors.endDate ? 'border-red-500' : ''}`}
//             />
//             {errors.endDate && <div className="text-red-500 text-sm mt-1">{errors.endDate.message}</div>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">Redirect Url</label>
//             <input
//               type="text"
//               {...register('redirectUrl', { required: 'Redirect URL is required' })}
//               className={`inputboxstyling sm:text-sm ${errors.redirectUrl ? 'border-red-500' : ''}`}
//             />
//             {errors.redirectUrl && <div className="text-red-500 text-sm mt-1">{errors.redirectUrl.message}</div>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">Recurrence</label>
//             <select
//               {...register('recurrence', { required: 'Recurrence is required' })}
//               className={`inputboxstyling sm:text-sm ${errors.recurrence ? 'border-red-500' : ''}`}
//             >
//               <option value="">Select Recurrence</option>
//               <option value="daily">Daily</option>
//               <option value="weekly">Weekly</option>
//               <option value="monthly">Monthly</option>
//               <option value="yearly">Yearly</option>
//             </select>
//             {errors.recurrence && <div className="text-red-500 text-sm mt-1">{errors.recurrence.message}</div>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">Email Addresses</label>
//             {fields.map((field, index) => (
//               <div key={field.id} className="flex items-center">
//                 <input
//                   type="text"
//                   {...register(`emails.${index}.address` as const, { required: 'Email address is required' })}
//                   className={`inputboxstyling sm:text-sm ${errors.emails?.[index]?.address ? 'border-red-500' : ''}`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => remove(index)}
//                   className="ml-2 p-1 text-white bg-red-500 rounded"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => append({ address: '' })}
//               className="mt-2 p-1 text-white bg-black rounded"
//             >
//               Add Email
//             </button>
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">Attach File</label>
//             <input
//           type="file"
//           multiple
//           {...register('file', {
//             validate: validateFiles
//           })}
//           className="inputboxstyling sm:text-sm"
//           onChange={handleFileChange}
//         />
//         {errors.file && <p className="text-red-500 text-sm">{errors.file.message}</p>}
//       </div>

//       <div className="mt-4">

//         <h3 className="text-sm font-medium text-gray-700">Attached Files:</h3>
       
//         <ul>
//           {fileList.map((file:any, index) => (
//             <li key={index} className="text-sm text-gray-700 flex justify-between items-center">
//               {file.name}
//               <button
//                 type="button"
//                 className="ml-4 p-1 bg-red-500 text-white rounded"
//                 onClick={() => removeFile(file.name)}
//               >
//                 Remove
//               </button>
//             </li>
//           ))}
//         </ul>
//         </div>

//           <div className="flex justify-between">
//             <button
//               type="submit"
//               className="flex-1 mr-2 justify-center font-medium text-white btnprimary"
//             >
//               {action ? 'Update Event' : 'Create Event'}
//             </button>
//             {action && (
//               <button
//                 type="button"
//                 onClick={onDelete}
//                 className="flex-1 ml-2 justify-center font-medium text-white btnsecondary bg-red-500"
//               >
//                 Delete Event
//               </button>
//             )}
//           </div>
//         </form>
//         <button
//           type="button"
//           onClick={loadPicker}
//           className="mt-4 p-2 text-white bg-black rounded"
//         >
//           Attach File from Drive
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EventForm;



// import React, { useEffect, useState } from 'react';
// import { useForm, useFieldArray } from 'react-hook-form';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { commonApi } from '../services/api';


// const MAX_FILE_SIZE = 5 * 1024 * 1024;
// interface Email {
//   address: string;
// }

// interface Event {
//   name: string;
//   summary: string;
//   startDate: string;
//   endDate: string;
//   description: string;
//   emails: Email[];
//   redirectUrl: string;
//   recurrence: string;
//   file?: FileList;
//   driveFiles?: Array<{ id: string; name: string; webViewLink: string }>;
// }

// const EventForm = () => {
//   const clientId = process.env.REACT_APP_CLIENT_ID;
//   const developerKey = process.env.REACT_APP_DEVELOPER_KEY;

//   const formatDate = (date: Date) => {
//     const offset = date.getTimezoneOffset();
//     const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
//     return adjustedDate.toISOString().slice(0, 16);
//   };

//   const location = useLocation();
//   const { startDate } = location.state || {};
//   const { register, control, handleSubmit, setError, clearErrors, watch,formState: { errors }, setValue } = useForm<Event>({
//     defaultValues: {
//       emails: [{ address: '' }],
//       startDate: startDate ? formatDate(new Date(startDate)) : formatDate(new Date()), // Format the date correctly
//       driveFiles: [],
//     }
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'emails',
//   });

//   const [events, setEvents] = useState<Event | null>(null);
//   const [action, setAction] = useState(false);
//   const { eventId } = useParams();
//   const navigate = useNavigate();

//   const [fileList, setFileList] = useState([]);
 

//   const validateFiles = (files:any) => {
//     let valid = true;
//     let fileArray = Array.from(files);

//     fileArray.forEach((file:any) => {
//       if (file.size > MAX_FILE_SIZE) {
//         valid = false;
//       }
//     });

//     return valid || "Files must be less than 20MB each";
//   };
//   const handleFileChange = (e:any) => {
//     const files = Array.from(e.target.files);
//     const validFiles = files.filter((file:any) => file.size <= MAX_FILE_SIZE);

//     if (files.length !== validFiles.length) {
//       setError('file', {
//         type: 'manual',
//         message: 'One or more files exceed the 20MB limit',
//       });
//     } else {
//       clearErrors('file');
//     }

//     const newFileList:any = [...fileList, ...validFiles];
//     setFileList(newFileList);
//     setValue('file', newFileList);
//   };
//   const removeFile = (fileName:any) => {
//     const updatedFileList:any = fileList.filter((file:any) => file.name !== fileName);
//     setFileList(updatedFileList);
//     setValue('file', updatedFileList);
//   };
//   const removeDriveFile = (fileId: string) => {
//     const updatedDriveFiles = watch('driveFiles')?.filter((file: any) => file.id !== fileId);
//     setValue('driveFiles', updatedDriveFiles);
//   };
  

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
//       const formData = new FormData();
//       formData.append('name', data.name);
//       formData.append('summary', data.summary);
//       formData.append('startDate', data.startDate);
//       formData.append('endDate', data.endDate);
//       formData.append('description', data.description);
//       formData.append('redirectUrl', data.redirectUrl);
//       formData.append('recurrence', data.recurrence);
//       data.emails.forEach((email, index) => {
//         formData.append(`emails[${index}][address]`, email.address);
//       });
//       // fileList.forEach((file, index) => {
//       //   formData.append(`files[${index}]`, file);
//       // });
//       fileList.forEach((file) => {
//         formData.append('files', file);
//       });
//       // if (data.driveFileId) {
//       //   formData.append('driveFileId', data.driveFileId); // Handle file selected from Google Drive
//       // }
//       data.driveFiles?.forEach((file:any, index:any) => {
//         formData.append(`driveFiles[${index}][id]`, file.id);
//         formData.append(`driveFiles[${index}][name]`, file.name);
//       });
//       // if (data.driveFileId) {
//       //   formData.append('driveFileId', data.driveFileId);
//       // }
//       const config = { headers: { 'Content-Type': 'multipart/form-data' } };

//       if (action) {
//         await commonApi.post(`/event/${eventId}/update`, formData, config);
//         alert('Event updated successfully');
//       } else {
//         await commonApi.post('/create/event', formData, config);
//         alert('Event created successfully');
//       }
//       navigate('/events');
//     } catch (error) {
//       console.error('Error creating/updating event:', error);
//       alert('Failed to create/update event');
//     }
//   };

//   const onDelete = async () => {
//     try {
//       await commonApi.delete(`/event/${eventId}/delete`);
//       alert('Event deleted successfully');
//       navigate('/events'); // Redirect to events page
//     } catch (error) {
//       console.error('Error deleting event:', error);
//       alert('Failed to delete event');
//     }
//   };

//   const loadPicker = () => {
//     const oauthToken = localStorage.getItem('token'); // Use token from local storage
  
//     const picker = new window.google.picker.PickerBuilder()
//       .addView(window.google.picker.ViewId.DOCS) // Add views as needed
//       .setOAuthToken(oauthToken)
//       .setDeveloperKey(developerKey) // Use developer key from environment variable
//       .setCallback(pickerCallback)
//       .build();
//     picker.setVisible(true);
//   };
  

//   // const pickerCallback = (data: any) => {
//   //   if (data.action === window.google.picker.Action.PICKED) {
//   //     const file = data.docs[0];
//   //     console.log('Selected file:', file);
//   //     setValue('driveFileId', file.id);
//   //   }
//   // };
//   const pickerCallback = (data: any) => {
//     console.log('Picker callback data:', data);
  
//     if (data[window.google.picker.Response.ACTION] === window.google.picker.Action.PICKED) {
//       const files = data[window.google.picker.Response.DOCS] || []; // Default to an empty array if undefined
  
//       if (Array.isArray(files)) {
//         // Map the files to an array of objects containing file metadata
//         const newFiles = files.map((file: any) => ({
//           id: file.id,
//           name: file.name,
//           webViewLink: file[window.google.picker.DocumentProperties.VIEW_URL],
//         }));
  
//         // Update state with selected files
//         setValue('driveFiles', newFiles);
//       } else {
//         console.error('Unexpected data structure:', files);
//       }
//     }
//   };
  
  

//   useEffect(() => {
//     const loadPickerScript = () => {
//       const script = document.createElement('script');
//       script.src = 'https://apis.google.com/js/api.js';
//       script.onload = () => {
//         window.gapi.load('auth', { callback: onAuthApiLoad });
//         window.gapi.load('picker', { callback: onPickerApiLoad });
//       };
//       document.body.appendChild(script);
//     };

//     const onAuthApiLoad = () => {
//       window.gapi.auth.authorize(
//         {
//           client_id: clientId, // Use client ID from environment variable
//           scope: ['https://www.googleapis.com/auth/drive.file'],
//           immediate: false,
//         },
//         handleAuthResult
//       );
//     };

//     const onPickerApiLoad = () => {
//       // Picker API loaded
//     };

//     const handleAuthResult = (authResult: any) => {
//       if (authResult && !authResult.error) {
//         localStorage.setItem('token', authResult.access_token);
//       }
//     };

//     loadPickerScript();
//   }, []);

//   return (
//     <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 p-10">
//         <h2 className="text-center text-3xl font-extrabold text-gray-900">{action ? 'Edit Event' : 'Create Event'}</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
//             <label className="text-sm font-medium text-gray-700">Start Date</label>
//             <input
//               type="datetime-local"
//               {...register('startDate', { required: 'Start date is required' })}
//               className={`inputboxstyling sm:text-sm ${errors.startDate ? 'border-red-500' : ''}`}
//             />
//             {errors.startDate && <div className="text-red-500 text-sm mt-1">{errors.startDate.message}</div>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">End Date</label>
//             <input
//               type="datetime-local"
//               {...register('endDate', { required: 'End date is required' })}
//               className={`inputboxstyling sm:text-sm ${errors.endDate ? 'border-red-500' : ''}`}
//             />
//             {errors.endDate && <div className="text-red-500 text-sm mt-1">{errors.endDate.message}</div>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">Redirect Url</label>
//             <input
//               type="text"
//               {...register('redirectUrl', { required: 'Redirect URL is required' })}
//               className={`inputboxstyling sm:text-sm ${errors.redirectUrl ? 'border-red-500' : ''}`}
//             />
//             {errors.redirectUrl && <div className="text-red-500 text-sm mt-1">{errors.redirectUrl.message}</div>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">Recurrence</label>
//             <select
//               {...register('recurrence', { required: 'Recurrence is required' })}
//               className={`inputboxstyling sm:text-sm ${errors.recurrence ? 'border-red-500' : ''}`}
//             >
//               <option value="">Select Recurrence</option>
//               <option value="daily">Daily</option>
//               <option value="weekly">Weekly</option>
//               <option value="monthly">Monthly</option>
//               <option value="yearly">Yearly</option>
//             </select>
//             {errors.recurrence && <div className="text-red-500 text-sm mt-1">{errors.recurrence.message}</div>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">Email Addresses</label>
//             {fields.map((field, index) => (
//               <div key={field.id} className="flex items-center">
//                 <input
//                   type="text"
//                   {...register(`emails.${index}.address` as const, { required: 'Email address is required' })}
//                   className={`inputboxstyling sm:text-sm ${errors.emails?.[index]?.address ? 'border-red-500' : ''}`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => remove(index)}
//                   className="ml-2 p-1 text-white bg-red-500 rounded"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => append({ address: '' })}
//               className="mt-2 p-1 text-white bg-black rounded"
//             >
//               Add Email
//             </button>
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">Attach File</label>
//             <input
//           type="file"
//           multiple
//           {...register('file', {
//             validate: validateFiles
//           })}
//           className="inputboxstyling sm:text-sm"
//           onChange={handleFileChange}
//         />
//         {errors.file && <p className="text-red-500 text-sm">{errors.file.message}</p>}
//       </div>

//       <div className="mt-4">

//         <h3 className="text-sm font-medium text-gray-700">Attached Files:</h3>
       
//         <ul>
//           {fileList.map((file:any, index) => (
//             <li key={index} className="text-sm text-gray-700 flex justify-between items-center">
//               {file.name}
//               <button
//                 type="button"
//                 className="ml-4 p-1 bg-red-500 text-white rounded"
//                 onClick={() => removeFile(file.name)}
//               >
//                 Remove
//               </button>
//             </li>
//           ))}
//         </ul>

//         {watch('driveFiles')?.map((file: any, index: number) => (
//       <li key={`drive-file-${index}`} className="text-sm text-gray-700 flex justify-between items-center">
//         {file.name}
//         <a href={file.webViewLink} target="_blank" rel="noopener noreferrer" className="ml-4 text-blue-500">View</a>
//         <button
//           type="button"
//           className="ml-4 p-1 bg-red-500 text-white rounded"
//           onClick={() => removeDriveFile(file.id)}
//         >
//           Remove
//         </button>
//       </li>))}
//         </div>

//           <div className="flex justify-between">
//             <button
//               type="submit"
//               className="flex-1 mr-2 justify-center font-medium text-white btnprimary"
//             >
//               {action ? 'Update Event' : 'Create Event'}
//             </button>
//             {action && (
//               <button
//                 type="button"
//                 onClick={onDelete}
//                 className="flex-1 ml-2 justify-center font-medium text-white btnsecondary bg-red-500"
//               >
//                 Delete Event
//               </button>
//             )}
//           </div>
//         </form>
//         <button
//           type="button"
//           onClick={loadPicker}
//           className="mt-4 p-2 text-white bg-black rounded"
//         >
//           Attach File from Drive
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EventForm;

import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { commonApi } from '../services/api';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
interface Email {
  address: string;
}

interface Event {
  name: string;
  summary: string;
  startDate: string;
  endDate: string;
  description: string;
  emails: Email[];
  redirectUrl: string;
  recurrence: string;
  file?: FileList;
  driveFiles?:GooglePickerFile[];
}

interface GooglePickerFile {
  id: string;
  name: string;
  webViewLink: string;
}

const EventForm = () => {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const developerKey = process.env.REACT_APP_DEVELOPER_KEY;

  const formatDate = (date: Date) => {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
    return adjustedDate.toISOString().slice(0, 16);
  };

  const location = useLocation();
  const { startDate } = location.state || {};
  const { register, control, handleSubmit, setError, clearErrors, watch, formState: { errors }, setValue } = useForm<Event>({
    defaultValues: {
      emails: [{ address: '' }],
      startDate: startDate ? formatDate(new Date(startDate)) : formatDate(new Date()),
      driveFiles: [] as GooglePickerFile[], 
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'emails',
  });

  const [events, setEvents] = useState<Event | null>(null);
  const [action, setAction] = useState(false);
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<File[]>([]);
  const [selectedDriveFiles, setSelectedDriveFiles] = useState<GooglePickerFile[]>([]);

  const validateFiles = (files: FileList) => {
    let valid = true;
    const fileArray = Array.from(files);

    fileArray.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        valid = false;
      }
    });

    return valid || "Files must be less than 5MB each";
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (files) {
  //     const fileArray = Array.from(files);
  //     const validFiles = fileArray.filter(file => file.size <= MAX_FILE_SIZE);

  //     if (fileArray.length !== validFiles.length) {
  //       setError('file', {
  //         type: 'manual',
  //         message: 'One or more files exceed the 5MB limit',
  //       });
  //     } else {
  //       clearErrors('file');
  //     }

  //     setFileList(prevFileList => [...prevFileList, ...validFiles]);
  //     setValue('file', validFiles);
  //   }
  // };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const validFiles:any = fileArray.filter(file => file.size <= MAX_FILE_SIZE);
  
      if (fileArray.length !== validFiles.length) {
        setError('file', {
          type: 'manual',
          message: 'One or more files exceed the 5MB limit',
        });
      } else {
        clearErrors('file');
      }
  
      setFileList(prevFileList => [...prevFileList, ...validFiles]);
      // Update the form state directly if you’re not using FileList
      setValue('file', validFiles);
    }
  };
  
  const removeFile = (fileName: string) => {
    console.log("sda")
    // setFileList(prevFileList => prevFileList.filter(file => file.name !== fileName));
    // setValue('file', fileList.filter(file => file.name !== fileName));
  };

  const removeDriveFile = (fileId: string) => {
    const updatedDriveFiles = watch('driveFiles')?.filter((file: any) => file.id !== fileId);
    setValue('driveFiles', updatedDriveFiles);
  };

  const getSingleEventDetails = async (id: string) => {
    try {
      const response = await commonApi.get(`/event/${id}/get`);
      const formattedData = { ...response.data };

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
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('summary', data.summary);
      formData.append('startDate', data.startDate);
      formData.append('endDate', data.endDate);
      formData.append('description', data.description);
      formData.append('redirectUrl', data.redirectUrl);
      formData.append('recurrence', data.recurrence);

      data.emails.forEach((email, index) => {
        formData.append(`emails[${index}][address]`, email.address);
      });

      fileList.forEach(file => {
        formData.append('files', file);
      });

      data.driveFiles?.forEach((file, index) => {
        formData.append(`driveFiles[${index}][id]`, file.id);
        formData.append(`driveFiles[${index}][name]`, file.name);
        formData.append(`driveFiles[${index}][webViewLink]`, file.webViewLink);
      });

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };

      if (action) {
        await commonApi.post(`/event/${eventId}/update`, formData, config);
        alert('Event updated successfully');
      } else {
        await commonApi.post('/create/event', formData, config);
        alert('Event created successfully');
      }
      navigate('/events');
    } catch (error) {
      console.error('Error creating/updating event:', error);
      alert('Failed to create/update event');
    }
  };

  const onDelete = async () => {
    try {
      await commonApi.delete(`/event/${eventId}/delete`);
      alert('Event deleted successfully');
      navigate('/events');
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event');
    }
  };

  const loadPicker = () => {
    const oauthToken = localStorage.getItem('token');

    const picker = new window.google.picker.PickerBuilder()
      .addView(window.google.picker.ViewId.DOCS)
      .setOAuthToken(oauthToken)
      .setDeveloperKey(developerKey)
      .setCallback(pickerCallback)
      .enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED)
      .build();
    picker.setVisible(true);

console.log(window.google.picker.Feature.MULTISELECT_ENABLED)

//     const picker = new window.google.picker.PickerBuilder()
//   .addView(window.google.picker.ViewId.DOCS)
//   .setOAuthToken(oauthToken)
//   .setDeveloperKey(developerKey)
//   .setCallback(pickerCallback)
//   .enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED)
//   .build();
// picker.setVisible(true);

  };

  // const pickerCallback = (data: any) => {
  //   console.log('Picker callback data:', data);

  //   if (data[window.google.picker.Response.ACTION] === window.google.picker.Action.PICKED) {
  //     const files = data[window.google.picker.Response.DOCS] || [];

  //     if (Array.isArray(files)) {
  //       const newFiles = files.map((file: any) => ({
  //         id: file.id,
  //         name: file.name,
  //         webViewLink: file[window.google.picker.DocumentProperties.VIEW_URL],
  //       }));

  //       setValue('driveFiles', (prevDriveFiles:any )=> {[...prevDriveFiles, ...newFiles]});
  //     } else {
  //       console.error('Unexpected data structure:', files);
  //     }
  //   }
  // };
  // const pickerCallback = (data: any) => {
  //   console.log('Picker callback data:', data);
  
  //   if (data[window.google.picker.Response.ACTION] === window.google.picker.Action.PICKED) {
  // //     const files = data[window.google.picker.Response.DOCS]  
  // //  as Array<{
  // //       id: string;
  // //       name: string;
  // //       [key: string]: any; // Allows for extra properties
  // //     }> || [];
  // const files = data[window.google.picker.Response.DOCS] || [];
  
  //     if (Array.isArray(files)) {
  //       const newFiles: GooglePickerFile[] = files.map((file) => ({
  //         id: file.id,
  //         name: file.name,
  //         webViewLink: file[window.google.picker.DocumentProperties.VIEW_URL] || '',
  //       }));
  
  //       // setValue('driveFiles', (prevDriveFiles: GooglePickerFile[] | undefined) => {
  //       //   return [...(prevDriveFiles || []), ...newFiles] as GooglePickerFile[];
  //       // });
  //       // setValue('driveFiles', [...(prevDriveFiles || []), ...newFiles]);
  //       setValue('driveFiles', [...newFiles]);
  //     } else {
  //       console.error('Unexpected data structure:', files);
  //     }
  //   }
  // };
  
  // const pickerCallback = (data: any) => {
  //   console.log('Picker callback data:', data);
  
  //   if (data[window.google.picker.Response.ACTION] === window.google.picker.Action.PICKED) {
  //     const files = data[window.google.picker.Response.DOCS]   
  //  || [];
  
  //     if (Array.isArray(files)) {
  //       const newFiles: GooglePickerFile[] = files.map((file) => ({
  //         id: file.id,
  //         name: file.name,
  //         webViewLink: file[window.google.picker.DocumentProperties.VIEW_URL] || '',
  //       }));
  
  //       // Update the form state directly with the array of files
  //       setValue('driveFiles', newFiles);
  //     } else {
  //       console.error('Unexpected data structure:', files);
  //     }
  //   }
  // };

 
  const pickerCallback = (data: any) => {
    if (data[window.google.picker.Response.ACTION] === window.google.picker.Action.PICKED) {
      const files = data.docs
   || [];
  
      if (Array.isArray(files)) {
        const newFiles: GooglePickerFile[] = files.map((file: any) => ({
          id: file.id,
          name: file.name,
          webViewLink: file.url || '',
        }));
  
        // Update selectedDriveFiles state efficiently
        setSelectedDriveFiles((prevFiles) => [...prevFiles, ...newFiles]); // Use spread operator for efficient concatenation
        console.log("selectedDriveFiles", selectedDriveFiles);
      } else {
        console.error('Unexpected data structure:', files);
      }
    }
  };
  useEffect(() => {
    const loadPickerScript = () => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => {
        window.gapi.load('auth', { callback: onAuthApiLoad });
        window.gapi.load('picker', { callback: onPickerApiLoad });
      };
      document.body.appendChild(script);
    };

    // const onAuthApiLoad = () => {
    //   window.gapi.auth.authorize(
    //     {
    //       client_id: clientId,
    //       scope: ['https://www.googleapis.com/auth/drive.file'],
    //       immediate: false,
    //     },
    //     handleAuthResult
    //   );
    // };
    const onAuthApiLoad = () => {
      window.gapi.auth.authorize(
        {
          client_id: clientId,
          scope: ['https://www.googleapis.com/auth/drive.readonly', 'https://www.googleapis.com/auth/drive.file'],
          immediate: false,
        },
        handleAuthResult
      );
    };

    const onPickerApiLoad = () => {
      // Picker API loaded
    };

    const handleAuthResult = (authResult: any) => {
      if (authResult && !authResult.error) {
        localStorage.setItem('token', authResult.access_token);
      }
    };

    loadPickerScript();
  }, [clientId, developerKey]);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10">
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
            <label className="text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="datetime-local"
              {...register('startDate', { required: 'Start date is required' })}
              className={`inputboxstyling sm:text-sm ${errors.startDate ? 'border-red-500' : ''}`}
            />
            {errors.startDate && <div className="text-red-500 text-sm mt-1">{errors.startDate.message}</div>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">End Date</label>
            <input
              type="datetime-local"
              {...register('endDate', { required: 'End date is required' })}
              className={`inputboxstyling sm:text-sm ${errors.endDate ? 'border-red-500' : ''}`}
            />
            {errors.endDate && <div className="text-red-500 text-sm mt-1">{errors.endDate.message}</div>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Redirect Url</label>
            <input
              type="text"
              {...register('redirectUrl', { required: 'Redirect URL is required' })}
              className={`inputboxstyling sm:text-sm ${errors.redirectUrl ? 'border-red-500' : ''}`}
            />
            {errors.redirectUrl && <div className="text-red-500 text-sm mt-1">{errors.redirectUrl.message}</div>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Recurrence</label>
            <select
              {...register('recurrence', { required: 'Recurrence is required' })}
              className={`inputboxstyling sm:text-sm ${errors.recurrence ? 'border-red-500' : ''}`}
            >
              <option value="">Select Recurrence</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            {errors.recurrence && <div className="text-red-500 text-sm mt-1">{errors.recurrence.message}</div>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Email Addresses</label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center">
                <input
                  type="text"
                  {...register(`emails.${index}.address` as const, { required: 'Email address is required' })}
                  className={`inputboxstyling sm:text-sm ${errors.emails?.[index]?.address ? 'border-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="ml-2 p-1 text-white bg-red-500 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ address: '' })}
              className="mt-2 p-1 text-white bg-black rounded"
            >
              Add Email
            </button>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Attach File</label>
            <input
              type="file"
              multiple
              {...register('file', {
                
              })}
              className="inputboxstyling sm:text-sm"
              onChange={handleFileChange}
            />
            {errors.file && <p className="text-red-500 text-sm">{errors.file.message}</p>}
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700">Attached Files:</h3>
            <ul>
              {fileList.map((file, index) => (
                <li key={index} className="text-sm text-gray-700 flex justify-between items-center">
                  {file.name}
                  <button
                    type="button"
                    className="ml-4 p-1 bg-red-500 text-white rounded"
                    onClick={() => removeFile(file.name)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-medium text-gray-700 mt-4">Attached Drive Files:</h3>
            <ul>
              {watch('driveFiles')?.map((file: any, index: number) => (
                <li key={`drive-file-${index}`} className="text-sm text-gray-700 flex justify-between items-center">
                  {file.name}
                  <a href={file.webViewLink} target="_blank" rel="noopener noreferrer" className="ml-4 text-blue-500">View</a>
                  <button
                    type="button"
                    className="ml-4 p-1 bg-red-500 text-white rounded"
                    onClick={() => removeDriveFile(file.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
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
        <button
          type="button"
          onClick={loadPicker}
          className="mt-4 p-2 text-white bg-black rounded"
        >
          Attach File from Drive
        </button>
      </div>
    </div>
  );
};

export default EventForm;

