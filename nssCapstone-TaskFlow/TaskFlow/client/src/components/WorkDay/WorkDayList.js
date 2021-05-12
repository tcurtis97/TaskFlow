import React, { useContext, useEffect, useState } from "react";
import { WorkDayContext } from "../../providers/WorkDayProvider";
import { JobContext } from "../../providers/JobProvider";
import WorkDay from "./WorkDay";

const WorkDayList = () => {
  const { GetJobsByWorkDay, jobs } = useContext(JobContext);

  // const [jobs, setJobs] = useState([]);
  console.log(jobs, "stirng");

  useEffect(() => {
    GetJobsByWorkDay();
  }, []);

  return (
    <section>
      {jobs.map((j) => (
        <WorkDay key={j.id} workDay={j} GetJobsByWorkDay={GetJobsByWorkDay} />
      ))}
    </section>
  );
};

export default WorkDayList;
