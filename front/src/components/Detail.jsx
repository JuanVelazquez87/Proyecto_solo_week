import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeFromFavorites } from "../redux/thunks/userThunks";

const Detail = () => {
  const dispatch = useDispatch();
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original/";
  const user = useSelector((state) => state.user.userData);
  let content = useSelector((state) => state.content.contentDetails);
  const contentId = content.id;
  console.log("content", content, "user", user);

  const backgroundStyle = {
    backgroundImage: `url(${IMAGE_PATH + content.backdrop_path})`,
    backgroundSize: "cover",
    opacity: 0.3,
  };

  let isFavorite;
  if (user) {
    isFavorite = user.favorites.find(
      (favorite) => favorite.contentId === content.id
    );
  }
  const handleRemoveFavorite = (event, contentId) => {
    event.stopPropagation();
    const token = localStorage.getItem("token");
    console.log("a ver aca", contentId);
    removeFromFavorites(token, contentId, dispatch);
  };

  return (
    <Grid
      container
      sx={{
        position: "relative",
        maxWidth: "90%",
        margin: "0 auto",
        marginTop: "8vh",
      }}
    >
      <Box
        sx={{
          ...backgroundStyle,

          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.3,
          zIndex: -1,
        }}
      ></Box>
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          padding: "5vh",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "50vh",
            textAlign: "center",
          }}
        >
          <img
            src={`${IMAGE_PATH + content.poster_path}`}
            alt=""
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={8} sx={{ padding: "5vh" }}>
        <Box sx={{ width: "100%", height: "50vh" }}>
          <Typography sx={{ fontFamily: "serif", fontSize: "4em" }}>
            {content.title || content.name}
          </Typography>
          <Typography sx={{ fontFamily: "serif", fontSize: "1em" }}>
            {content.overview}
          </Typography>
          <Typography sx={{ fontFamily: "serif", fontSize: "1em" }}>
            {content.overview}
          </Typography>
        </Box>
      </Grid>
      (
      {isFavorite && (
        <IconButton
          onClick={(event) => handleRemoveFavorite(event, contentId)}
          sx={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            backgroundColor: "grey",
          }}
        >
          <DeleteIcon
            sx={{
              color: "lightgrey",
              fontSize: "2em",

              borderRadius: "100%",
              padding: "8px",
            }}
          />
        </IconButton>
      )}
      )
    </Grid>
  );
};
export default Detail;
