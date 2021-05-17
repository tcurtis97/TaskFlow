import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import "./Login.css";
import TaskFlowLogo from "./Image/TaskFlowLogo.png";

export default function Login() {
  const history = useHistory();
  const { login } = useContext(UserProfileContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => history.push("/"))
      .catch(() => alert("Invalid email or password"));
  };

  return (
    <Form onSubmit={loginSubmit} className="container--login">
      <div className="Logo">
        <img
          src={TaskFlowLogo}
          width="200"
          height="200"
          alt="Logo"
          className="logo"
        ></img>
      </div>
      <div className="loginElements">
        <fieldset className="login">
          <FormGroup className="emailForm">
            <Label for="email" className="emailLabel">
              Email
            </Label>
            <Input
              className="emailInput"
              id="email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="passwordForm">
            <Label for="password" className="passwordLabel">
              Password
            </Label>
            <Input
              className="passwordInput"
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="buttonLabel">
            <Button color="primary" className="loginButton">
              Login
            </Button>
          </FormGroup>
          <em>
            Not registered? <Link to="register">Register</Link>
          </em>
        </fieldset>
      </div>
    </Form>
  );
}
