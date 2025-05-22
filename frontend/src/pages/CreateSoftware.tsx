import React, { useState } from 'react';
import axios from '../api/axios';

const CreateSoftware = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [accessLevels, setAccessLevels] = useState('');
  const [message, setMessage] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/software', {
        name,
        description,
        accessLevels: accessLevels.split(',').map(level => level.trim()),
      });
      setMessage('Software created successfully!');
      setName('');
      setDescription('');
      setAccessLevels('');
    } catch (err: any) {
      setMessage(err.response?.data?.error || 'Failed to create software');
    }
  };

  return (
    <form onSubmit={handleCreate}>
      <h2>Create Software</h2>
      {message && <p>{message}</p>}
      <input placeholder="Software Name" value={name} onChange={e => setName(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
      <input placeholder="Access Levels (comma-separated: Read,Write,Admin)" value={accessLevels} onChange={e => setAccessLevels(e.target.value)} required />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateSoftware;
