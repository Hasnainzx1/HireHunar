// src/services/dbService.js
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";

// Firestore Collection References
const jobsCollection = collection(db, "jobs");
const requestsCollection = collection(db, "requests");

// ✅ Function to add all jobs (ek bar run karna)
export const uploadJobs = async (jobs) => {
  try {
    for (const job of jobs) {
      await addDoc(jobsCollection, job);
    }
    console.log("All jobs uploaded successfully!");
  } catch (error) {
    console.error("Error uploading jobs:", error);
  }
};

// ✅ Function to fetch all jobs
export const fetchJobs = async () => {
  try {
    const querySnapshot = await getDocs(jobsCollection);
    const jobs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return jobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};

// ✅ Function to apply for a job
export const applyForJob = async (jobId, userId) => {
  try {
    // Check if the user has already applied for this job
    const q = query(
      requestsCollection,
      where("jobId", "==", jobId),
      where("userId", "==", userId)
    );
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      console.log("⚠️ User has already applied for this job.");
      return { success: false, message: "You have already applied for this job." };
    }
    
    // If no existing application, proceed to add the new one
    await addDoc(requestsCollection, {
      jobId,
      userId,
      appliedAt: new Date(),
    });

    console.log("✅ Job application submitted successfully!");
    return { success: true, message: "Application submitted successfully!" };
  } catch (error) {
    console.error("Error applying for job:", error);
    return { success: false, message: "An error occurred while applying." };
  }
};

// ✅ Function to fetch applied jobs for a user (OPTIMIZED)
export const fetchAppliedJobs = async (userId) => {
  try {
    // Step 1: Fetch all application requests for the user
    const requestsQuery = query(requestsCollection, where("userId", "==", userId));
    const requestsSnapshot = await getDocs(requestsQuery);

    if (requestsSnapshot.empty) {
      console.log("No applied jobs found for this user.");
      return [];
    }
    
    // Step 2: Extract all unique jobId's into an array
    const jobIds = requestsSnapshot.docs.map((doc) => doc.data().jobId);

    // Optional: Filter out any duplicates if they exist, though not strictly needed here
    const uniqueJobIds = [...new Set(jobIds)];

    // Step 3: Use the 'in' operator to fetch all job details in a single query
    const jobsQuery = query(jobsCollection, where("__name__", "in", uniqueJobIds));
    const jobsSnapshot = await getDocs(jobsQuery);
    
    const appliedJobs = [];
    const requestMap = new Map();
    requestsSnapshot.docs.forEach(doc => {
      requestMap.set(doc.data().jobId, doc.data().appliedAt);
    });

    jobsSnapshot.docs.forEach(jobDoc => {
      appliedJobs.push({
        id: jobDoc.id,
        ...jobDoc.data(),
        appliedAt: requestMap.get(jobDoc.id)
      });
    });

    console.log("Fetched applied jobs:", appliedJobs);
    return appliedJobs;
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    return [];
  }
};