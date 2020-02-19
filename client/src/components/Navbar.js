import React, { useState } from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Navbar = () => {

  const [activeItem, setActiveItem] = useState(null);

  const handleClick = (e) => setActiveItem(e.target.value);

  return (
    <Menu fixed="top">
      <Container style={{ maxWidth: '1200px' }}>
        <Menu.Item
          as={Link}
          to="/"
          name="home"
          active={activeItem === "home"}
          onClick={handleClick}
        >
          Home
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            as={Link}
            to="/register"
            name="register"
            active={activeItem === "register"}
            onClick={handleClick}
          >
            Register
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/login"
            name="login"
            active={activeItem === "login"}
            onClick={handleClick}
          >
            Login
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}

export default Navbar;