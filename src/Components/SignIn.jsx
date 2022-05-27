import React, { useCallback, useState } from "react";
import Input from "./Input";

const SignIn = () => {
  const [details, setDetails] = useState({
    username: "",
    password: "",
  });

  const handelSubmit = useCallback((e) => {
    e.preventDefault();
    console.log(details);
  }, []);

  const handelChange = useCallback((e) => {
    details[e.target.name] = e.target.value;
    setDetails({ ...details });
  }, []);

  return (
    <div className="container">
      <div className="h5 ">Login</div>
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
        />
        <Input
          type="password"
          placeholder="Example@123"
          name="password"
          id="password"
          label="Password"
          value={details.password}
          onChange={handelChange}
        />

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignIn;
