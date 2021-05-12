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
        <Link to={`customer/${customer.id}`}>{customer.name}</Link>
      </CardHeader>
      <CardBody>
        <CardText className="customerPhoneNumber">
          <strong>{customer.phoneNumber}</strong>
        </CardText>
        <Link to={`/customer/edit/${customer.id}`}>
          <Button type="button">Edit</Button>
        </Link>
        <Button
          variant="secondary"
          onClick={customerDelete}
          className="btn-primary"
        >
          Delete
        </Button>
      </CardBody>
    </Card>
  );
};

export default Customer;
