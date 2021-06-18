import React, { useContext, useEffect, useState } from "react";
import { FleetContext } from "../../providers/FleetProvider";

import Fleet from "./Fleet";
import "../Job/Job.css";
import TaskFlowLogo from "../Image/TaskFlowLogo.png";

const FleetList = () => {
  const { getAllFleets, fleets } = useContext(FleetContext);

  useEffect(() => {
    getAllFleets();
  }, []);

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
      <section className="container">
        {fleets.map((j) => (
          <Fleet key={j.id} fleet={j} />
        ))}
      </section>
    </div>
  );
};

export default FleetList;
