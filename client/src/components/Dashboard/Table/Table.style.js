import { makeStyles, fade } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 450,
  },
});

export const useToolBarStyle = makeStyles((theme) => ({
  root: { backgroundColor: "#fff3", marginTop: 30 },
  tableName: { flexBasis: 0.4, flexGrow: 1 },
  sorting: {
    display: "flex",
    flexDirection: "row",
    flexBasis: 0.5,
    marginLeft: 20,
  },
  search: {
    flexBasis: 0.5,
    position: "relative",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: 10,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    paddingRight: 20,
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
