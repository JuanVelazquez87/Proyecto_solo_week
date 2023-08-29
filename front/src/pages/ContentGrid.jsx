import React, { useEffect } from "react";
import CustomGrid from "../commons/CustomGrid";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMovies } from "../redux/thunks/contentThunks";
import { Box } from "@mui/material";

const ContentGrid = () => {
  const dispatch = useDispatch();
  const contentList = useSelector((state) => state.content.allContent);

  useEffect(() => {
    fetchAllMovies(dispatch);
  }, []);
  return (
    <Box sx={{ marginTop: "5vh" }}>
      <CustomGrid array={contentList} />
    </Box>
  );
};

export default ContentGrid;
