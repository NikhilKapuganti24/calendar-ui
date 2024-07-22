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
import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { commonApi } from '../services/api';

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
  driveFileId?: string;
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
  const { register, control, handleSubmit, formState: { errors }, setValue } = useForm<Event>({
    defaultValues: {
      emails: [{ address: '' }],
      startDate: startDate ? formatDate(new Date(startDate)) : formatDate(new Date()), // Format the date correctly
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
      if (data.file && data.file[0]) {
        formData.append('file', data.file[0]); // Handle single file upload from desktop
      }
      if (data.driveFileId) {
        formData.append('driveFileId', data.driveFileId); // Handle file selected from Google Drive
      }

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
      navigate('/events'); // Redirect to events page
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event');
    }
  };

  const loadPicker = () => {
    const oauthToken = localStorage.getItem('token'); // Use token from local storage

    const picker = new window.google.picker.PickerBuilder()
      .addView(window.google.picker.ViewId.DOCS)
      .setOAuthToken(oauthToken)
      .setDeveloperKey(developerKey) // Use developer key from environment variable
      .setCallback(pickerCallback)
      .build();
    picker.setVisible(true);
  };

  const pickerCallback = (data: any) => {
    if (data.action === window.google.picker.Action.PICKED) {
      const file = data.docs[0];
      console.log('Selected file:', file);
      setValue('driveFileId', file.id);
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

    const onAuthApiLoad = () => {
      window.gapi.auth.authorize(
        {
          client_id: clientId, // Use client ID from environment variable
          scope: ['https://www.googleapis.com/auth/drive.file'],
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
  }, []);

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
              {...register('file')}
              className="inputboxstyling sm:text-sm"
            />
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
