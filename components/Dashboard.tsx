"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

const HomePage = () => {
  const { data: session } = useSession();

  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('https://nextjs-crud-pearl.vercel.app/api/items')
      .then(response => setItems(response.data))
      .catch(() => setError('Failed to load items'));
  }, []);

  return (

    <>
      {session ? (
        <>
          <div className='bg-gray-900'>
            <h1 className='text-5xl text-center p-5 bg-gray-800'>ITEMS</h1>
            

            <div className='m-10'>
              {error && <p>{error}</p>}

              <div>
                <Link className='absolute text-white bg-blue-700 hover:bg-blue-800 rounded-2xl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' href="/create-item">
                  Create New Item
                </Link>
                <button onClick={() => signOut()} className='absolute top-30 right-10 text-white bg-blue-700 hover:bg-blue-800 rounded-2xl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Sign out</button>
              </div>

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
        </>
      ) : (
        <>
        <div className='bg-gray-900'>
          <div className="m-auto mt-20 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-10 text-center text-xl font-medium text-gray-900 dark:text-white">Sign in</h5>
            <button
             className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
             onClick={() => signIn("google")}>Google</button>
          </div>
        </div>
        
        </>
      )}
    </>

    
  );
};

export default HomePage;
