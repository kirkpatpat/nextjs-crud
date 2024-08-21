"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { BASE_API_URL } from '../utils/constants';

const CreateItemPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error state
    setError(null);

    if (!name || price === null || price <= 0) {
      setError('Please enter a valid name and positive price');
      return;
    }

    try {
      // Make the axios POST request
      await axios.post(`${BASE_API_URL}/api/items`, {
        name,
        description,
        price
      });

      // Reset form fields after successful submission
      setName('');
      setDescription('');
      setPrice(null);

      // Navigate to the home page
      router.push('/');
    } catch (error) {
      setError('Failed to create item');
    }
  };

  return (
    <div className='bg-gray-900'>
      <h1 className='text-5xl text-center p-5 bg-gray-800 mb-5'>CREATE ITEM</h1>

      <div className="flex mb-10 ml-5">
        <a href="/" className="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
          </svg>
        </a>
      </div>

      <div className='m-auto w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <div>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Name:</label>
            <input
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Description:</label>
            <textarea
              className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Price:</label>
            <input
              className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
              type="number"
              value={price !== null ? price : ''}
              onChange={e => setPrice(parseFloat(e.target.value))}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            type="submit"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateItemPage;
