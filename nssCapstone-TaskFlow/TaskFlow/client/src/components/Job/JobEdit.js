import React, { useContext, useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { JobContext } from "../../providers/JobProvider";
import { CustomerContext } from "../../providers/CustomerProvider";
import { AddressContext } from "../../providers/AddressProvider";
import { useHistory, useParams } from "react-router-dom";
import "./Job.css";

export const JobEdit = () => {
  const { addJob, getJobById, updateJob, getAllJobs } = useContext(JobContext);
  const { customers, getAllCustomers } = useContext(CustomerContext);
  const { GetAllAddressesByCustomerId } = useContext(AddressContext);

  const { jobId } = useParams();

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

  const handleControlledInputChange = (event) => {
    const newJob = { ...job };
    let selectedVal = event.target.value;
    if (event.target.id.includes("Id")) {
      selectedVal = parseInt(selectedVal);
    }

    newJob[event.target.id] = selectedVal;

    setJob(newJob);
  };

  useEffect(() => {
    getAddresses();
  }, [job]);

  const handleClickSaveJob = () => {
    if (job.description === "") {
      window.alert("Please enter a description");
    } else {
      updateJob({
        id: jobId,
        description: job.description,
        customerId: job.customerId,
        addressId: job.addressId,
      }).then(() => history.push(`/job`));
    }
  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  useEffect(() => {
    getJobById(jobId).then((j) => {
      setJob(j);
    });
  }, []);

  const getAddresses = () => {
    console.log("Hello world");
    GetAllAddressesByCustomerId(job.customerId).then((response) => {
      SetAddresses(response);
      console.log(response);
    });
  };

  return (
    <Form className="customerForm">
      <h2 className="customerForm__title">Save Job</h2>

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
              type="text"
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
          Save Job
        </Button>
      </div>
    </Form>
  );
};
