import React, { useEffect, useContext, useState } from "react";
import { CustomerContext } from "../../providers/CustomerProvider";
import { AddressContext } from "../../providers/AddressProvider";
import { JobContext } from "../../providers/JobProvider";
import { useParams, useHistory } from "react-router-dom";
import CustomerAddress from "./CustomerAddress";
import CustomerJob from "./CustomerJob";
import { Link } from "react-router-dom";
import { CardHeader, CardText } from "reactstrap";
import { Button } from "reactstrap";
import "./Customer.css";
import TaskFlowLogo from "../Image/TaskFlowLogo.png";

const CustomerDetails = () => {
  const [customer, SetCustomer] = useState({});
  const [addresses, SetAddresses] = useState([]);
  const [jobs, SetJobs] = useState([]);

  const { getCustomerById } = useContext(CustomerContext);
  const { GetAllAddressesByCustomerId } = useContext(AddressContext);
  const { GetAllJobsByCustomerId } = useContext(JobContext);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    console.log("useEffect", id);
    getCustomerById(id).then((response) => {
      SetCustomer(response);
    });
  }, []);

  useEffect(() => {
    GetAllAddressesByCustomerId(id).then((response) => {
      SetAddresses(response);
    });
  }, []);

  useEffect(() => {
    GetAllJobsByCustomerId(id).then((response) => {
      SetJobs(response);
    });
  }, []);

  if (!customer) {
    return null;
  }

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
        <Button
          color="primary"
          className="back_button"
          onClick={() => {
            history.goBack();
          }}
        >
          Back
        </Button>

        <CardHeader className="customerName">
          <strong>{customer.name}</strong>
        </CardHeader>

        <CardText className="customerPhoneNumber">
          <strong>{customer.phoneNumber}</strong>
        </CardText>

        <div>
          <CardText className="JobAddons">
            <Link to={`/address/add/${customer.id}`}>
              <Button type="button" color="primary">
                Add address
              </Button>
            </Link>

            <strong>Addresses:</strong>
            {addresses.map((a) => (
              <CustomerAddress key={a.id} address={a} />
            ))}
          </CardText>

          <CardText>
            <strong>Jobs:</strong>
            {jobs.map((j) => (
              <CustomerJob key={j.id} job={j} />
            ))}
          </CardText>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
