import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';

const LogoutDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: '20px',
          padding: '20px',
          width: '100%',
          maxWidth: '420px',
          backgroundColor: '#f9fafb', // light gray
        },
      }}
    >
      <DialogTitle sx={{ fontSize: '1.5rem', color: '#1e40af', fontWeight: 'bold', textAlign: 'center' }}>
        Confirm Logout
      </DialogTitle>

      <DialogContent>
        <Typography sx={{ textAlign: 'center', color: '#334155', fontSize: '1rem' }}>
          Are you sure you want to log out from <strong>HireHunar</strong>?
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', mt: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: '10px',
            px: 4,
            color: '#1e40af',
            borderColor: '#1e40af',
            '&:hover': {
              backgroundColor: '#e0e7ff',
              borderColor: '#1e40af',
            },
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            borderRadius: '10px',
            px: 4,
            backgroundColor: '#1e40af',
            '&:hover': {
              backgroundColor: '#1e3a8a',
            },
          }}
        >
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutDialog;
