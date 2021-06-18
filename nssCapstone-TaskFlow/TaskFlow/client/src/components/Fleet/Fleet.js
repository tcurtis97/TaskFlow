import React, { useContext, useEffect } from "react";
import { Card, CardBody, CardHeader, CardText, Button } from "reactstrap";

import { FleetContext } from "../../providers/FleetProvider";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";
const Fleet = ({ fleet }) => {
  const { deleteFleet } = useContext(FleetContext);
  const history = useHistory();

  const fleetDelete = () => {
    deleteFleet(fleet.id);
  };

  return (
    <Card className="m-4">
      <CardBody>
        <CardText className="fleetInfo">
          <p>
            <strong>{fleet.ImageUrl}</strong>
          </p>
        </CardText>
        <CardText className="fleetInfo">
          <p>
            <strong>{fleet.description}</strong>
          </p>
        </CardText>

        <div className="buttons">
          <Link to={`/fleet/${fleet.id}`}>
            <Button type="button" color="primary">
              Details
            </Button>
          </Link>

          <Button color="primary" onClick={fleetDelete} className="btn-primary">
            Delete
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default Fleet;
