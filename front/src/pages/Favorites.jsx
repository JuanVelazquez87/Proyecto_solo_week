import React from "react";
import { useEffect } from "react";
import {
  fetchAllFavorites,
  removeFromFavorites,
} from "../redux/thunks/userThunks";
import { useSelector } from "react-redux";
import CustomGrid from "../commons/CustomGrid";

export const Favorites = () => {
  const user = useSelector((state) => state.user.userData);
  const [favoriteList, setFavoriteList] = React.useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const favorites = await fetchAllFavorites(user.favorites);
        setFavoriteList(favorites);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchData();
  }, [user.favorites]);

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
