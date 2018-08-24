import * as React from "react";
import { Button } from "antd";
import "./App.scss";
import Template01 from "./components/template_01";
import jquery from "jquery";

class App extends React.Component {
  getRef = ref => {
    let item = {};
    item[ref.props.name] = ref;
    this.setState({ ...item });
  };

  exportExcel = () => {
    const excelData = this.state["template01"].getData();
    console.log("待导出的数据", excelData);
    jquery.post(
      "http://localhost:8081/exportExcel",
      { data: JSON.stringify(excelData) },
      res => {
        location.href = "http://localhost:8081/" + res.data;
      },
      "json"
    );
  };

  public render() {
    return (
      <div className="App">
        <Button onClick={this.exportExcel}>导出</Button>
        <Template01 name="template01" ref={this.getRef} />
      </div>
    );
  }
}

export default App;
