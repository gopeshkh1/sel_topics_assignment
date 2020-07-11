const express = require("express");
const router = express.Router();
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");

const scale = {
  Debates: {
    0: 0,
    2: 2.5,
    5: 5,
    8: 7.5,
    12: 10,
    20: 12.5,
    30: 15,
    50: 17.5,
    75: 20,
    100: 22.5,
    10000000: 25
  },
  Questions: {
    0: 0,
    4: 3,
    10: 6,
    15: 9,
    30: 12,
    45: 15,
    60: 18,
    75: 21,
    100: 24,
    150: 27,
    10000000: 30
  }
};
const datatype = {
  Attendance: "float",
  Debates: "int",
  "Private Member Bills": "int",
  Questions: "int",
  "Criminal Case": "int",
  "Total Assets": "int",
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

function calculateScale(type, value) {
  for (key in scale[type]) {
    if (parseInt(key) >= value) {
      return scale[type][key];
    }
  }
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
          calculateScale("Debates", result["Debates"]) +
          calculateScale("Questions", result["Questions"]) +
          Math.min(result["Private Member Bills"] * 1.5, 15);

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
