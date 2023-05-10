import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Singup = () => {
  const navigate = useNavigate();
  //establesemos un estado inicial para la data que va a venir del form
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  // esta funcion utiliza el spread operator para clonar el estado actual de "userData" y luego entre corchetes y en forma dinamica muestra los keys que seran actualizados.
  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/user/singup", userData)
      .then((response) => {
        console.log(response.data);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              value={userData.name}
              type="text"
              name="name"
              placeholder="name"
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              value={userData.lastName}
              type="text"
              name="lastName"
              placeholder="lastName"
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              value={userData.email}
              type="text"
              name="email"
              placeholder="email"
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              value={userData.password}
              type="password"
              name="password"
              placeholder="password"
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            <button type="submit">Submit</button>
          </label>
        </div>
      </form>
    </>
  );
};

export default Singup;
