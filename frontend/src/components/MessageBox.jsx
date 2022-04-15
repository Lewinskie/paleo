import { Typography } from "@mui/material";
import React from "react";
import WarningIcon from "@mui/icons-material/Warning";

const MessageBox = (props) => {
  return (
    <div
      style={{
        margin: "2rem",
        background: "pink",
        padding: "1rem",
        borderRadius: "5px",
        width: "100%",
        display: "flex",
        color: "red",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <WarningIcon variant="h4" style={{ marginRight: "2rem" }} />
      <Typography variant="h5">{props.children}</Typography>
    </div>
  );
};

export default MessageBox;
