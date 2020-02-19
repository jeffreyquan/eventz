import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Form, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';

const initialValues = {
  email: "",
  password: "",
};

const Login = ({
  isAuthenticated,
  error,
  login,
  clearErrors
}) => {

  const [values, setValues] = useState(initialValues);

  const [message, setMessage] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    })
  };

  const resetForm = () => {
    setValues({...initialValues});
  };

  useEffect(() => {

    if (error.id === 'LOGIN_FAIL') {
      setMessage(error.error.message);
      setTimeout(() => setMessage(null), 3000);
      resetForm();
    } else {
      setMessage(null);
    }

    return () => {
      setMessage(null);
    }
  }, [error, values.password])

  useEffect(() => {
    return () => {
      clearErrors();
    }
  }, [clearErrors])

  const handleSubmit = e => {
    e.preventDefault();

    const { email, password } = values;

    const user = {
      email,
      password
    };

    login(user);
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
          {message ?
            <Message
              error
              header="Error"
              content={message}
            />
            :
            ''
          }
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