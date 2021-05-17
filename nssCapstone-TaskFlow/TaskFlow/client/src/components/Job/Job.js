import React, { useContext, useEffect } from "react";

import { JobContext } from "../../providers/JobProvider";
import { WorkDayContext } from "../../providers/WorkDayProvider";
import { useHistory } from "react-router-dom";
import { Card, CardBody, CardHeader, CardText, Button } from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import "./Job.css";

const Job = ({ job, getAllJobs }) => {
  const { deleteJob } = useContext(JobContext);
  const { addWorkDay } = useContext(WorkDayContext);

  const jobDelete = () => {
    deleteJob(job.id);
  };

  const WorkDayAdd = () => {
    addWorkDay({
      JobId: job.id,
      UserProfileId: 0,
    }).then(getAllJobs);
  };

  return (
    <Card className="jobCard">
      <CardBody className="jobInfo">
        <CardText className="createDate">
          <p>
            <strong>
              Job was added on: {moment(job.createDate).format("MMMM Do YYYY")}
            </strong>
          </p>
        </CardText>
        <CardText className="customerInfo">
          <CardText>
            <p>
              <strong>{job.customer.name}</strong>
            </p>
          </CardText>
        </CardText>
        <CardText className="customerInfo">
          <CardText>
            <p>
              <strong>{job.address.address}</strong>
            </p>
          </CardText>
        </CardText>
        <CardText className="JobInfo">
          <p>
            <strong>Description : {job.description}</strong>
          </p>
        </CardText>
        <CardText className="JobComplete">
          {job.completionDate !== "1900-01-01T00:00:00" ? (
            <strong>
              Job was completed on:{" "}
              <strong>
                {moment(job.completionDate).format("MMMM Do YYYY")}
              </strong>
            </strong>
          ) : (
            <strong>Job is Uncomplete</strong>
          )}
        </CardText>
        <div className="buttons">
          <Link to={`/job/${job.id}`}>
            <Button type="button" color="primary">
              Details
            </Button>
          </Link>
          <Link to={`/job/edit/${job.id}`}>
            <Button type="button" color="primary">
              Edit
            </Button>
          </Link>
          <Button color="primary" onClick={jobDelete} className="btn-primary">
            Delete
          </Button>

          {job.id !== job.workDay.jobId ? (
            <Button
              color="primary"
              onClick={WorkDayAdd}
              className="btn-primary"
            >
              Add to workday
            </Button>
          ) : (
            <div> Job added to work list by {job.userProfile.displayName}</div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default Job;
