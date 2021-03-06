import React, { useContext, useEffect } from "react";
import { Card, CardBody, CardHeader, CardText } from "reactstrap";
import { WorkRecordContext } from "../../providers/WorkRecordProvider";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import "./Job.css";

const JobWorkRecord = ({ workRecord }) => {
  const { deleteWorkRecord } = useContext(WorkRecordContext);

  const WorkRecordDelete = () => {
    deleteWorkRecord(workRecord.id);
  };

  return (
    <Card className="m-4">
      <CardHeader>
        <strong>{workRecord.userProfile.displayName}</strong>
      </CardHeader>
      <CardBody>
        <CardText>
          <strong>{workRecord.noteText}</strong>
        </CardText>
        <CardText>
          <strong>
            {moment(workRecord.createDate).format("MMMM Do YYYY")}
          </strong>
        </CardText>
        <CardText>
          <strong>Hours on job: {workRecord.timeOnJob}</strong>
        </CardText>
        <div className="buttons">
          <Link to={`/workRecord/edit/${workRecord.id}`}>
            <Button type="button" color="primary">
              Edit
            </Button>
          </Link>
          <Button
            color="primary"
            onClick={WorkRecordDelete}
            className="btn-primary"
          >
            Delete
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default JobWorkRecord;
