import React, { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaStar, FaRegStar } from 'react-icons/fa';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Snackbar, Alert, Box,
  IconButton, Chip, Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { db } from "../firebase";
import { collection, addDoc, onSnapshot, serverTimestamp } from "firebase/firestore";

// Styled components for better UI
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '16px',
    padding: '8px',
  },
}));

const StyledRating = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '4px',
  margin: '16px 0',
}));

const StyledCard = styled(Box)(({ theme }) => ({
  background: 'white',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
  },
}));

const Reviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reviews, setReviews] = useState([]);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const [newReview, setNewReview] = useState({
    company: '',
    reviewer: '',
    rating: 0,
    comment: '',
  });

  // 🔹 Fetch reviews live from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "reviews"), (snapshot) => {
      const reviewData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort by creation date (newest first)
      reviewData.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
      setReviews(reviewData);
    });
    return () => unsubscribe();
  }, []);

  const filteredReviews = reviews.filter((review) =>
    review.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDialogOpen = () => setOpenFormDialog(true);
  const handleDialogClose = () => setOpenFormDialog(false);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Submit review into Firestore
  const handleSubmitReview = async () => {
    try {
      await addDoc(collection(db, "reviews"), {
        ...newReview,
        createdAt: serverTimestamp()
      });

      setNewReview({ company: '', reviewer: '', rating: 0, comment: '' });
      setOpenFormDialog(false);
      setOpenSuccessDialog(true);
    } catch (err) {
      console.error("Error adding review:", err);
    }
  };

  // Generate random color for avatar
  const generateColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 50%)`;
  };

  // Get initials from name
  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-10 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 text-center mb-4">
          Company Reviews
        </h1>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Discover what people are saying about companies or share your own experience
        </p>

        
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 justify-between items-center mb-12">
          <div className="flex items-center flex-1 bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
            <div className="px-4 text-blue-600">
              <FiSearch className="text-xl" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search reviews by company name..."
              className="w-full px-2 py-4 text-base focus:outline-none placeholder-gray-400 font-medium"
            />
            {searchTerm && (
              <IconButton onClick={() => setSearchTerm('')} className="mr-2">
                <FiX className="text-gray-400" />
              </IconButton>
            )}
          </div>

          <button
            onClick={handleDialogOpen}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <AiOutlinePlus className="text-xl" />
            Add Review
          </button>
        </div>

        {/* Stats Bar */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl p-4 shadow-sm mb-10 flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Total Reviews:</span>
            <span className="font-bold text-blue-700">{reviews.length}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Showing:</span>
            <span className="font-bold text-blue-700">{filteredReviews.length} results</span>
          </div>
          {searchTerm && (
            <Chip 
              label={`Search: "${searchTerm}"`} 
              onDelete={() => setSearchTerm('')}
              color="primary"
              variant="outlined"
            />
          )}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <StyledCard key={review.id}>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-blue-800">{review.company}</h3>
                  <Avatar 
                    sx={{ 
                      bgcolor: generateColor(review.reviewer),
                      width: 32, 
                      height: 32,
                      fontSize: '0.875rem'
                    }}
                  >
                    {getInitials(review.reviewer)}
                  </Avatar>
                </div>
                
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    i < review.rating ? 
                    <FaStar key={i} className='text-yellow-500 text-lg' /> : 
                    <FaRegStar key={i} className='text-gray-300 text-lg' />
                  ))}
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-3">{review.comment}</p>
                
                <div className="flex items-center justify-between">
                  <p className="text-gray-500 text-xs">Reviewed by {review.reviewer}</p>
                  <p className="text-gray-400 text-xs">
                    {review.createdAt?.seconds ? 
                      new Date(review.createdAt.seconds * 1000).toLocaleDateString() : 
                      'Recently'}
                  </p>
                </div>
              </StyledCard>
            ))
          ) : (
            <div className="mt-20 text-center text-gray-500 text-lg italic col-span-full py-12 bg-white rounded-xl shadow-sm">
              {searchTerm ? 
                `No reviews found for "${searchTerm}". Try a different search term.` : 
                "No reviews to display yet. Be the first to add one!"
              }
            </div>
          )}
        </div>
      </div>

      {/* Form Dialog */}
      <StyledDialog open={openFormDialog} onClose={handleDialogClose}>
        <DialogTitle sx={{ 
          bgcolor: 'primary.main', 
          color: 'white',
          borderRadius: '12px 12px 0 0',
          margin: '-8px -8px 0 -8px'
        }}>
          Add a New Review
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TextField
            label="Company Name"
            name="company"
            fullWidth
            value={newReview.company}
            onChange={handleReviewChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Your Name"
            name="reviewer"
            fullWidth
            value={newReview.reviewer}
            onChange={handleReviewChange}
            margin="normal"
            variant="outlined"
          />
          
          <div className="mt-4 mb-2">Rating</div>
          <StyledRating>
            {[1, 2, 3, 4, 5].map((star) => (
              <IconButton
                key={star}
                onClick={() => setNewReview({...newReview, rating: star})}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                size="large"
              >
                {star <= (hoverRating || newReview.rating) ? (
                  <FaStar className="text-yellow-500 text-2xl" />
                ) : (
                  <FaRegStar className="text-gray-300 text-2xl" />
                )}
              </IconButton>
            ))}
          </StyledRating>
          
          <TextField
            label="Your Review"
            name="comment"
            multiline
            rows={4}
            fullWidth
            value={newReview.comment}
            onChange={handleReviewChange}
            margin="normal"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleDialogClose} color="inherit">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmitReview} 
            variant="contained" 
            disabled={!newReview.company || !newReview.reviewer || newReview.rating === 0}
          >
            Submit Review
          </Button>
        </DialogActions>
      </StyledDialog>

      {/* Success Snackbar */}
      <Snackbar
        open={openSuccessDialog}
        autoHideDuration={3000}
        onClose={() => setOpenSuccessDialog(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Review added successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Reviews;