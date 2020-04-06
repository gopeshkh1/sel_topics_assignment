import React, { useState, useEffect } from "react";
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
import axios from "axios";

const columns = [
  { id: "MP name", label: "Name", minWidth: 170 },
  { id: "Political party", label: "Party", minWidth: 100 },
];

const sortByParams = [
  { id: "Debates", label: "No. of debates" },
  { id: "Questions", label: "No. of Questions asked" },
  {
    id: "Attendance",
    label: "Attendance %",
  },
  { id: "Private Member Bills", label: "Private Member Bills" },
];

var __init = true;

export default function CustomizedTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [sortBy, setSortBy] = React.useState(sortByParams[0]);
  const [defaultrows, setDefaultRows] = React.useState([]);
  // const [mpSearchValue, setMpSearchValue] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows_copy, setRowCopy] = React.useState(defaultrows);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const toggleModalState = () => {
    setModalOpen(!modalOpen);
  };

  const displayUserInfo = (name) => {
    toggleModalState();
    setSelectedRow(name);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const onMpSearchValueChange = (e) => {
    var value = e.target.value.toLowerCase();
    const newrows = defaultrows
      .filter((row) => row["MP name"].toLowerCase().includes(value))
      .sort(sortingComparator(sortBy["id"]));
    console.log(newrows);
    setRowCopy(newrows);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const sortingComparator = (param) => {
    return function (a, b) {
      if (parseInt(a[param]) > parseInt(b[param])) return -1;
      if (parseInt(a[param]) < parseInt(b[param])) return 1;
    };
  };

  const sortTheTable = (param) => {
    setSortBy(param);
    setRowCopy(defaultrows.sort(sortingComparator(param.id)));
  };

  useEffect(() => {
    if (__init) {
      axios.get("/api/mpdata").then((res) => {
        var rows = res.data;
        rows.sort(sortingComparator(sortByParams[0]["id"]));
        setDefaultRows(rows);
        setRowCopy(rows);
        __init = false;
      });
    }
  });

  return (
    <div>
      <TableToolbar
        sortBy={sortBy}
        sortTheTable={sortTheTable}
        sortByParams={sortByParams}
        onMpSearchValueChange={onMpSearchValueChange}
      />
      <Paper className={classes.root}>
        <MPInfo
          open={modalOpen}
          handleClose={toggleModalState}
          selectedRow={selectedRow}
        />

        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell align="right" style={{ minWidth: 170 }}>
                  {sortBy["label"]}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!__init &&
                rows_copy
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        key={row["ID"]}
                        onClick={displayUserInfo.bind(this, row)}
                        role="checkbox"
                        tabIndex={-1}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        })}
                        <TableCell align="right">{row[sortBy["id"]]}</TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows_copy.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
