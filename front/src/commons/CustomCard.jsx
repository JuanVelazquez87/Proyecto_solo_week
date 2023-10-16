import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@emotion/react";
import {
  addToFavorites,
  removeFromFavorites,
} from "../redux/thunks/userThunks";
import { useDispatch, useSelector } from "react-redux";

const CustomCard = ({ content }) => {
  //
  const user = useSelector((state) => state.user.userData);

  const dispatch = useDispatch();
  const theme = useTheme();
  const imgBaseUrl = "https://image.tmdb.org/t/p/original";

  const completeImage = imgBaseUrl + content.poster_path;

  //

  let contentId = content.id;
  let media_type = content.media_type;
  let isFavorite;
  if (user) {
    isFavorite = user.favorites.find(
      (favorite) => favorite.contentId === content.id
    );
  }

  const handleFavorite = (event, contentId, media_type) => {
    event.stopPropagation();
    const token = localStorage.getItem("token");

    addToFavorites(token, contentId, media_type, dispatch);
  };
  const handleRemoveFavorite = (event, contentId) => {
    event.stopPropagation();
    const token = localStorage.getItem("token");

    removeFromFavorites(token, contentId, dispatch);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="auto"
          image={completeImage}
          alt={content.name || content.title}
          sx={{
            position: "relative",
          }}
        />
        {!isFavorite ? (
          <IconButton
            aria-label="add to favorites"
            onClick={(event) => handleFavorite(event, contentId, media_type)}
            sx={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
            }}
          >
            <FavoriteIcon />
          </IconButton>
        ) : (
          <IconButton
            aria-label="remove from favorites"
            onClick={(event) =>
              handleRemoveFavorite(event, contentId, media_type)
            }
            sx={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              color: "red",
            }}
          >
            <FavoriteIcon />
          </IconButton>
        )}
      </CardActionArea>

      <Typography
        height={"60px"}
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          padding: "5px",
        }}
      >
        {content.name || content.title}
      </Typography>
    </Card>
  );
};

export default CustomCard;
