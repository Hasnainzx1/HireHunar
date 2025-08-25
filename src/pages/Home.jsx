import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiLogOut, FiMapPin, FiDollarSign, FiBook, FiBriefcase, FiSearch,
  FiCheckCircle, FiX, FiClock, FiUser, FiAward
} from 'react-icons/fi';
import LogoutDialog from '../components/LogoutDialog';
import { fetchJobs, applyForJob } from '../dbService';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Snackbar, Alert, Chip, IconButton
} from '@mui/material';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  // For Apply Dialog
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
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-50 px-6 py-10 font-sans text-gray-800 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
            Welcome to <span className="text-blue-600">HireHunar</span> 
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Empowering skilled individuals across Pakistan to find the right opportunities.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-10">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search jobs by title, company, location, qualification..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 truncate">{job.jobTitle}</h3>
                  <p className="text-blue-600 font-medium">{job.companyName}</p>

                  <div className="space-y-2 my-4 text-sm text-gray-700">
                    <div><FiDollarSign className="inline text-blue-500 mr-2" /> Salary: {job.salary}</div>
                    <div><FiBook className="inline text-blue-500 mr-2" /> Qualification: {job.qualification}</div>
                    <div><FiBriefcase className="inline text-blue-500 mr-2" /> Experience: {job.experience}</div>
                    <div><FiMapPin className="inline text-blue-500 mr-2" /> Location: {job.location}</div>
                  </div>

                  {/* <p className="text-sm text-gray-600 line-clamp-3">{job.description}</p> */}
                </div>

                <div className="mt-auto">
                  <button
                    onClick={() => handleOpenApply(job)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition flex items-center justify-center"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Enhanced Apply Dialog - Fixed z-index and size */}
        <Dialog 
          open={openApplyDialog} 
          onClose={() => setOpenApplyDialog(false)} 
          maxWidth="sm" 
          fullWidth
          sx={{
            '& .MuiDialog-container': {
              alignItems: 'flex-start',
              marginTop: '80px'
            },
            '& .MuiPaper-root': {
              margin: '0',
              maxHeight: '80vh'
            }
          }}
          PaperProps={{
            style: {
              borderRadius: '16px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            }
          }}
        >
          <div className="relative">
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white rounded-t-lg">
              <div className="flex justify-between items-start">
                <div className="pr-4">
                  <DialogTitle className="text-white p-0 text-xl font-bold">
                    {selectedJob?.jobTitle}
                  </DialogTitle>
                  <p className="text-blue-100 text-md font-medium mt-1">{selectedJob?.companyName}</p>
                </div>
                <IconButton 
                  onClick={() => setOpenApplyDialog(false)} 
                  className="text-white hover:bg-blue-700"
                  size="small"
                >
                  <FiX className="text-lg" />
                </IconButton>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                <Chip 
                  icon={<FiMapPin className="text-blue-300 text-xs" />} 
                  label={selectedJob?.location} 
                  size="small" 
                  className="bg-blue-500 text-white text-xs h-6"
                />
                <Chip 
                  icon={<FiDollarSign className="text-blue-300 text-xs" />} 
                  label={selectedJob?.salary} 
                  size="small" 
                  className="bg-blue-500 text-white text-xs h-6"
                />
                <Chip 
                  icon={<FiAward className="text-blue-300 text-xs" />} 
                  label={selectedJob?.experience} 
                  size="small" 
                  className="bg-blue-500 text-white text-xs h-6"
                />
              </div>
            </div>

            <DialogContent dividers className="p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
                    <FiBook className="mr-2 text-blue-500 text-sm" />
                    Qualification Required
                  </h3>
                  <p className="text-gray-700 bg-blue-50 p-2 rounded-lg text-sm">{selectedJob?.qualification}</p>
                </div>

                <div>
                  <h3 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
                    <FiBriefcase className="mr-2 text-blue-500 text-sm" />
                    Job Description
                  </h3>
                  <p className="text-gray-700 bg-gray-50 p-2 rounded-lg text-sm">{selectedJob?.description}</p>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FiClock className="h-4 w-4 text-yellow-400 mt-0.5" />
                    </div>
                    <div className="ml-2">
                      <p className="text-xs text-yellow-700">
                        Apply soon! This position may fill up quickly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>

            <DialogActions className="p-4 flex justify-between border-t">
              <Button 
                onClick={() => setOpenApplyDialog(false)} 
                variant="outlined" 
                className="border-gray-300 text-gray-600 hover:bg-gray-50 text-sm"
                startIcon={<FiX />}
                size="small"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleApply} 
                variant="contained" 
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-md text-sm"
                startIcon={<FiCheckCircle />}
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

export default Home;