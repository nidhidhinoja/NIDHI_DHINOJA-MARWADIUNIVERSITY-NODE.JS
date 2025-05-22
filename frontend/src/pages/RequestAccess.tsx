import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, TextField, MenuItem, Button, Alert, Paper } from '@mui/material';
import axios from '../api/axios';

const RequestAccess = () => {
  const [softwareList, setSoftwareList] = useState([]);
  const [softwareId, setSoftwareId] = useState('');
  const [accessType, setAccessType] = useState('Read');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSoftware = async () => {
      const res = await axios.get('/software');
      setSoftwareList(res.data);
    };
    fetchSoftware();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/requests', {
        softwareId,
        accessType,
        reason,
      });
      setMessage('Request submitted!');
      setReason('');
    } catch (err: any) {
      setMessage(err.response?.data?.error || 'Failed to submit request');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Request Software Access
          </Typography>
          
          {message && <Alert severity={message.includes('Failed') ? 'error' : 'success'}>{message}</Alert>}
          
          <TextField
            select
            label="Select Software"
            value={softwareId}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSoftwareId(e.target.value)}
            required
            fullWidth
          >
            <MenuItem value="">Select Software</MenuItem>
            {softwareList.map((s: any) => (
              <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Access Type"
            value={accessType}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setAccessType(e.target.value)}
            fullWidth
          >
            {['Read', 'Write', 'Admin'].map(type => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </TextField>

          <TextField
            label="Reason"
            multiline
            rows={4}
            value={reason}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setReason(e.target.value)}
            required
            fullWidth
          />

          <Button 
            type="submit" 
            variant="contained" 
            size="large"
            sx={{ mt: 2 }}
          >
            Submit Request
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RequestAccess;
