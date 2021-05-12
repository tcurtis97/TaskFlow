import React, { useContext, useEffect } from "react";
import { CustomerContext } from "../../providers/CustomerProvider";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./Customer.scss";

export const SearchBar = () => {
  const { searchTerm, setSearchTerms } = useContext(CustomerContext);

  const handleChange = (event) => {
    setSearchTerms(event.target.value);
  };

  return (
    <div className="searchDiv">
      <Input
        type="text"
        id="searchbar"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <div class="search"></div>
    </div>
  );
};
export default SearchBar;
