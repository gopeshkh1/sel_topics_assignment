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
  "National Attendance average": "float",
};

function valueFormatter(rows) {
  rows.map((row) => {
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
    .on("data", (data) => results.push(data))
    .on("end", () => {
      results = valueFormatter(results);
      results = results.map((result) => {
        result["Attendance"] = result["Attendance"] * 100;
        return result;
      });

      // console.log(results);
      res.send(results);
    });
});

module.exports = router;
