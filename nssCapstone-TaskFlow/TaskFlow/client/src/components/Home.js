import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

export default function Hello() {
  return (
    <span
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        top: "50%",
        marginTop: "-0.5rem",
        textAlign: "center",
      }}
    >
      hello
      <Link to="/customer">
        <Button type="button">customer</Button>
      </Link>
      <Link to="/job">
        <Button type="button">job</Button>
      </Link>
      <Link to="/workday">
        <Button type="button">workday</Button>
      </Link>
    </span>
  );
}
