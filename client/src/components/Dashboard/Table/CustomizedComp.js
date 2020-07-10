import React from "react";
import { Typography, Menu, MenuItem, Button } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import { makeStyles } from "@material-ui/core/styles";

export function MenuList(props) {
  const { sortBy, sortTheTable, sortByParams, resetDefaults } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const useStyles = makeStyles({
    sorting: {
      display: "flex",
      flexDirection: "row",
      flexBasis: 0.5,
      marginLeft: 20
    }
  });
  const classes = useStyles();

  const handleSortChange = (param, event) => {
    setAnchorEl(event.currentTarget);
    sortTheTable(param);
    resetDefaults();
    handleSortClose();
  };

  const handleSortClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.sorting}>
      <Typography>{props.children}</Typography>
      <Button
        variant="contained"
        aria-haspopup="true"
        size="small"
        style={{ width: 200, display: "flex" }}
        onClick={e => setAnchorEl(e.currentTarget)}
      >
        <Typography>{sortBy["label"]}</Typography>
        <FilterListIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleSortClose}
      >
        {sortByParams.map(param => (
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
  );
}

//Table Head menu

export function TableHeadMenu(props) {
  const { selectedValue, selectAction, valuesToSelect, selectedColumn } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleSortChange = (param, event) => {
    setAnchorEl(event.currentTarget);
    selectAction(param, selectedColumn);
    handleMenuClose();
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <button
        aria-haspopup="true"
        onClick={e => setAnchorEl(e.currentTarget)}
        style={{ minWidth: 50 }}
      >
        {selectedValue}
      </button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {valuesToSelect.map(param => (
          <MenuItem
            key={param}
            onClick={handleSortChange.bind(this, param)}
            value={param}
          >
            {param}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
