"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

const HomePage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/items')
      .then(response => setItems(response.data))
      .catch(() => setError('Failed to load items'));
  }, []);

  return (
    <div className='bg-gray-900'>
      <h1 className='text-5xl text-center p-5 bg-gray-800'>ITEMS</h1>

      <div className='m-10'>
        {error && <p>{error}</p>}

        <Link className='w-full text-white bg-blue-700 hover:bg-blue-800 rounded-2xl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' href="/create-item">
          Create New Item
        </Link>

        <ul className='mt-10 list-none max-w divide-y divide-gray-200 dark:divide-gray-700'>
          {items.map(item => (
            <li key={item.id} className='pb-3 sm:pb-4 pt-4 sm:pt-4'>
              <Link href={`/item/${item.id}`}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
