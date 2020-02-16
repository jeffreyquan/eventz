import React from "react";
import { useForm } from "../utils/useForm";
import axios from 'axios';

const SignUp = () => {
  const [values, handleChange] = useForm({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/users/register", values)
      .then(res => {
        console.log('AAAAA');
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
