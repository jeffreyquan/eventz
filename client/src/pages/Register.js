import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import  { Grid, Button, Form, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import validateForm from '../utils/validateForm';
import { register } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmationPassword: ""
};

const Register = ({
  isAuthenticated,
  error,
  register,
  clearErrors
}) => {

  const [values, setValues] = useState(initialValues);

  const [message, setMessage] = useState(null);

  const [errors, setErrors] = useState({});

  const [disabledButton, setDisabledButton] = useState(true);

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

  const validateInput = e =>{
    const { name } = e.target;
    setErrors({
      ...errors,
      [name]: validateForm(values)[name]
    });
  };

  useEffect(() => {
    return () => {
      setErrors({});
    }
  }, []);

  useEffect(() => {

    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }

    return () => {
      setDisabledButton(true);
    }
  }, [errors]);

  useEffect(() => {

    if (error.id === 'REGISTER_FAIL') {
      setMessage(error.error.message);
      setTimeout(() => setMessage(null), 3000);
      resetForm();
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
                onBlur={validateInput}
                required
                error={ errors.name }
              />
            </Form.Field>
            <Form.Field>
              <label style={{ textAlign: "left" }}>Email</label>
              <Form.Input
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={validateInput}
                required
                error={ errors.email }
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
                onBlur={validateInput}
                required
                error={ errors.password }
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
                onBlur={validateInput}
                required
                error={ errors.confirmationPassword }
              />
            </Form.Field>
            <Button type="submit" disabled={disabledButton}>
              Sign Up
            </Button>
          </Form>
          {message?
            <Message
              error
              header="Error"
              content={ message }
            />
          :
            ''
          }
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
