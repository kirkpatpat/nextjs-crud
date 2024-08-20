"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

const ItemDetailPage = () => {
  const { id } = useParams(); // Get the ID from the URL
  const router = useRouter();
  const [item, setItem] = useState<Item | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState<number | string>('');

  useEffect(() => {
    if (id) {
      axios.get(`https://nextjs-crud-pearl.vercel.app/api/items/${id}`)
        .then(response => {
          setItem(response.data);
          setUpdatedName(response.data.name);
          setUpdatedDescription(response.data.description);
          setUpdatedPrice(response.data.price);
        })
        .catch(() => {
          setError('Failed to fetch item');
        });
    }
  }, [id]);

  const handleDelete = () => {
    if (item?.id) {
      axios.delete(`http://127.0.0.1:5000/api/items/${item.id}`)
        .then(() => router.push('/'))
        .catch(() => setError('Failed to delete item'));
    }
  };

  const handleUpdate = () => {
    if (item?.id) {
      axios.put(`http://127.0.0.1:5000/api/items/${item.id}`, {
        name: updatedName,
        description: updatedDescription,
        price: updatedPrice,
      })
        .then(response => {
          setItem(response.data); // Update the local state with the new data
          setIsEditing(false);
          router.refresh(); // Refresh the page to ensure the changes are displayed
        })
        .catch(() => setError('Failed to update item'));
    }
  };
  

  if (!item) return <p>Loading...</p>;

  return (
    <div className='bg-gray-900'>
      <h1 className='text-5xl text-center p-5 bg-gray-800'>{item.name}</h1>
      <div className="flex m-5">
        <a href="/" className="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
          </svg>
        </a>
      </div>

      <div className='m-auto w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'>
        {isEditing ? (
          <div>
            <h5 className='text-center text-xl font-medium text-gray-900 dark:text-white'>EDIT ITEM</h5>
            <form className='space-y-6' onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Name</label>
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Description</label>
                <textarea
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Price</label>
                <input
                  type="number"
                  value={updatedPrice}
                  onChange={(e) => setUpdatedPrice(parseFloat(e.target.value))}
                  className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">Save</button>
              <button
                type="button"
                className="mt-4 ml-2 p-2 bg-gray-500 text-white rounded"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        ) : (
          <div className='space-y-6'>
            <div>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Name:</label>
              <p className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'>{item.name}</p>
            </div>
            <div>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Description:</label>
              <p className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'>{item.description}</p>
            </div>
            <div>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Price:</label>
              <p className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'>Price: ${item.price}</p>
            </div>
            {error && <p>{error}</p>}
            <button onClick={() => setIsEditing(true)} className="mt-4 p-2 bg-blue-500 text-white rounded">Edit</button>
            <button onClick={handleDelete} className="mt-4 ml-2 p-2 bg-red-500 text-white rounded">Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetailPage;
