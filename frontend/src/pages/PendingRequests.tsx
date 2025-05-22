import React, { useEffect, useState } from 'react';
import { 
  Box, Card, CardContent, Typography, Chip, Button, 
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, CircularProgress, Pagination, Alert
} from '@mui/material';
import axios from '../api/axios';
import { useAuth } from '../utils/auth';

interface Request {
  id: number;
  software: {
    name: string;
    description: string;
  };
  user: {
    username: string;
  };
  accessType: string;
  reason: string;
  status: string;
  createdAt: string;
}

interface PaginationData {
  current: number;
  limit: number;
  total: number;
  pages: number;
}

const PendingRequests: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [comment, setComment] = useState('');
  const [pagination, setPagination] = useState<PaginationData>({
    current: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  const { user } = useAuth();

  const fetchRequests = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`/requests?page=${page}&status=Pending`);
      setRequests(response.data.requests);
      setPagination(response.data.pagination);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusUpdate = async (status: 'Approved' | 'Rejected') => {
    if (!selectedRequest) return;
    
    try {
      await axios.patch(`/requests/${selectedRequest.id}`, { 
        status, 
        comment 
      });
      setSelectedRequest(null);
      setComment('');
      fetchRequests(pagination.current);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update request');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Pending Access Requests
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box
        display="grid"
        gridTemplateColumns={{
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)'
        }}
        gap={3}
      >
        {requests.map((req) => (
          <Card key={req.id} elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {req.software.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {req.software.description}
              </Typography>
              <Typography variant="body2">
                Requested by: <strong>{req.user.username}</strong>
              </Typography>
              <Typography variant="body2">
                Access Level: <strong>{req.accessType}</strong>
              </Typography>
              <Typography variant="body2" paragraph>
                Submitted: {new Date(req.createdAt).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Reason: {req.reason}
              </Typography>
              
              <Box display="flex" gap={1}>
                <Button 
                  variant="contained" 
                  color="success"
                  onClick={() => setSelectedRequest(req)}
                >
                  Review
                </Button>
                <Chip 
                  label={req.status} 
                  color={req.status === 'Pending' ? 'warning' : 'success'} 
                />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {requests.length === 0 && !error && (
        <Typography textAlign="center" color="text.secondary" mt={4}>
          No pending requests found
        </Typography>
      )}

      {pagination.pages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination 
            count={pagination.pages} 
            page={pagination.current}
            onChange={(_, page) => fetchRequests(page)}
          />
        </Box>
      )}

      <Dialog 
        open={!!selectedRequest} 
        onClose={() => setSelectedRequest(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Review Access Request</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Comment"
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedRequest(null)}>
            Cancel
          </Button>
          <Button 
            onClick={() => handleStatusUpdate('Rejected')}
            color="error"
          >
            Reject
          </Button>
          <Button 
            onClick={() => handleStatusUpdate('Approved')}
            color="success"
          >
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PendingRequests;