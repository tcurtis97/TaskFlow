import React from "react";
import { CardHeader, CardText, Button, Card, ButtonGroup } from "reactstrap";
import { Link } from "react-router-dom";
import TaskFlowLogo from "./Image/TaskFlowLogo.png";
import "./Header.css";

export default function Hello() {
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
      <div className="homeButtons">
        {/* <Card className="homeCard"> */}

        <Link to="/customer" className="homeLinks">
          <Button type="button" color="primary" size="lg">
            Customers
          </Button>{" "}
        </Link>
        {/* </Card> */}
        {/* <Card className="homeCard"> */}
        <Link to="/job" className="homeLinks">
          <Button type="button" color="primary" size="lg">
            Job List
          </Button>{" "}
        </Link>
        {/* </Card> */}
        {/* <Card className="homeCard"> */}
        <Link to="/workday" className="homeLinks">
          <Button type="button" color="primary" size="lg">
            Work Day
          </Button>{" "}
        </Link>
        {/* </Card> */}
        {/* <Card className="homeCard"> */}
        <Link to="/userProfile" className="homeLinks">
          <Button type="button" color="primary" size="lg">
            My Profile
          </Button>{" "}
        </Link>

        {/* </Card> */}
      </div>
    </div>
  );
}
