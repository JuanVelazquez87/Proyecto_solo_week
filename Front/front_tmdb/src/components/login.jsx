import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [loguinData, setLogindata] = React.useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useState({});
  const handleChange = (event) => {
    setLogindata({
      ...loguinData,
      [event.target.name]: event.target.value,
    });
  };
  console.log("USER >>", user);
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/user/login", loguinData, {
        withCredentials: true,
      })
      .then((response) => setUser(response.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            value={loguinData.email}
            onChange={handleChange}
            name="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            value={loguinData.password}
            onChange={handleChange}
            type="password"
            name="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label for="floatingPassword">Password</label>
        </div>
        <div>
          <label>
            <button type="submit">Log in</button>
          </label>
        </div>
      </form>
    </div>
  );
};

export default Login;
