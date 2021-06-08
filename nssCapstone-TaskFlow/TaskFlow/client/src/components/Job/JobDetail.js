import React, { useEffect, useContext, useState } from "react";
import { JobContext } from "../../providers/JobProvider";
import { NoteContext } from "../../providers/NoteProvider";
import { WorkRecordContext } from "../../providers/WorkRecordProvider";
import { useParams } from "react-router-dom";
import JobNote from "./JobNote";
import JobWorkRecord from "./JobWorkRecord";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import { CardHeader, CardText, Button, Card } from "reactstrap";
import "./Job.css";
import TaskFlowLogo from "../Image/TaskFlowLogo.png";

const JobDetails = () => {
  const [job, SetJob] = useState({
    customer: {},
    address: {},
  });
  const history = useHistory();
  const [notes, SetNotes] = useState([]);
  const [workRecords, SetWorkRecords] = useState([]);
  console.log(notes);
  const { GetJobByIdWithDetails, CompleteJob, deleteJob } =
    useContext(JobContext);
  const { GetAllNotesByJobId } = useContext(NoteContext);
  const { GetAllWorkRecordsByJobId } = useContext(WorkRecordContext);

  // id of the job being passed through the variable id through usParam
  const { id } = useParams();

  const jobDelete = () => {
    deleteJob(job.id).then(history.push(`/job`));
  };

  useEffect(() => {
    console.log("useEffect", id);
    GetJobByIdWithDetails(id).then((response) => {
      SetJob(response);
    });
  }, []);

  useEffect(() => {
    GetAllNotesByJobId(id).then((response) => {
      SetNotes(response);
    });
  }, []);

  useEffect(() => {
    GetAllWorkRecordsByJobId(id).then((response) => {
      SetWorkRecords(response);
    });
  }, []);

  const JobComplete = () => {
    CompleteJob(job.id).then(history.push(`/job`));
  };

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
      <div className="container">
        <div className="backButton">
          <Button
            color="primary"
            onClick={() => {
              history.goBack();
            }}
          >
            Back
          </Button>
        </div>
        <div className="deleteButton">
          <Button color="primary" onClick={jobDelete} className="btn-primary">
            Delete
          </Button>
        </div>
        <CardHeader className="customerInfo">
          <strong>{job.customer.name}</strong>
        </CardHeader>
        <CardText className="customerInfo">
          <strong>{job.customer.phoneNumber}</strong>
        </CardText>
        <CardText className="customerInfo">
          <strong>{job.address.address}</strong>
        </CardText>

        <CardText className="JobInfo">
          <strong>Description: {job.description}</strong>
        </CardText>

        {/* if the completionDate is null which is coming back as an empty string, show "Job is Uncomplete",
else show the job was complete and the date it was completed */}
        {job.completionDate !== "1900-01-01T00:00:00" ? (
          <p>
            <strong>
              Job was completed on:{" "}
              {moment(job.completionDate).format("MMMM Do YYYY")}
            </strong>
          </p>
        ) : (
          <strong>Job is Uncomplete</strong>
        )}

        <Card>
          <Link to={`/workRecord/add/${job.id}`}>
            <Button type="button" color="primary">
              Add WorkRecord
            </Button>
          </Link>

          <CardText>
            <strong>Work Records:</strong>
            {workRecords.map((w) => (
              <JobWorkRecord key={w.id} workRecord={w} />
            ))}
          </CardText>
        </Card>

        <Card>
          <Link to={`/note/add/${job.id}`}>
            <Button type="button" color="primary" className="addNoteBt">
              Add note
            </Button>
          </Link>
          <CardText>
            <strong>Notes:</strong>
            {notes.map((n) => (
              <JobNote key={n.id} note={n} />
            ))}
          </CardText>
        </Card>

        <Button color="primary" onClick={JobComplete} className="btn-primary">
          Complete Job
        </Button>
      </div>
    </div>
  );
};

export default JobDetails;
