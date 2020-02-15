import React from 'react';
import { useForm } from '../utils/useForm';

const Login = () => {
  const [values, handleChange] = useForm({
    email: "",
    password: "",
  });

   const handleSubmit = e => {
     e.preventDefault();
     console.log("Submitting...");
   };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
        <button>
          Login
        </button>
      </form>
    </div>
  )
}

export default Login;