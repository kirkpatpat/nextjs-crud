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

  useEffect(() => {
    if (id) {
      axios.get(`http://127.0.0.1:5000/api/items/${id}`)
        .then(response => {
          setItem(response.data);
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
    // Handle update
  };

  if (!item) return <p>Loading...</p>;

  return (
    <div className='bg-gray-900'>
      <div className="flex m-5">
        <a href="/" className="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
          </svg>
        </a>
      </div>

      <div className='m-auto w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'>
        <h1>{item.name}</h1>
        <p>{item.description}</p>
        <p>Price: ${item.price}</p>
        {error && <p>{error}</p>}
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default ItemDetailPage;
