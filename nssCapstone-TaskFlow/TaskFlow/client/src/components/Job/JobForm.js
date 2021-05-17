import React, { useContext, useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { JobContext } from "../../providers/JobProvider";
import { CustomerContext } from "../../providers/CustomerProvider";
import { AddressContext } from "../../providers/AddressProvider";
import { useHistory, useParams } from "react-router-dom";
import "./Job.css";
import TaskFlowLogo from "../Image/TaskFlowLogo.png";

export const JobForm = () => {
  const { addJob } = useContext(JobContext);
  const { customers, getAllCustomers } = useContext(CustomerContext);
  const { GetAllAddressesByCustomerId } = useContext(AddressContext);

  const [Addresses, SetAddresses] = useState([
    {
      id: 0,
      customerId: 0,
      address: "",
    },
  ]);
  console.log(Addresses, "string");

  const [job, setJob] = useState({
    Description: "",
    customerId: 0,
    addressId: 0,
  });

  const history = useHistory();

  // function to take the values of the form fields and sets those values to state,function is set
  //  to run onchange
  const handleControlledInputChange = (event) => {
    const newJob = { ...job };
    let selectedVal = event.target.value;
    if (event.target.id.includes("Id")) {
      selectedVal = parseInt(selectedVal);
    }

    newJob[event.target.id] = selectedVal;

    setJob(newJob);
  };

  // this useEffect runs getaddresses when the state of job is changed
  useEffect(() => {
    getAddresses();
  }, [job]);

  const handleClickSaveJob = () => {
    if (job.description === "" || job.customerId === 0 || job.addressId === 0) {
      window.alert("Please enter a Descritpion");
    } else {
      addJob({
        description: job.description,
        customerId: job.customerId,
        addressId: job.addressId,
      }).then(() => history.push(`/job`));
    }
  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  // gets addresses by using the customer id which is gotten from the state variable,
  // which is set by the onchange function on the select of a customer.Then sets those addresses
  // to state
  const getAddresses = () => {
    GetAllAddressesByCustomerId(job.customerId).then((response) => {
      SetAddresses(response);
    });
  };

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
      <h2 className="customerForm__title">Add Job</h2>
      <div className="jobForm">
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
              <Label htmlFor="description">Job Description:</Label>
              <Input
                type="textarea"
                id="description"
                onChange={handleControlledInputChange}
                required
                autoFocus
                className="form-control"
                value={job.description}
                placeholder="Job Description"
              />
            </div>
          </fieldset>

          {/* <fieldset>
          <div className="form-group">
            <Label htmlFor="ImageUrl">ImageUrl:</Label>
            <Input
              type="text"
              id="ImageUrl"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="form-control"
              value={job.ImageUrl}
              placeholder="ImageUrl"
            />
          </div>
        </fieldset> */}

          {/* map over customers to create options for the select, also added a onSelect to 
run get addreses which will get the addresses by the customer id that is selected */}
          <FormGroup>
            <select
              id="customerId"
              onSelect={getAddresses}
              onChange={handleControlledInputChange}
            >
              <option value="0">Select a customer </option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </FormGroup>

          {/* if there is a customer id, run the select and map over addresses to create options.
else just make a div that says the message Please Choose a customer */}
          {job.customerId !== 0 ? (
            <div className="Address_card">
              <select id="addressId" onChange={handleControlledInputChange}>
                <option value="0">Select an address </option>
                {Addresses.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.address}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div> Please Choose a customer</div>
          )}

          <Button
            color="primary"
            className="add_button"
            onClick={(event) => {
              event.preventDefault();
              handleClickSaveJob();
            }}
          >
            Add Job
          </Button>
        </div>
      </div>
    </Form>
  );
};
