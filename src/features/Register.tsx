import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { commonApi } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

interface Register {
  firstName: string,
  lastName: string,
  email: string,
  companyName:string,
  role:string
}

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Register>();
  const navigate = useNavigate();


  const onSubmit = async (data: any) => {
    console.log("data", data)

  }

  return (

    <div>
      <h2 className="text-center text-3xl font-extrabold text-gray-900">Registration Form</h2>
      <div className="min-h-screen flex  justify-center py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                {...register('firstName', { required: 'First Name is required' })}
                className={`inputboxstyling sm:text-sm ${errors.firstName ? 'border-red-500' : ''}`}
              />
              {errors.firstName && <div className="text-red-500 text-sm mt-1">{errors.firstName.message}</div>}
            </div>
            <div className="flex flex-col mt-2">
              <label className="text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                {...register('lastName', { required: 'Last Name is required' })}
                className={`inputboxstyling sm:text-sm ${errors.lastName ? 'border-red-500' : ''}`}
              />
              {errors.lastName && <div className="text-red-500 text-sm mt-1">{errors.lastName.message}</div>}
            </div>
            <div className="flex flex-col mt-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="text"
                {...register('email', { required: 'Email is required' })}
                className={`inputboxstyling sm:text-sm ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email.message}</div>}
            </div>
            <div className="flex flex-col mt-2">
              <label className="text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                {...register('companyName', { required: 'Company Name is required' })}
                className={`inputboxstyling sm:text-sm ${errors.companyName ? 'border-red-500' : ''}`}
              />
              {errors.companyName && <div className="text-red-500 text-sm mt-1">{errors.companyName.message}</div>}
            </div>
            <div className="flex flex-col mt-2">
              <label className="text-sm font-medium text-gray-700">Role</label>
              <input
                type="text"
                {...register('role', { required: 'Role is required' })}
                className={`inputboxstyling sm:text-sm ${errors.role ? 'border-red-500' : ''}`}
              />
              {errors.role && <div className="text-red-500 text-sm mt-1">{errors.role.message}</div>}
            </div>
            <div className='flex justify-center items-center mt-6'>
              <button type="submit" className="btnprimary  text-white font-bold py-2 px-4 rounded">{'Save'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

}

export default Register;
