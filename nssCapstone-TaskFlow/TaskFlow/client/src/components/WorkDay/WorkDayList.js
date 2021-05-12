import React, { useContext, useEffect, useState } from "react";
import { WorkDayContext } from "../../providers/WorkDayProvider";
import { JobContext } from "../../providers/JobProvider";
import WorkDay from "./WorkDay";

const WorkDayList = () => {
  const { GetJobsByWorkDay, jobWorkDay, getAllJobs } = useContext(JobContext);

  // const [jobs, setJobs] = useState([]);

  useEffect(() => {
    GetJobsByWorkDay();
  }, []);

  return (
    <section>
      {jobWorkDay.map((j) => (
        <WorkDay
          key={j.id}
          workDay={j}
          GetJobsByWorkDay={GetJobsByWorkDay}
          getAllJobs={getAllJobs}
        />
      ))}
    </section>
  );
};

export default WorkDayList;
