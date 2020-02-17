import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "../utils/useForm";
import axios from 'axios';
import  { Grid, Button, Form } from 'semantic-ui-react';
import validateForm from '../utils/validateForm';

const SignUp = () => {
  const [values, handleChange] = useForm({
    name: "",
    email: "",
    password: "",
    confirmationPassword: "",
  });

  const [disabledButton, setDisabledButton] = useState(true)

  useEffect(() => {
    setDisabledButton(true);
  }, []);

  useEffect(() => {
    const errors = validateForm(values);
    console.log(errors);
  }, [values]);

  const handleSubmit = (e) => {
    e.preventDefault();
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

export default SignUp;
