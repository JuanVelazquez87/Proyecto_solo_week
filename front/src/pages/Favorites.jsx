import React from "react";

import { useSelector } from "react-redux";
import CustomGrid from "../commons/CustomGrid";

export const Favorites = () => {
  const favoriteList = useSelector((state) => state.user.favorites);
  console.log("favotitesList", favoriteList);
  const handleRemove = (event, contentId) => {
    event.stopPropagation();
    const token = localStorage.getItem("token");

    removeFromFavorites(token, contentId);
  };

  return (
    <>
      <CustomGrid array={favoriteList} />
    </>
  );
};
