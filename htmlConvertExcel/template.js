module.exports = temp => {
  return `<table>
    <tr>
      <td colspan="10" class="company">      
        ${temp.company}
      </td>
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
  </table>`;
};
