const express = require("express");
const router = express.Router();
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");

router.get("/mpdata", (req, res) => {
  let results = [];
  const pathname = path.join(__dirname, "../../");
  const filename = pathname + "mpdata.csv";

  fs.createReadStream(filename)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      results = results.map((result) => {
        result["Attendance"] = result["Attendance"] * 100;
        return result;
      });
      res.send(results);
    });
});

module.exports = router;
