import React, { useContext, useEffect } from "react";
import { CustomerContext } from "../../providers/CustomerProvider";
import Customer from "./Customer";
import { Link } from "react-router-dom";
import "./Customer.scss";
import { Button } from "reactstrap";

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
        <Button type="button">Add Job</Button>
      </Link>
      {customers.map((c) => (
        <Customer key={c.id} customer={c} />
      ))}
    </section>
  );
};

export default CustomerList;
