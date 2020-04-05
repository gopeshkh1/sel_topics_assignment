import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useStyle } from "./Appbar.style";

export default function ButtonAppBar() {
  const classes = useStyle();
  return (
    <div>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Data for Democracy
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
