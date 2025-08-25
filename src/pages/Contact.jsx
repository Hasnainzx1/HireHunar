import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // TODO: Send formData to API here...

    // Show success dialog
    setDialogOpen(true);

    // Clear form (optional)
    setFormData({
      fullName: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 font-sans text-gray-800">
      <h1 className="text-3xl font-bold text-blue-700 text-center mb-10">
        Contact Us
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-white shadow-md rounded-xl border border-gray-200 p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-600">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Subject */}
          <div className="flex flex-col md:col-span-2">
            <label className="mb-2 text-sm font-semibold text-gray-600">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Your subject here"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Message */}
          <div className="flex flex-col md:col-span-2">
            <label className="mb-2 text-sm font-semibold text-gray-600">Message</label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message..."
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-10 py-3 rounded-lg shadow-md transition"
          >
            Send Message
          </button>
        </div>
      </form>

      {/* Success Dialog */}
      <Dialog
  open={dialogOpen}
  onClose={() => setDialogOpen(false)}
  PaperProps={{
    sx: {
      borderRadius: '20px',
      backgroundColor: '#f9fafe',
      padding: 3,
      boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
      width: '90%',
      maxWidth: '400px',
    },
  }}
>
  <DialogTitle
    sx={{
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#2563eb',
      textAlign: 'center',
    }}
  >
    ✅ Form Submitted
  </DialogTitle>

  <DialogContent
    sx={{
      fontSize: '1rem',
      color: '#374151',
      textAlign: 'center',
      py: 2,
    }}
  >
    Thank you! We will get back to you shortly.
  </DialogContent>

  <DialogActions sx={{ justifyContent: 'center' }}>
    <Button
      onClick={() => setDialogOpen(false)}
      variant="contained"
      sx={{
        backgroundColor: '#2563eb',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '8px',
        px: 4,
        '&:hover': {
          backgroundColor: '#1e40af',
        },
      }}
    >
      OK
    </Button>
  </DialogActions>
</Dialog>
    </div>
  );
};

export default Contact;
