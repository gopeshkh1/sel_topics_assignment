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
import { TableHeadMenu } from "./CustomizedComp";

const columns = [
  { id: "MP name", label: "Name", minWidth: 170 },
  { id: "Political party", label: "Party", minWidth: 100 },
  { id: "State", label: "State", minWidth: 170 }
];

const discreteValues = {
  "Political party": new Set(["All"]),
  State: new Set(["All"])
};

const defaultColFilterVal = {
  "Political party": "All",
  State: "All"
};

const sortByParams = [
  { id: "Performance_Rating", label: "Performance Rating" },
  { id: "Debates", label: "No. of debates" },
  { id: "Questions", label: "No. of Ques. asked" },
  {
    id: "Attendance",
    label: "Attendance %"
  },
  { id: "Private Member Bills", label: "Private Member Bills" },
  { id: "Criminal Case", label: "Criminal Cases" },
  { id: "Total Assets", label: "Total Assets" }
];

var __init = true;

export default function CustomizedTable() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState(sortByParams[0]);
  const [defaultrows, setDefaultRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows_copy, setRowCopy] = useState(defaultrows);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [columnFilterValue, setColumnFilter] = useState({
    ...defaultColFilterVal
  });
  const toggleModalState = () => {
    setModalOpen(!modalOpen);
  };

  const displayUserInfo = name => {
    toggleModalState();
    setSelectedRow(name);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const onMpSearchValueChange = e => {
    var value = e.target.value.toLowerCase();
    var newrows = defaultrows.filter(row =>
      row["MP name"].toLowerCase().startsWith(value)
    );

    newrows = columnFilter(newrows);
    setRowCopy(newrows);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const sortingComparator = param => (a, b) => {
    if (a[param] > b[param]) return -1;
    if (a[param] < b[param]) return 1;
  };

  const sortTheTable = param => {
    setSortBy(param);
    setRowCopy(defaultrows.sort(sortingComparator(param.id)));
  };

  const makeDiscreteValuesSet = rows => {
    rows.forEach(row => {
      for (var val in discreteValues) {
        discreteValues[val].add(row[val]);
      }
    });
  };

  useEffect(() => {
    if (__init) {
      axios.get("/api/mpdata").then(res => {
        var rows = res.data;
        rows.sort(sortingComparator(sortByParams[0]["id"]));
        setDefaultRows(rows);
        setRowCopy(rows);
        makeDiscreteValuesSet(rows);
        __init = false;
      });
    }
  });

  const resetDefaults = () => {
    setColumnFilter({ ...defaultColFilterVal });
  };

  const columnFilterAction = (param, selectedColumn) => {
    columnFilterValue[selectedColumn] = param;
    const newrows = columnFilter(defaultrows);
    setRowCopy(newrows);
  };

  const columnFilter = rows => {
    return rows.filter(row => {
      var returnValue = true;

      for (var value in columnFilterValue) {
        if (
          columnFilterValue[value] !== "All" &&
          row[value] !== columnFilterValue[value]
        ) {
          returnValue = false;
        }
      }

      return returnValue;
    });
  };

  return (
    <div>
      <TableToolbar
        sortBy={sortBy}
        sortTheTable={sortTheTable}
        sortByParams={sortByParams}
        resetDefaults={resetDefaults}
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
                <TableCell>Rank</TableCell>
                {columns.map(column => {
                  const tableHeadOpen =
                    column.label === "State" || column.label === "Party";

                  return (
                    <TableCell
                      key={column.id}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                      {tableHeadOpen && (
                        <TableHeadMenu
                          selectedValue={columnFilterValue[column.id]}
                          selectAction={columnFilterAction}
                          selectedColumn={column.id}
                          valuesToSelect={[...discreteValues[column.id]]}
                        />
                      )}
                    </TableCell>
                  );
                })}
                <TableCell align="right" style={{ minWidth: 170 }}>
                  {sortBy["label"]}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!__init &&
                rows_copy
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        key={row["ID"]}
                        onClick={displayUserInfo.bind(this, row)}
                        role="checkbox"
                        tabIndex={-1}
                      >
                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                        {columns.map(column => {
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
