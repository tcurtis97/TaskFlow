import React, { useContext, useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { CustomerContext } from "../../providers/CustomerProvider";
import "./Customer.css";
import TaskFlowLogo from "../Image/TaskFlowLogo.png";
import { useHistory, useParams } from "react-router-dom";

export const CustomerForm = () => {
  const { addCustomer, getCustomerById, updateCustomer, getAllCustomers } =
    useContext(CustomerContext);

  const [customer, setCustomer] = useState({
    Name: "",
    PhoneNumber: "",
  });

  const history = useHistory();
  const { customerId } = useParams();

  // function to take the values of the form fields and sets those values to state,  to run onchange
  const handleControlledInputChange = (event) => {
    const newCustomer = { ...customer };
    let selectedVal = event.target.value;
    if (event.target.id.includes("Id")) {
      selectedVal = parseInt(selectedVal);
    }
    newCustomer[event.target.id] = selectedVal;
    setCustomer(newCustomer);
  };

  // if there is an customerId in the url the function will run the updateCustomer and send a Put request,
  // else the fucntion will run addCustomer and run a post request
  const handleClickSaveCustomer = () => {
    if (customer.name === "" || customer.phoneNumber === "") {
      window.alert("Please enter a name");
    } else {
      if (customerId) {
        updateCustomer({
          id: customerId,
          name: customer.name,
          phoneNumber: customer.phoneNumber,
        }).then(() => history.push(`/customer`));
      } else {
        addCustomer({
          name: customer.name,
          phoneNumber: customer.phoneNumber,
        }).then(() => history.push(`/customer`));
      }
    }
  };

  // useEffect calls getAllCustomers and then if there is an customerId in the url, the customerId will be passed into getCustomerById and set the
  // response to state for the edit feature to show the object being edited
  useEffect(() => {
    getAllCustomers().then(() => {
      if (customerId) {
        getCustomerById(customerId).then((c) => {
          setCustomer(c);
        });
      } else {
      }
    });
  }, []);

  return (
    <Form>
      <div className="Logo">
        <img
          src={TaskFlowLogo}
          width="200"
          height="200"
          alt="Logo"
          className="logo"
        ></img>
      </div>
      <div className="customerForm">
        <h2 className="customerForm__title">
          {customerId ? "Save Customer" : "Add Customer"}
        </h2>

        <Button
          color="primary"
          className="back_button"
          onClick={() => {
            history.goBack();
          }}
        >
          Back
        </Button>

        <div className="form_background">
          <fieldset>
            <div className="form-group">
              <Label htmlFor="name">Customer name:</Label>
              <Input
                type="text"
                id="name"
                onChange={handleControlledInputChange}
                required
                autoFocus
                className="form-control"
                value={customer.name}
                placeholder="Customer name"
              />
            </div>
          </fieldset>

          <fieldset>
            <div className="form-group">
              <Label htmlFor="phoneNumber">Phone Number:</Label>
              <Input
                type="tel"
                id="phoneNumber"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                onChange={handleControlledInputChange}
                required
                autoFocus
                className="form-control"
                value={customer.phoneNumber}
                placeholder="Phone Number"
              />
            </div>
          </fieldset>

          <Button
            color="primary"
            className="add_button"
            onClick={(event) => {
              event.preventDefault();
              handleClickSaveCustomer();
            }}
          >
            {customerId ? "Save Customer" : "Add Customer"}
          </Button>
        </div>
      </div>
    </Form>
  );
};
