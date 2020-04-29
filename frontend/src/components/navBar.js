import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

const NavbarComponent = (props) => {
  function createPost() {
    fetch("http://localhost:5000/posts/", {
      method: "POST",
    })
      .then((res) => res.text())
      .then((res) => console.log(res));
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Covid Bounty Board</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">All Posts</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Create Posts</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">My Posts</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>User</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
