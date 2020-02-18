import React, { useState, useEffect } from 'react';
import { useForm } from '../utils/useForm';
import { connect } from 'react-redux';
import { Grid, Button, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';

const Login = props => {
  const [values, handleChange] = useForm({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(null);

  const { error, clearErrors } = props;

  useEffect(() => {
    console.log(error);
    if (error.id === 'LOGIN_FAIL') {
      console.log(error);
      setMessage(error.error.error);
    } else {
      setMessage(null);
    }

    return () => {
      setMessage(null);
    }
  }, [error])

  useEffect(() => {
    return () => {
      clearErrors();
    }
  }, [])

  const handleSubmit = e => {
    e.preventDefault();
    console.log('hello')

    const { email, password } = values;

    const user = {
      email,
      password
    };

    props.login(user);
  };

  return (
    <Grid columns={1} container centered style={{ height: "100vh" }}>
      <Grid.Row>
        <Grid.Column width={4} verticalAlign="middle">
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label style={{ textAlign: "left" }}>Email</label>
              <Form.Input
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label style={{ textAlign: "left" }}>Password</label>
              <Form.Input
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
              />
            </Form.Field>
            <Button type="submit">
              Login
            </Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(Login);