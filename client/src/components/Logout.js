import React, { Fragment } from 'react';
import { logout } from '../actions/authActions';
import { connect } from 'react-redux';
import { Menu, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Logout = ({ logout }) => {

  return (
    <Fragment>
      <Menu.Item
        name="logout"
        onClick={ logout }
      >
        <Button>Logout</Button>
      </Menu.Item>
    </Fragment>
  )
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(
  null,
  { logout }
)(Logout)