import React, { useState, useContext } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
import { UserProfileContext } from "../providers/UserProfileProvider";
import "./Header.css";
import TaskFlowLogo from "./Image/TaskFlowLogo.png";

export default function Header() {
  const { isLoggedIn, logout } = useContext(UserProfileContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Nav tabs className="mainNav">
        <Navbar color="light" light expand="md">
          <NavLink tag={RRNavLink} to="/">
            <img
              src={TaskFlowLogo}
              width="50"
              height="50"
              alt="Logo"
              className="logo"
            ></img>
          </NavLink>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {isLoggedIn && (
                <>
                  <NavItem>
                    <NavLink tag={RRNavLink} to="/">
                      Home
                    </NavLink>
                  </NavItem>
                </>
              )}
            </Nav>
            <Nav className="mr-auto" navbar>
              {isLoggedIn && (
                <>
                  <NavItem>
                    <NavLink tag={RRNavLink} to="/customer">
                      Customer List
                    </NavLink>
                  </NavItem>
                </>
              )}
            </Nav>

            <Nav className="mr-auto" navbar>
              {isLoggedIn && (
                <NavItem>
                  <NavLink tag={RRNavLink} to="/job">
                    Job List
                  </NavLink>
                </NavItem>
              )}
            </Nav>

            <Nav className="mr-auto" navbar>
              {isLoggedIn && (
                <NavItem>
                  <NavLink tag={RRNavLink} to="/workday">
                    Work for the day
                  </NavLink>
                </NavItem>
              )}
            </Nav>

            <Nav navbar>
              {isLoggedIn && (
                <>
                  <NavItem>
                    <Button
                      variant="secondary"
                      style={{
                        color: "black",
                      }}
                      onClick={logout}
                      className="logoutBtn"
                    >
                      Logout
                    </Button>
                  </NavItem>
                </>
              )}

              {!isLoggedIn && (
                <>
                  <NavItem>
                    <NavLink tag={RRNavLink} to="/login">
                      Login
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={RRNavLink} to="/register">
                      Register
                    </NavLink>
                  </NavItem>
                </>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </Nav>
    </div>
  );
}
