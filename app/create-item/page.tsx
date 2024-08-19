"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const CreateItemPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || price === null || price <= 0) {
      setError('Please enter a valid name and positive price');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:5000/api/items', {
        name,
        description,
        price
      });
      router.push('/');
    } catch (error) {
      setError('Failed to create item');
    }
  };

  return (
    <div>
      <h1>Create Item</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" value={price ?? ''} onChange={e => setPrice(parseFloat(e.target.value))} required />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateItemPage;
