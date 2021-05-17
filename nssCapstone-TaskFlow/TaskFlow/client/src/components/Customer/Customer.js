import React, { useContext, useEffect } from "react";
import { Card, CardBody, CardHeader, CardText } from "reactstrap";
import { CustomerContext } from "../../providers/CustomerProvider";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import "./Customer.css";

const Customer = ({ customer }) => {
  const { deleteCustomer } = useContext(CustomerContext);

  const customerDelete = () => {
    deleteCustomer(customer.id);
  };

  return (
    <Card className="customerCard">
      <CardHeader className="customerName">
        <p>
          <strong>{customer.name}</strong>
        </p>
      </CardHeader>
      <CardBody>
        <CardText className="customerPhoneNumber">
          <strong>{customer.phoneNumber}</strong>
        </CardText>
        <div className="buttons">
          <Link to={`customer/${customer.id}`}>
            <Button type="button" color="primary">
              Details
            </Button>
          </Link>
          <Link to={`/customer/edit/${customer.id}`}>
            <Button type="button" color="primary">
              Edit
            </Button>
          </Link>
          <Button
            color="primary"
            onClick={customerDelete}
            className="btn-primary"
          >
            Delete
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default Customer;
