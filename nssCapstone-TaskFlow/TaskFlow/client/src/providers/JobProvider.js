import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
import "firebase/auth";
export const JobContext = React.createContext();

export const JobProvider = (props) => {
  const { getToken } = useContext(UserProfileContext);
  const [jobs, setjobs] = useState([]);
  const [jobWorkDay, setjobWorkDay] = useState([]);
  const [viewingUncomplete, setViewingUncomplete] = useState(false);

  const getAllJobs = () => {
    return getToken().then((token) =>
      fetch("/api/job", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setjobs)
    );
  };

  const getJobById = (id) => {
    return getToken().then((token) =>
      fetch(`/api/job/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
    );
  };

  const addJob = (job) => {
    return getToken().then((token) => {
      fetch(`/api/job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(job), //this stringifies our post object meaning it changes our object into string object
      });
    });
  };

  const deleteJob = (jobId) =>
    getToken().then((token) =>
      fetch(`/api/job/${jobId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then(getAllJobs)
    );

  const CompleteJob = (Id) =>
    getToken().then((token) =>
      fetch(`/api/job/ComepleteJob${Id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
    );

  const updateJob = (job) => {
    return getToken().then((token) =>
      fetch(`/api/job/${job.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      })
    );
  };

  const getUncompleteJobs = () => {
    return getToken().then((token) =>
      fetch(`/api/job/GetAllUncompleteJobs`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setjobs)
    );
  };

  const GetJobByIdWithDetails = (id) => {
    return getToken().then((token) =>
      fetch(`/api/job/GetJobByIdWithDetails${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
    );
  };

  const GetAllJobsByCustomerId = (id) => {
    return getToken().then((token) =>
      fetch(`/api/job/GetAllJobsByCustomerId${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
    );
  };

  const GetJobsByWorkDay = () => {
    return getToken().then((token) =>
      fetch(`/api/job/GetJobsByWorkDayUser`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setjobWorkDay)
    );
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        getAllJobs,
        addJob,
        deleteJob,
        updateJob,
        getJobById,
        viewingUncomplete,
        setViewingUncomplete,
        getUncompleteJobs,
        GetJobByIdWithDetails,
        GetAllJobsByCustomerId,
        CompleteJob,
        GetJobsByWorkDay,
        setjobs,
        setjobWorkDay,
        jobWorkDay,
      }}
    >
      {props.children}
    </JobContext.Provider>
  );
};
