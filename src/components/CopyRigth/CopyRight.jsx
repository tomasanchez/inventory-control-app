import React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function CopyRight(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://tomasanchez.github.io/"
        target="_blank"
      >
        Tomás Sánchez
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default CopyRight;
