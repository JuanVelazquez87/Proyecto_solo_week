import { Box, Grid, Typography } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import React from "react";
import { useSelector } from "react-redux";

const Details = () => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original/";
  const chosenContent = useSelector((state) => state.content.contentDetails);

  const backgroundStyle = {
    backgroundImage: `url(${IMAGE_PATH + chosenContent.backdrop_path})`,
    backgroundSize: "cover",
    opacity: 0.3,
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
            src={`${IMAGE_PATH + chosenContent.poster_path}`}
            alt=""
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={8} sx={{ padding: "5vh" }}>
        <Box sx={{ width: "100%", height: "50vh" }}>
          <Typography sx={{ fontFamily: "serif", fontSize: "4em" }}>
            {chosenContent.title || chosenContent.name}
          </Typography>
          <Typography sx={{ fontFamily: "serif", fontSize: "1em" }}>
            {chosenContent.overview}
          </Typography>
          <Typography sx={{ fontFamily: "serif", fontSize: "1em" }}>
            {chosenContent.overview}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Details;
