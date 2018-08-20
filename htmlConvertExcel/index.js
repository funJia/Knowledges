const fs = require("fs");
const htmlTo = require("html2xlsx");

htmlTo(
  `
  <style type="text/css">
    table td {
      color: #666;
      height: 20px;

      border: 1px solid #000;
    }
    tr{      
      height:27pt;
      border: 1px solid #000;
    }
    th{
      height:27pt;
      text-align: center;
      color: windowtext;
      font-size: 22.0pt;
      font-weight: 700;
      font-family: 黑体, monospace;
      border: 1px solid #000;
    }
  </style>
  <table>
    <tr>
      <th colspan="10">中心</th>      
    </tr>
    <tr>
      <td>hello</td>
      <td>world</td>
    </tr>
    <tr>
      <td type="number">123</td>
      <td type="number">123.456</td>
    </tr>
    <tr>
      <td data-type="bool">true</td>
      <td data-type="bool">false</td>
    </tr>
    <tr>
      <td data-type="bool">1</td>
      <td data-type="bool">0</td>
    </tr>
    <tr>
      <td type="formula">SUM(A1:B1)</td>
      <td type="formula">A1-B1</td>
    </tr>
    <tr>
      <td type="date">2013-01-12T12:34:56+08:00</td>
      <td type="datetime">2013-01-12T12:34:56+08:00</td>
    </tr>
  </table>
`,
  (err, file) => {
    if (err) return console.error(err);

    file
      .saveAs()
      .pipe(fs.createWriteStream("test17.xlsx"))
      .on("finish", () => console.log("Done."));
  }
);
