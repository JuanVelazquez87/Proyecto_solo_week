import React from "react";
import { useSelector } from "react-redux";
export const Home = () => {
  const user = useSelector((state) => state.user.userData);
  console.log(" Home user >>", user);
  return (
    <>
      <h1>Bienvenidos al Home</h1>
    </>
  );
};
