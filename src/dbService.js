// src/services/dbService.js
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
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
    // Check if already applied
    const q = query(
      requestsCollection,
      where("jobId", "==", jobId),
      where("userId", "==", userId)
    );
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      console.log("⚠️ User has already applied for this job.");
      return { success: false, message: "Already applied" };
    }

    // If not applied before → add request
    await addDoc(requestsCollection, {
      jobId,
      userId,
      appliedAt: new Date(),
    });

    console.log("✅ Job application submitted!");
    return { success: true, message: "Application submitted" };
  } catch (error) {
    console.error("Error applying for job:", error);
    return { success: false, message: "Error applying" };
  }
};
