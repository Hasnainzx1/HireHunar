import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAppliedJobs } from '../dbService';
import {
  FiBriefcase, FiMapPin, FiDollarSign, FiAward, FiClock
} from 'react-icons/fi';

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (!loggedIn) {
      navigate('/auth');
      return;
    }

    const userId = localStorage.getItem("userId") || "guestUser";
    const getAppliedJobs = async () => {
      setLoading(true);
      const jobs = await fetchAppliedJobs(userId);
      setAppliedJobs(jobs);
      setLoading(false);
    };

    getAppliedJobs();
  }, [navigate]);

  // Function to format the date
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate(); // Correctly convert Firestore Timestamp to JS Date
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 px-4 py-10 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
          My Applied Jobs
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Here is a list of all the jobs you have applied for.
        </p>

        {loading ? (
          <div className="text-center py-16">
            <h3 className="text-lg font-medium text-gray-700">Loading your applications...</h3>
          </div>
        ) : appliedJobs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No applications found.
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Go back to the home page to find and apply for jobs.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {appliedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between"
              >
                {/* Job Info Section */}
                <div className="flex-grow mb-4 sm:mb-0">
                  <h3 className="text-xl font-bold text-gray-900">{job.jobTitle}</h3>
                  <p className="text-blue-600 font-medium text-sm">{job.companyName}</p>
                  
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                    <div className="flex items-center">
                      <FiMapPin className="text-blue-500 mr-2" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      {/* <FiDollarSign className="text-blue-500 mr-2" /> */}
                      {job.salary}
                    </div>
                    <div className="flex items-center">
                      <FiAward className="text-blue-500 mr-2" />
                      {job.experience}
                    </div>
                    <div className="flex items-center">
                      <FiClock className="text-blue-500 mr-2" />
                      Applied: {formatDate(job.appliedAt)}
                    </div>
                  </div>
                </div>

                {/* Status/Action Button Section */}
                <div className="flex-shrink-0 flex items-center justify-end">
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                    Application Sent
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
 
export default AppliedJobs;