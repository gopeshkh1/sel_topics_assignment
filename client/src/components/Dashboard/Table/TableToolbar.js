import React from "react";
import { Typography, Toolbar, AppBar } from "@material-ui/core";
import { useToolBarStyle } from "./Table.style";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { MenuList } from "./CustomizedComp";

export default function TableToolbar(props) {
  const { onMpSearchValueChange } = props;
  const classes = useToolBarStyle();

  return (
    <div>
      <AppBar className={classes.root} position="relative">
        <Toolbar>
          <Typography variant="h6" className={classes.tableName}>
            MP Rating
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search a MP …"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={onMpSearchValueChange}
            />
          </div>
          <MenuList {...props}>Sorted by</MenuList>
        </Toolbar>
      </AppBar>
    </div>
  );
}
