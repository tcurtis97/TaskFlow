import React, { useEffect, useContext, useState } from "react";
import { JobContext } from "../../providers/JobProvider";
import { NoteContext } from "../../providers/NoteProvider";
import { WorkRecordContext } from "../../providers/WorkRecordProvider";
import { useParams } from "react-router-dom";
import JobNote from "./JobNote";
import JobWorkRecord from "./JobWorkRecord";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import { CardHeader, CardText, Button } from "reactstrap";

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

  if (!job) {
    return null;
  }

  return (
    <div className="container">
      <Button
        variant
        className="back_button"
        onClick={() => {
          history.goBack();
        }}
      >
        Back
      </Button>
      <Button variant="secondary" onClick={jobDelete} className="btn-primary">
        Delete
      </Button>
      <CardHeader>
        <strong>{job.customer.name}</strong>
      </CardHeader>
      <CardHeader>
        <strong>{job.customer.phoneNumber}</strong>
      </CardHeader>
      <CardHeader>
        <strong>{job.address.address}</strong>
      </CardHeader>

      <CardText>
        <strong>{job.description}</strong>
      </CardText>

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

      <CardHeader>
        <Link to={`/workRecord/add/${job.id}`}>
          <Button type="button">Add WorkRecord</Button>
        </Link>
        <strong>Work Records:</strong>
        {workRecords.map((w) => (
          <JobWorkRecord key={w.id} workRecord={w} />
        ))}
      </CardHeader>

      <CardHeader>
        <Link to={`/note/add/${job.id}`}>
          <Button type="button">Add note</Button>
        </Link>
        <strong>Notes:</strong>
        {notes.map((n) => (
          <JobNote key={n.id} note={n} />
        ))}
      </CardHeader>

      <Button variant="secondary" onClick={JobComplete} className="btn-primary">
        Complete Job
      </Button>
    </div>
  );
};

export default JobDetails;
