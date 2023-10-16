import CustomGrid from "../commons/CustomGrid";
import { useSelector } from "react-redux";

import { Box } from "@mui/material";

const ContentGrid = () => {
  const contentList = useSelector((state) => state.content.allContent);

  return (
    <Box sx={{ marginTop: "5vh" }}>
      <CustomGrid array={contentList} />
    </Box>
  );
};

export default ContentGrid;
