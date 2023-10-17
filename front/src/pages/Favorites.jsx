import React from "react";

import { useSelector } from "react-redux";
import CustomGrid from "../commons/CustomGrid";

export const Favorites = () => {
  const favoriteList = useSelector((state) => state.user.favorites);

  return (
    <>
      <CustomGrid array={favoriteList} />
    </>
  );
};
