import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { commonApi } from '../services/api';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
interface Email {
  address: string;
}
interface FileDetails {
  fileUrl: string;
  title: string;
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
  files?: File[];
  driveFiles?: GooglePickerFile[];
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

  const [eventData, setEvents] = useState<Event | any>(null);
  const [action, setAction] = useState(false);
  const [list, setList] = useState<any>([])
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<File[]>([]);
  const [attachmentType, setAttachmentType] = useState<string>('local'); 
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const validFiles: any = fileArray.filter(file => file.size <= MAX_FILE_SIZE);

      if (fileArray.length !== validFiles.length) {
        setError('files', {
          type: 'manual',
          message: 'One or more files exceed the 5MB limit',
        });
      } else {
        clearErrors('files');
      }

      setFileList(prevFileList => [...prevFileList, ...validFiles]);
      setValue('files', [...fileList, ...validFiles]); // Update the form state directly if you’re not using FileList
    }
  };

  const removeFile = (fileName: string) => {
    setFileList(prevFileList => prevFileList.filter(file => file.name !== fileName));
    setValue('files', fileList.filter(file => file.name !== fileName));
  };

  const removeDriveFile = (fileId: string) => {
    const currentDriveFiles = watch('driveFiles') || [];
    const updatedDriveFiles = currentDriveFiles.filter((file: GooglePickerFile) => file.id !== fileId);
    
    console.log("Removing file ID:", fileId);
    console.log("Updated Drive Files:", updatedDriveFiles);
  
    // Update the form state and local state to trigger re-render
    setValue('driveFiles', updatedDriveFiles);
    setSelectedDriveFiles(updatedDriveFiles);
  };

  const [initialValues, setInitialValues] = useState<Event | null>(null);

  const getSingleEventDetails = async (id: string) => {
    try {
      const response = await commonApi.get(`/event/${id}/get`);
      const formattedData = { ...response.data };
      setEvents(response.data);
      setInitialValues(formattedData); // Store initial values

      setList(response.data.file);
      if (formattedData.file) {
        setFileList(formattedData.file);
      }
      if (formattedData.driveFiles) {
        setSelectedDriveFiles(formattedData.driveFiles);
      }
      Object.keys(formattedData).forEach((key) => {
        setValue(key as keyof Event, formattedData[key as keyof Event]);
      });
      // ... rest of the function
    } catch (error: any) {
      console.error('Failed to fetch event details:', error);
      alert('Failed to fetch event details');
    }
  };



  // const getSingleEventDetails = async (id: string) => {
  //   console.log("id")
  //   try {
  //     const response = await commonApi.get(`/event/${id}/get`);
  //     const formattedData = { ...response.data };
  //     setEvents(response.data);

  //     setList(response.data.file)
  //     Object.keys(formattedData).forEach((key) => {
  //       setValue(key as keyof Event, formattedData[key as keyof Event]);
  //     });
  //     if (formattedData.file) {
  //       setFileList(formattedData.file);
  //     }
  //     if (formattedData.driveFiles) {
  //       setSelectedDriveFiles(formattedData.driveFiles);
  //     }
  //   } catch (error: any) {
  //     console.error('Failed to fetch event details:', error);
  //     alert('Failed to fetch event details');
  //   }
  // };

  useEffect(() => {
    if (eventId) {
      setAction(true);
      getSingleEventDetails(eventId);
    }
  }, [eventId]);
  const getChangedValues = (currentValues: Event): Partial<Event> => {
    if (!initialValues) return currentValues;
  
    const changedValues: any = {};
  
    Object.keys(currentValues).forEach((key) => {
      const typedKey = key as keyof Event;
      if (typedKey === 'files' || typedKey === 'driveFiles') {
        // Always include files and driveFiles if they exist in currentValues
        if (currentValues[typedKey]) {
          changedValues[typedKey] = currentValues[typedKey];
        }
      } else if (JSON.stringify(currentValues[typedKey]) !== JSON.stringify(initialValues[typedKey])) {
        changedValues[typedKey] = currentValues[typedKey];
      }
    });
  
    return changedValues;
  };

  const onSubmit = async (data: Event) => {
    try {
      console.log("ydsgdsa",data)
      const changedData = getChangedValues(data);
      const formData = new FormData();
  
      // Handle non-file data
      Object.keys(changedData).forEach((key) => {
        const value = changedData[key as keyof Event];
        if (key !== 'files' && key !== 'driveFiles') {
          if (Array.isArray(value)) {
            value.forEach((item, index) => {
              formData.append(`${key}[${index}]`, JSON.stringify(item));
            });
          } else if (value !== undefined && value !== null) {
            formData.append(key, value.toString());
          }
        }
      });
      data.emails.forEach((email, index) => {
        formData.append(`emails[${index}][address]`, email.address);
      });
      // Handle file uploads
      if (fileList && fileList.length > 0) {

        if(Array.isArray(fileList)){

        
        fileList.forEach((file:any) => {
          if(!file.fileUrl){
            formData.append('files', file);
          }
         
        });
      }
      }

    
  
      // Handle drive files
      if (changedData.driveFiles) {
        changedData.driveFiles.forEach((file: any) => {
          formData.append('driveFileId', file.id);
        });
      }
  
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  
      if (action) {
        await commonApi.patch(`/event/${eventId}`, formData, config);
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
  }

  const pickerCallback = (data: any) => {
    if (data[window.google.picker.Response.ACTION] === window.google.picker.Action.PICKED) {
      const files = data[window.google.picker.Response.DOCUMENTS] || [];
  
      if (Array.isArray(files)) {
        const newFiles: GooglePickerFile[] = files.map((file: any) => ({
          id: file.id,
          name: file.name,
          webViewLink: file.url || '',
        }));
  
        // Update the form state with the new files
        const currentDriveFiles = watch('driveFiles') || [];
        const updatedDriveFiles = [...currentDriveFiles, ...newFiles];
        setValue('driveFiles', updatedDriveFiles);
        setSelectedDriveFiles(updatedDriveFiles); // Also update the local state to ensure rendering
        console.log("Updated Drive Files:", updatedDriveFiles);
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
              <option value="not-repeat">Not Repeat</option>
              <option value="daily">Daily</option>
             <option value="weekly">Weekly</option>
            <option value="bi-weekly">Bi-Weekly</option>
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
          
          <div className="flex flex-col mt-4">
            <label className="text-sm font-medium text-gray-700">Attachment Type</label>
            <div className="flex items-center">
              <input
                type="radio"
                id="local"
                name="attachmentType"
                value="local"
                checked={attachmentType === 'local'}
                onChange={() => setAttachmentType('local')}
              />
              <label htmlFor="local" className="ml-2 text-sm font-medium text-gray-700">Local File</label>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                id="drive"
                name="attachmentType"
                value="drive"
                checked={attachmentType === 'drive'}
                onChange={() => setAttachmentType('drive')}
              />
              <label htmlFor="drive" className="ml-2 text-sm font-medium text-gray-700">Google Drive</label>
            </div>
          </div>

          {/* Conditionally render file input based on selection */}
          {attachmentType === 'local' && (
            <div className="flex flex-col mt-4">
              <label className="text-sm font-medium text-gray-700">Attawertych File</label>
              <input
                type="file"
                multiple
                {...register('files')}
                className="inputboxstyling sm:text-sm"
                onChange={handleFileChange}
              />
              {errors.files && <p className="text-red-500 text-sm">{errors.files.message}</p>}
            </div>
          )}

          {attachmentType === 'drive' && (
            <div className="mt-4">
              <button
                type="button"
                onClick={loadPicker}
                className="mt-4 p-2 text-white bg-black rounded"
              >
                Attach File from Drive
              </button>
            </div>
          )}

          {/* Display attached files */}
          {fileList.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700">Attached Files:</h3>
              <ul>
                {fileList.map((file:any, index) => (
                  <li key={index} className="text-sm text-gray-700 flex justify-between items-center">
                    {file.name? file.name :file.title}
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
            </div>
          )}

          {selectedDriveFiles.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700">Attached Drive Files:</h3>
              <ul>
                {selectedDriveFiles.map((file:any, index) => (
                  <li key={index} className="text-sm text-gray-700 flex justify-between items-center">
                    {file.name }
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
          )}

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
};

export default EventForm;
