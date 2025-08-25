import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiLogOut, FiMapPin, FiDollarSign, FiBook, FiBriefcase, FiSearch,
  FiCheckCircle, FiX, FiClock, FiUser, FiAward, FiBookmark
} from 'react-icons/fi';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import LogoutDialog from '../components/LogoutDialog';
import { fetchJobs, applyForJob } from '../dbService';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Snackbar, Alert, Chip, IconButton
} from '@mui/material';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Fixed: searchTerm is now properly defined
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [openApplyDialog, setOpenApplyDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (!loggedIn) navigate('/auth');
  }, [navigate]);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const allJobs = await fetchJobs();
        setJobs(allJobs);
        setFilteredJobs(allJobs);
      } catch (error) {
        console.error("Error loading jobs:", error);
      }
    };
    loadJobs();
  }, []);

  // Handle search
  useEffect(() => {
    if (!searchTerm) {
      setFilteredJobs(jobs);
      return;
    }

    const filtered = jobs.filter(job =>
      (job.jobTitle && job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.companyName && job.companyName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.location && job.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.qualification && job.qualification.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.experience && job.experience.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.salary && job.salary.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setFilteredJobs(filtered);
  }, [searchTerm, jobs]);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    navigate('/auth');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Open Apply Dialog
  const handleOpenApply = (job) => {
    setSelectedJob(job);
    setOpenApplyDialog(true);
  };

  // Handle Apply Button
  const handleApply = async () => {
    if (!selectedJob) return;

    // 👇 yaha tumhara real user id chahiye (auth se)
    const userId = localStorage.getItem("userId") || "guestUser";

    const result = await applyForJob(selectedJob.id, userId);

    setSnackbar({
      open: true,
      message: result.message,
      severity: result.success ? "success" : "warning"
    });

    if (result.success) {
      setOpenApplyDialog(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-50 px-4 sm:px-6 py-8 font-sans text-gray-800 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Welcome to <span className="text-blue-600">HireHunar</span> 
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Empowering skilled individuals across Pakistan to find the right opportunities.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search jobs by title, company, location, qualification..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              {jobs.length === 0 ? 'Loading jobs...' : 'No jobs found'}
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredJobs.map((job) => <JobCard key={job.id} job={job} handleOpenApply={handleOpenApply} />)}
          </div>
        )}

        {/* Enhanced Apply Dialog */}
        <Dialog
          open={openApplyDialog}
          onClose={() => setOpenApplyDialog(false)}
          maxWidth="sm"
          fullWidth
          sx={{
            '& .MuiDialog-container': {
              alignItems: 'flex-start',
              marginTop: '20px',
            },
            '& .MuiPaper-root': {
              margin: '0',
              maxHeight: '70vh',
              borderRadius: '12px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
            }
          }}
        >
          <div className="relative">
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-4 text-white">
              <div className="flex justify-between items-start">
                <div className="pr-4">
                  <DialogTitle className="text-white p-0 text-lg font-bold">
                    {selectedJob?.jobTitle}
                  </DialogTitle>
                  <p className="text-blue-100 text-xs font-medium mt-1">{selectedJob?.companyName}</p>
                </div>
                <IconButton 
                  onClick={() => setOpenApplyDialog(false)} 
                  className="text-white hover:bg-white/10 transition-colors"
                  size="small"
                  sx={{ borderRadius: '6px' }}
                >
                  <FiX className="text-md" />
                </IconButton>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                <div className="bg-white/15 px-2 py-1 rounded text-xs flex items-center">
                  <FiMapPin className="mr-1 text-blue-200" />
                  <span>{selectedJob?.location}</span>
                </div>
                <div className="bg-white/15 px-2 py-1 rounded text-xs flex items-center">
                  <FiDollarSign className="mr-1 text-blue-200" />
                  <span>{selectedJob?.salary}</span>
                </div>
                <div className="bg-white/15 px-2 py-1 rounded text-xs flex items-center">
                  <FiAward className="mr-1 text-blue-200" />
                  <span>{selectedJob?.experience}</span>
                </div>
              </div>
            </div>

            <DialogContent dividers className="p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-semibold text-gray-700 mb-2 flex items-center uppercase tracking-wide">
                    <FiBook className="mr-2 text-blue-600 text-xs" />
                    Qualification Required
                  </h3>
                  <p className="text-gray-600 bg-blue-50 p-2 rounded text-sm border border-blue-100">
                    {selectedJob?.qualification}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-gray-700 mb-2 flex items-center uppercase tracking-wide">
                    <FiBriefcase className="mr-2 text-blue-600 text-xs" />
                    Job Description
                  </h3>
                  <p className="text-gray-600 bg-gray-50 p-2 rounded text-sm border border-gray-200">
                    {selectedJob?.description}
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-100 p-2 rounded">
                  <div className="flex items-start">
                    <FiClock className="h-3 w-3 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-xs text-blue-700">
                      Apply soon! This position may fill up quickly.
                    </p>
                  </div>
                </div>
              </div>
            </DialogContent>

            <DialogActions className="p-3 flex justify-end gap-2 border-t">
              <Button 
                onClick={() => setOpenApplyDialog(false)} 
                variant="outlined" 
                className="text-gray-600 hover:bg-gray-50 text-xs px-3 py-1 rounded border-gray-300"
                startIcon={<FiX className="text-xs" />}
                size="small"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleApply} 
                variant="contained" 
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded shadow-sm"
                startIcon={<FiCheckCircle className="text-xs" />}
                size="small"
              >
                Apply Now
              </Button>
            </DialogActions>
          </div>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{ zIndex: 9999 }}
        >
          <Alert 
            severity={snackbar.severity} 
            sx={{ 
              width: '100%',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

        {/* Logout */}
        <button
          onClick={() => setOpenLogoutDialog(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all hover:shadow-xl z-10"
        >
          <FiLogOut className="text-xl" />
        </button>

        <LogoutDialog
          open={openLogoutDialog}
          onClose={() => setOpenLogoutDialog(false)}
          onConfirm={handleLogout}
        />
      </div>
    </div>
  );
};

// JobCard component with improved alignment and aesthetics
const JobCard = ({ job, handleOpenApply }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); 
    setIsFavorite(!isFavorite);
  };

  const handleSavedClick = (e) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full relative">
      {/* Company and Icons Row */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-grow pr-2">
          <p className="text-blue-600 font-medium text-sm truncate">{job.companyName}</p>
        </div>
        {/* Icons container */}
        <div className="flex space-x-1 flex-shrink-0">
          {/* Saved Icon */}
          <button 
            onClick={handleSavedClick}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={isSaved ? "Unsave job" : "Save job"}
          >
            <FiBookmark className={`h-4 w-4 ${isSaved ? 'text-blue-500 fill-blue-500' : 'text-gray-400'}`} />
          </button>
          {/* Favorite Icon */}
          <button
            onClick={handleFavoriteClick}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={isFavorite ? "Unfavorite job" : "Favorite job"}
          >
            {isFavorite ? (
              <FaHeart className="h-4 w-4 text-red-500" />
            ) : (
              <FaRegHeart className="h-4 w-4 text-gray-400" />
            )}
          </button>
        </div>
      </div>
      
      {/* Job Title */}
      <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2" style={{ minHeight: '56px' }}>
        {job.jobTitle}
      </h3>
      
      {/* Job Details */}
      <div className="flex-grow space-y-3 mb-5">
        <div className="flex items-center text-sm text-gray-700">
          <FiDollarSign className="text-blue-500 mr-2 flex-shrink-0" />
          <span className="truncate">Salary: <span className="font-semibold">{job.salary}</span></span>
        </div>
        <div className="flex items-center text-sm text-gray-700">
          <FiBriefcase className="text-blue-500 mr-2 flex-shrink-0" />
          <span className="truncate">Experience: <span className="font-semibold">{job.experience}</span></span>
        </div>
        <div className="flex items-center text-sm text-gray-700">
          <FiMapPin className="text-blue-500 mr-2 flex-shrink-0" />
          <span className="truncate">Location: <span className="font-semibold">{job.location}</span></span>
        </div>
        <div className="flex items-center text-sm text-gray-700">
          <FiBook className="text-blue-500 mr-2 flex-shrink-0" />
          <span className="truncate">Qualification: <span className="font-semibold">{job.qualification}</span></span>
        </div>
      </div>

      {/* Apply Button */}
      <div className="mt-auto">
        <button
          onClick={() => handleOpenApply(job)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition flex items-center justify-center text-sm"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default Home;