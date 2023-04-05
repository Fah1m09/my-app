import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import * as React from "react";

export default function Loader() {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
      <h3>Loading</h3>  
    </Box>
  );
}
