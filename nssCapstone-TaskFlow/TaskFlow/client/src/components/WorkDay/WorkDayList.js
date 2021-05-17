import React, { useContext, useEffect, useState } from "react";
import { WorkDayContext } from "../../providers/WorkDayProvider";
import { JobContext } from "../../providers/JobProvider";
import WorkDay from "./WorkDay";
import "../Job/Job.css";
import TaskFlowLogo from "../Image/TaskFlowLogo.png";

const WorkDayList = () => {
  const { GetJobsByWorkDay, jobWorkDay, getAllJobs } = useContext(JobContext);

  // const [jobs, setJobs] = useState([]);

  useEffect(() => {
    GetJobsByWorkDay();
  }, []);

  return (
    <div>
      <div className="Logo">
        <img
          src={TaskFlowLogo}
          width="200"
          height="200"
          alt="Logo"
          className="logo"
        ></img>
      </div>
      <section className="container">
        {jobWorkDay.map((j) => (
          <WorkDay
            key={j.id}
            workDay={j}
            GetJobsByWorkDay={GetJobsByWorkDay}
            getAllJobs={getAllJobs}
          />
        ))}
      </section>
    </div>
  );
};

export default WorkDayList;
