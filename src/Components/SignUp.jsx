import Joi from "joi-browser";
import React, { useCallback, useEffect, useState } from "react";
import Input from "./Input";

const SignUp = () => {
  useEffect(() => {
    document.title = "Sign Up";
  }, []);

  const [details, setDetails] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const [error, setError] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const handelChange = useCallback(
    (e) => {
      let data = details;
      details[e.target.name] = e.target.value;
      setDetails({ ...data });
    },
    [details]
  );
  let schema = {
    fullname: Joi.string().required().label("Full Name"),
    email: Joi.string().required().label("Email"),
    phone: Joi.string().required().label("Phone Number").min(10),
    address: Joi.string().required().label("Address"),
    password: Joi.string().required().label("password").min(5),
  };

  const validate = useCallback(() => {
    const option = { abortEarly: false };
    const { error } = Joi.validate(details, schema, option);
    if (!error) {
      return null;
    } else {
      const errors = {};
      for (let item of error.details) {
        errors[item.path[0]] = item.message;
      }

      return errors;
    }
  });

  const validateProperty = useCallback(({ name, value }) => {
    const obj = { [name]: value };
    const Schema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, Schema);
    return error ? error.details[0].message : null;
  }, []);

  const handelSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const errors = validate();
      setError(errors === null ? {} : errors);
      if (!errors) {
        console.log(details);
      }
    },
    [details]
  );

  return (
    <div className="container">
      <div className="h5">Sign Up</div>
      <form onSubmit={handelSubmit}>
        <Input
          type={"text"}
          placeholder="Enter your full name"
          name="fullname"
          id="fullname"
          label="Full Name"
          value={details.fullname}
          error={error.fullname}
          onChange={handelChange}
        />
        <Input
          type={"email"}
          placeholder="Enter your email address"
          name="email"
          id="email"
          label="Email"
          value={details.email}
          error={error.email}
          onChange={handelChange}
        />
        <Input
          type={"number"}
          placeholder="Enter your phone number"
          name="phone"
          id="phone"
          label="Phone Number"
          value={details.phone}
          error={error.phone}
          onChange={handelChange}
        />
        <Input
          type={"text"}
          placeholder="Enter your address"
          name="address"
          id="address"
          label="Address"
          value={details.address}
          error={error.address}
          onChange={handelChange}
        />
        <Input
          type={"password"}
          placeholder="Enter your password"
          name="password"
          id="password"
          label="Password"
          value={details.password}
          error={error.password}
          onChange={handelChange}
        />
        <button className="btn btn-outline-success" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
