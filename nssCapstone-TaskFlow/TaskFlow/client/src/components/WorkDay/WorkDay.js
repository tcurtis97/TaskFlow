import React, { useContext, useEffect } from "react";
import { Card, CardBody, CardHeader, CardText, Button } from "reactstrap";
import { JobContext } from "../../providers/JobProvider";
import { WorkDayContext } from "../../providers/WorkDayProvider";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";
const WorkDay = ({ workDay, GetJobsByWorkDay, getAllJobs }) => {
  const { deleteWorkDay } = useContext(WorkDayContext);
  const history = useHistory();

  const workDayDelete = () => {
    deleteWorkDay(workDay.workDay.id).then(GetJobsByWorkDay).then(getAllJobs);
  };

  return (
    <Card className="m-4">
      <CardBody>
        <CardText className="customerInfo">
          <p>
            <strong>{workDay.customer.name}</strong>
          </p>
        </CardText>
        <CardText className="customerInfo">
          <p>
            <strong>{workDay.address.address}</strong>
          </p>
        </CardText>
        <CardText className="customerInfo">
          <p>
            <strong>Description : {workDay.description}</strong>
          </p>
        </CardText>
        <div className="buttons">
          <Link to={`/job/${workDay.id}`}>
            <Button type="button" color="primary">
              Details
            </Button>
          </Link>

          <Button
            color="primary"
            onClick={workDayDelete}
            className="btn-primary"
          >
            Delete
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default WorkDay;
