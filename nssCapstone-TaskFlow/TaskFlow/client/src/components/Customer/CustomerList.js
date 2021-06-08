import React, { useContext, useEffect } from "react";
import { CustomerContext } from "../../providers/CustomerProvider";
import Customer from "./Customer";
import { Link } from "react-router-dom";
import "./Customer.css";
import { Button } from "reactstrap";
import TaskFlowLogo from "../Image/TaskFlowLogo.png";

const CustomerList = () => {
  const { customers, getAllCustomers, searchTerms, searchCustomers } =
    useContext(CustomerContext);

  useEffect(() => {
    getAllCustomers();
  }, []);

  useEffect(() => {
    if (searchTerms !== "") {
      searchCustomers(searchTerms);
    } else {
      getAllCustomers();
    }
  }, [searchTerms]);

  return (
    <section className="container">
      <Link to="/customer/add" className="nav-link">
        <Button type="button" color="primary">
          Add Customer
        </Button>
      </Link>
      {customers.map((c) => (
        <Customer key={c.id} customer={c} />
      ))}
    </section>
  );
};

export default CustomerList;
