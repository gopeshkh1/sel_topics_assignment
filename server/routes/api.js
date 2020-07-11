const express = require("express");
const router = express.Router();
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");

const datatype = {
  Attendance: "float",
  Debates: "int",
  "Private Member Bills": "int",
  Questions: "int",
  "Criminal Cases": "int",
  "National Debates average": "float",
  "National Private Member Bills average": "float",
  "National Questions average": "float",
  "National Attendance average": "float"
};

function valueFormatter(rows) {
  rows.map(row => {
    for (var i in row) {
      if (datatype[i] === "int") {
        row[i] = parseInt(row[i]);
      } else if (datatype[i] === "float") {
        row[i] = parseFloat(row[i]);
      }
    }
  });
  return rows;
}

router.get("/mpdata", (req, res) => {
  let results = [];
  const pathname = path.join(__dirname, "../../");
  const filename = pathname + "mpdata.csv";

  fs.createReadStream(filename)
    .pipe(csv())
    .on("data", data => results.push(data))
    .on("end", () => {
      results = valueFormatter(results);
      results = results.map(result => {
        result["Attendance"] = result["Attendance"] * 100;
        return result;
      });

      results = results.map(result => {
        result["Performance_Rating"] =
          result["Attendance"] * 0.3 +
          result["Debates"] * 0.25 +
          result["Questions"] * 0.3 +
          result["Private Member Bills"] * 0.15;

        result["Performance_Rating"] = Number(
          result["Performance_Rating"].toFixed(5)
        );
        return result;
      });
      // console.log(results);
      res.send(results);
    });
});

module.exports = router;
