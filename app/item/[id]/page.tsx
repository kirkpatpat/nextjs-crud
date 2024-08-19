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
    <div>
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <p>Price: ${item.price}</p>
      {error && <p>{error}</p>}
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ItemDetailPage;
