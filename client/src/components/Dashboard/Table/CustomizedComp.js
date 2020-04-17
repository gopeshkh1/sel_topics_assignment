import React from "react";
import { Typography, Menu, MenuItem, Button } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import { makeStyles } from "@material-ui/core/styles";

export function MenuList(props) {
  const { sortBy, sortTheTable, sortByParams } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const useStyles = makeStyles({
    sorting: {
      display: "flex",
      flexDirection: "row",
      flexBasis: 0.5,
      marginLeft: 20,
    },
  });
  const classes = useStyles();

  const handleSortChange = (param, event) => {
    setAnchorEl(event.currentTarget);
    sortTheTable(param);
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
        onClick={(e) => setAnchorEl(e.currentTarget)}
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
  );
}

// import React from "react";
// import Grid from "@material-ui/core/Grid";
// import Button from "@material-ui/core/Button";
// import ButtonGroup from "@material-ui/core/ButtonGroup";
// import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
// import ClickAwayListener from "@material-ui/core/ClickAwayListener";
// import Grow from "@material-ui/core/Grow";
// import Paper from "@material-ui/core/Paper";
// import Popper from "@material-ui/core/Popper";
// import MenuItem from "@material-ui/core/MenuItem";
// import MenuList from "@material-ui/core/MenuList";

// const options = [
//   "Create a merge commit",
//   "Squash and merge",
//   "Rebase and merge",
// ];

// export default function SplitButton() {
//   const [open, setOpen] = React.useState(false);
//   const anchorRef = React.useRef(null);
//   const [selectedIndex, setSelectedIndex] = React.useState(1);

//   const handleClick = () => {
//     console.info(`You clicked ${options[selectedIndex]}`);
//   };

//   const handleMenuItemClick = (event, index) => {
//     setSelectedIndex(index);
//     setOpen(false);
//   };

//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   const handleClose = (event) => {
//     if (anchorRef.current && anchorRef.current.contains(event.target)) {
//       return;
//     }

//     setOpen(false);
//   };

//   return (
//     <Grid container direction="column" alignItems="center">
//       <Grid item xs={12}>
//         <ButtonGroup
//           variant="contained"
//           color="primary"
//           ref={anchorRef}
//           aria-label="split button"
//         >
//           <Button onClick={handleClick}>{options[selectedIndex]}</Button>
//           <Button
//             color="primary"
//             size="small"
//             aria-controls={open ? "split-button-menu" : undefined}
//             aria-expanded={open ? "true" : undefined}
//             aria-label="select merge strategy"
//             aria-haspopup="menu"
//             onClick={handleToggle}
//           >
//             <ArrowDropDownIcon />
//           </Button>
//         </ButtonGroup>
//         <Popper
//           open={open}
//           anchorEl={anchorRef.current}
//           role={undefined}
//           transition
//           disablePortal
//         >
//           {({ TransitionProps, placement }) => (
//             <Grow
//               {...TransitionProps}
//               style={{
//                 transformOrigin:
//                   placement === "bottom" ? "center top" : "center bottom",
//               }}
//             >
//               <Paper>
//                 <ClickAwayListener onClickAway={handleClose}>
//                   <MenuList id="split-button-menu">
//                     {options.map((option, index) => (
//                       <MenuItem
//                         key={option}
//                         disabled={index === 2}
//                         selected={index === selectedIndex}
//                         onClick={(event) => handleMenuItemClick(event, index)}
//                       >
//                         {option}
//                       </MenuItem>
//                     ))}
//                   </MenuList>
//                 </ClickAwayListener>
//               </Paper>
//             </Grow>
//           )}
//         </Popper>
//       </Grid>
//     </Grid>
//   );
// }

//Chip menu
// import Chip from "@material-ui/core/Chip";
// import Paper from "@material-ui/core/Paper";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     justifyContent: "center",
//     flexWrap: "wrap",
//     listStyle: "none",
//     padding: theme.spacing(0.5),
//     margin: 0,
//   },
//   chip: {
//     margin: theme.spacing(0.5),
//   },
// }));
// export function ChipMenu() {
//   const classes = useStyles();
//   const [menuData, setMenuData] = React.useState([
//     "Angular",
//     "jQuery",
//     "Polymer",
//     "React",
//     "Vue.js",
//   ]);
//   const [chipData, setChipData] = React.useState([]);
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleDelete = (chipToDelete) => () => {
//     setChipData((chipData) => chipData.filter((chip) => chip !== chipToDelete));
//     setMenuData((menuData) => menuData.add(chipData));
//   };

//   const onFilterList = (e) => {
//     setAnchorEl(e.target);
//     var value = e.target.value.toLowerCase();
//     const newrows = menuData.filter((row) =>
//       row.toLowerCase().startsWith(value)
//     );
//     setMenuData(newrows);
//   };

//   const handleMenuSelect = (param, event) => {
//     setChipData((chipData) => chipData.add(param));
//     setMenuData((menuData) => menuData.filter((menu) => menu !== param));
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div>
//       <Paper component="ul" className={classes.root}>
//         {chipData.map((data) => {
//           return (
//             <li key={data}>
//               <Chip
//                 icon={icon}
//                 label={data}
//                 onDelete={handleDelete(data)}
//                 className={classes.chip}
//               />
//             </li>
//           );
//         })}
//       </Paper>
//       <InputBase placeholder="Filter the list.." onChange={onFilterList} />
//       <Menu
//         style={{ position: "relative" }}
//         id="simple-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleMenuClose}
//       >
//         {menuData.map((param) => (
//           <MenuItem
//             key={param}
//             onClick={handleMenuSelect.bind(this, param)}
//             value={param}
//           >
//             {param}
//           </MenuItem>
//         ))}
//       </Menu>
//     </div>
//   );
// }

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
        onClick={(e) => setAnchorEl(e.currentTarget)}
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
        {valuesToSelect.map((param) => (
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
