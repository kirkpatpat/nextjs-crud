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
    <div className='bg-cyan-900'>
      <h1 className='text-5xl text-center p-5 bg-cyan-950'>ITEMS</h1>

      <div className='m-10'>
        {error && <p>{error}</p>}

        <Link className='p-5 bg-cyan-500 rounded-2xl' href="/create-item">
          Create New Item
        </Link>

        <ul className='mt-10 list-disc'>
          {items.map(item => (
            <li key={item.id}>
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
