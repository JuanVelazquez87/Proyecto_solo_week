import React from "react";

const Home = ({ user }) => {
  console.log("USER EN HOME >>", user);
  return (
    <>
      <h1
        style={{
          textAlign: "center",
          marginTop: "200px",
          color: "lavender",
        }}
      >
        WELCOME HOME
      </h1>

      {user.email ? (
        <h3
          style={{
            textAlign: "center",

            color: "red",
          }}
        >{`${user.name} ${user.lastname}`}</h3>
      ) : (
        <h3
          style={{
            textAlign: "center",

            color: "red",
          }}
        >
          logueate o registrate
        </h3>
      )}
    </>
  );
};

export default Home;
