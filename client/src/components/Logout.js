import React, { Fragment } from 'react';
import { logout } from '../actions/authActions';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Logout = props => {

  return (
    <Fragment>
      <Menu.Item
        name="logout"
        onClick={props.logout}
      >
        Logout
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