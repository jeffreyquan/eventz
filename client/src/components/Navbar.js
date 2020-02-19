import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Logout from './Logout';

const Navbar = ({ isAuthenticated }) => {

  const [activeItem, setActiveItem] = useState(null);

  const handleClick = (e, { name }) => setActiveItem(name);

  return (
    <Menu
      borderless
      color="teal"
      fixed="top"
      inverted
    >
      <Container style={{ maxWidth: '1200px' }}>
        <Menu.Item
          as={ Link }
          to="/"
          name="home"
          active={activeItem === "home"}
          onClick={handleClick}
        >
          Home
        </Menu.Item>
        {isAuthenticated ?
          <Menu.Menu position="right">
            <Logout />
          </Menu.Menu>
        :
          <Menu.Menu position="right">
            <Menu.Item
              as={Link}
              to="/register"
              name="register"
              active={activeItem === "register"}
              onClick={handleClick}
            >
              <Button primary>Register</Button>
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/login"
              name="login"
              active={activeItem === "login"}
              onClick={handleClick}
            >
              <Button>Login</Button>
            </Menu.Item>
          </Menu.Menu>
        }   
      </Container>
    </Menu>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps
)(Navbar);