import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { useStyles } from "./Table.style";
import TableToolbar from "./TableToolbar";
import MPInfo from "./MPInfo";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString(),
  },
];

function createData(name, code, population) {
  return { name, code, population };
}

const rows = [
  createData("India", "IN", 1324171354),
  createData("China", "CN", 1403500365),
  createData("Italy", "IT", 60483973),
  createData("United States", "US", 327167434),
  createData("Canada", "CA", 37602103),
  createData("Australia", "AU", 25475400),
  createData("Germany", "DE", 83019200),
  createData("Ireland", "IE", 4857000),
  createData("Mexico", "MX", 126577691),
  createData("Japan", "JP", 126317000),
  createData("France", "FR", 67022000),
  createData("United Kingdom", "GB", 67545757),
  createData("Russia", "RU", 146793744),
  createData("Nigeria", "NG", 200962417),
  createData("Brazil", "BR", 210147125),
];

const sortByParams = ["population", "name"];

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [orderBy, setOrderBy] = React.useState(sortByParams[0]);
  const [mpSearchValue, setMpSearchValue] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows_copy, setRowCopy] = React.useState(rows);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedName, setSelectedName] = React.useState("");

  const toggleModalState = () => {
    setModalOpen(!modalOpen);
  };

  const displayUserInfo = (name) => {
    toggleModalState();
    setSelectedName(name);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const onMpSearchValueChange = (e) => {
    var value = e.target.value.toLowerCase();
    setMpSearchValue(value);
    setRowCopy(
      rows.filter((row) => row["name"].toLowerCase().startsWith(value))
    );
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const sortingComparator = (param) => {
    return function (a, b) {
      if (a[param] > b[param]) return 1;
      if (a[param] < b[param]) return -1;
    };
  };

  const sortTheTable = (param) => {
    setMpSearchValue("");
    setOrderBy(param);
    setRowCopy(rows.sort(sortingComparator(param)));
  };

  return (
    <div>
      <TableToolbar
        orderBy={orderBy}
        sortTheTable={sortTheTable}
        sortByParams={sortByParams}
        onMpSearchValueChange={onMpSearchValueChange}
      />
      <Paper className={classes.root}>
        <MPInfo
          open={modalOpen}
          handleClose={toggleModalState}
          name={selectedName}
        />

        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows_copy
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      onClick={displayUserInfo.bind(this, row["name"])}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
