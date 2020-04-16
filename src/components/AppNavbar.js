import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggle,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  NavbarToggler
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal'
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';


class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>
              {user ? `Welcome ${user.name}` : ''}
            </strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestlinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem className = "">
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    const schedule = ( //chua
      <NavItem> 
        <NavLink href="/trainings">Schedule</NavLink>
      </NavItem>
    )

    const pack = ( //chua
      <NavItem> 
        <NavLink href="/packs">Pack</NavLink>
      </NavItem>
    )

    return (
      <div>
        <Navbar expand="sm" className="mb-5 header">
          <Container>
            <NavbarBrand href="/">DPS GYM</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar >
                <NavItem> 
                  <NavLink href="/">Home</NavLink>
                </NavItem>
                {isAuthenticated ? schedule : ""}
                {isAuthenticated ? pack : ""}
                {isAuthenticated ? authLinks : guestlinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);