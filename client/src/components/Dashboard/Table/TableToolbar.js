import React from "react";
import {
  Typography,
  Toolbar,
  AppBar,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useToolBarStyle } from "./Table.style";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

export default function TableToolbar(props) {
  const { sortBy, sortTheTable, sortByParams, onMpSearchValueChange } = props;
  const classes = useToolBarStyle();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleSortChange = (param, event) => {
    setAnchorEl(event.currentTarget);
    sortTheTable(param);
    handleSortClose();
  };

  const handleSortClose = () => {
    setAnchorEl(null);
  };

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
          <div className={classes.sorting}>
            <Typography>Sorted By:</Typography>
            <Button
              variant="contained"
              aria-haspopup="true"
              style={{ width: 250 }}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              {sortBy["label"]}
              <FilterListIcon />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleSortClose}
            >
              {sortByParams.map((param) => (
                <MenuItem
                  key={param.id}
                  onClick={handleSortChange.bind(this, param)}
                  value={param.id}
                >
                  {param.label}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
