import React, { useState, useEffect } from "react";
import { useForm } from '../utils/useForm';
import { connect } from 'react-redux';
import  { Grid, Button, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import validateForm from '../utils/validateForm';
import { register } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';

const Register = ({
  isAuthenticated,
  error,
  register,
  clearErrors
}) => {

  const [values, handleChange] = useForm({
    name: "",
    email: "",
    password: "",
    confirmationPassword: ""
  });

  const [message, setMessage] = useState(null);

  const [errors, setErrors] = useState(validateForm(values));

  const [disabledButton, setDisabledButton] = useState(true);

  useEffect(() => {

    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }

    return () => {
      setErrors(validateForm(values));
      setDisabledButton(true);
    }
  }, [errors, values]);

  useEffect(() => {

    if (error.id === 'REGISTER_FAIL') {
      setMessage(error.error.message);
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
  }, [clearErrors])

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = values;

    const newUser = {
      name,
      email,
      password
    };

    register(newUser);
  }

  return (
    <Grid columns={1} container centered style={{ height: "100vh" }}>
      <Grid.Row>
        <Grid.Column width={4} verticalAlign="middle">
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label style={{ textAlign: "left" }}>Name</label>
              <Form.Input
                name="name"
                placeholder="Name"
                value={values.name}
                onChange={handleChange}
                required
              />
            </Form.Field>
            <Form.Field>
              <label style={{ textAlign: "left" }}>Email</label>
              <Form.Input
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                required
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
                required
              />
            </Form.Field>
            <Form.Field>
              <label style={{ textAlign: "left" }}>Confirm Password</label>
              <Form.Input
                type="password"
                name="confirmationPassword"
                placeholder="Confirm Password"
                value={values.confirmationPassword}
                onChange={handleChange}
                required
              />
            </Form.Field>
            <Button type="submit" disabled={disabledButton}>
              Sign Up
            </Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(Register);
