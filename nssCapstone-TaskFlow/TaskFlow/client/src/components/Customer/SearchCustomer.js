import React, { useContext, useEffect } from "react";
import { CustomerContext } from "../../providers/CustomerProvider";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./Customer.css";
import TaskFlowLogo from "../Image/TaskFlowLogo.png";
import { Link } from "react-router-dom";

export const SearchBar = () => {
  const { searchTerm, setSearchTerms } = useContext(CustomerContext);

  const handleChange = (event) => {
    setSearchTerms(event.target.value);
  };

  return (
    <div className="Logo">
      <img
        src={TaskFlowLogo}
        width="200"
        height="200"
        alt="Logo"
        className="logo"
      ></img>

      <div className="searchDiv">
        <input
          type="text"
          id="searchbar"
          class="search"
          placeholder="Search...."
          value={searchTerm}
          onChange={handleChange}
        />
        <div class="search"></div>
      </div>
    </div>
  );
};
export default SearchBar;
