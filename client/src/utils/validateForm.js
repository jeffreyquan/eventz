
export default function validateForm(values) {
  let errors = {}

  if (!values.email) {
    errors.email = 'Email address is required.';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid."
  }

  if (!values.name) {
    errors.name = 'Name is required.'
  }

  if (!values.password) {
    errors.password = 'Password is required.';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be greater than 6 characters.'
  }

  if (!values.confirmationPassword) {
    errors.confirmationPassword = 'Must confirm password.';
  } else if (values.password !== values.confirmationPassword) {
    errors.confirmationPassword = 'Passwords must match.'
  }
  
  return errors;
}