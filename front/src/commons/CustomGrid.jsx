import React from "react";
import { Box } from "@mui/material";
import CustomCard from "./CustomCard";
import { Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
import { fetchContentDetail } from "../redux/thunks/contentThunks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CustomGrid = ({ array }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const theme = useTheme();

  const handleCardClick = async (content) => {
    const { id, media_type } = content;

    await fetchContentDetail(dispatch, id, media_type);
    Navigate("/details");
  };

  return (
    <Box>
      <Grid
        style={{
          backgroundColor: theme.palette.primary.main,
          margin: "0 auto",
        }}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 24 }}
      >
        {array.map((content) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={content.id}>
            <li
              onClick={() => {
                handleCardClick(content);
              }}
            >
              <CustomCard
                name={content.name || content.title}
                poster_path={content.poster_path}
              />
            </li>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CustomGrid;
