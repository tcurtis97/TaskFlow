import React, { useContext, useEffect } from "react";
import { Card, CardBody, CardHeader, CardText } from "reactstrap";
import { JobContext } from "../../providers/JobProvider";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import "./Customer.scss";
import moment from "moment";

const CustomerJob = ({ job }) => {
  return (
    <Card className="m-4">
      <CardHeader>
        <strong>{job.description}</strong>
      </CardHeader>
      <CardBody>
        <CardText>{moment(job.createDate).format("MMMM Do YYYY")}</CardText>
        <Link to={`/Job/edit/${job.id}`}>
          <Button type="button">Edit</Button>
        </Link>

        <Link to={`/job/${job.id}`}>
          <Button type="button">Details</Button>
        </Link>
      </CardBody>
    </Card>
  );
};

export default CustomerJob;
