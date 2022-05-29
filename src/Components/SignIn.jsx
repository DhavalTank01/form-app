import React, { useCallback, useEffect, useState } from "react";
import Input from "./Input";
import Joi, { schema } from "joi-browser";

const SignIn = () => {
  useEffect(() => {
    document.title = "Sign In";
  }, []);
  const [details, setDetails] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    username: "",
    password: "",
  });

  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  const validate = useCallback((Details) => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(Details, schema, options);

    if (!error) {
      return null;
    } else {
      const errors = {};
      for (let item of error.details) {
        errors[item.path[0]] = item.message;
      }
      return errors;
    }
  }, []);

  const handelSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const error = validate(details);
      setError(error === null ? {} : error);
      if (!error) {
        console.log(details);
      }
    },
    [details]
  );

  const handelChange = useCallback(
    (e) => {
      const data = { ...details, [e.target.name]: e.target.value };
      setDetails(data);
    },
    [details]
  );

  return (
    <div className="container">
      <div className="h5 ">Sign In</div>
      <form onSubmit={handelSubmit}>
        <Input
          type="text"
          placeholder="example@gmail.com"
          name="username"
          id="username"
          label="Username"
          value={details.username}
          onChange={handelChange}
          helpText="We'll never share your email with anyone else."
          error={error.username}
        />
        <Input
          type="password"
          placeholder="Example@123"
          name="password"
          id="password"
          label="Password"
          value={details.password}
          error={error.password}
          onChange={handelChange}
        />

        <button type="submit" className="btn btn-outline-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default SignIn;
