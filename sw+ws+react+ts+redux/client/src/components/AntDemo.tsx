import * as React from "react";
import { Button, Pagination } from "antd";
import CreateForm from "../containers/createForm";

class AntDemo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      formData: [
        {
          label: "所属国家:",
          type: 0,
          field: "field1",
          value: "666",
          // 自定义change事件
          onChange: (e => {
            let newFormData = this.state.formData;
            newFormData[0].value = e.target.value;
            this.setState({
              formData: [...newFormData]
            });
          }).bind(this)
        },
        {
          label: "所属城市:",
          type: 0,
          field: "field2"
        },
        {
          label: "所属分类:",
          type: 0,
          field: "field3"
        },
        {
          label: "SKU编号:",
          type: 0,
          field: "field4"
        },
        {
          label: "商品关键字:",
          type: 0,
          field: "field5"
        },
        {
          label: "天猫短码:",
          type: 0,
          field: "field6"
        },
        {
          label: "排序:",
          type: 0,
          field: "field7"
        },
        // 占位不做渲染
        { type: -1 },
        {
          label: "",
          type: 1,
          value: "开始搜索",
          colSpan: 2,
          offset: 1,
          labelCol: 0,
          wrapperCol: 2
        },
        {
          label: "",
          type: 1,
          value: "清空条件",
          colSpan: 2,
          offset: 0,
          labelCol: 0,
          wrapperCol: 24
        },
        {
          label: "",
          type: 1,
          value: "开始搜索",
          colSpan: 2,
          offset: 0,
          labelCol: 0,
          wrapperCol: 2
        },
        {
          label: "",
          type: 1,
          value: "清空条件",
          colSpan: 2,
          offset: 0,
          labelCol: 0,
          wrapperCol: 2
        },
        {
          label: "",
          type: 1,
          value: "clear",
          colSpan: 2,
          offset: 0,
          labelCol: 0,
          wrapperCol: 2
        },
        {
          label: "",
          type: 1,
          value: "clear",
          colSpan: 2,
          offset: 0,
          labelCol: 0,
          wrapperCol: 2
        },
        {
          label: "",
          type: 1,
          value: "clear",
          colSpan: 2,
          offset: 0,
          labelCol: 0,
          wrapperCol: 2
        }
      ],
      formData2: [
        {
          label: "测试字段一",
          type: 0,
          field: "field1",
          value: "666",
          // 自定义change事件
          onChange: (e => {
            let newFormData = this.state.formData2;
            newFormData[0].value = e.target.value;
            this.setState({
              formData2: [...newFormData]
            });
          }).bind(this)
        },
        {
          label: "测试字段2",
          type: 0,
          field: "field2"
        },
        {
          label: "测试字段33",
          type: 0,
          field: "field3"
        },
        {
          label: "测试字段66666666666666",
          type: 0,
          field: "field4",
          labelCol: 12,
          wrapperCol: 12
        }
      ]
    };
  }

  onChange(e) {
    console.log("Page: ", e.target.value);
  }

  render() {
    return (
      <React.Fragment>
        <Button type="primary">5</Button>
        <Pagination
          showQuickJumper
          showSizeChanger
          defaultCurrent={2}
          total={500}
          onChange={this.onChange}
        />
        <CreateForm
          FormData={this.state.formData}
          CreateForm={this.props.CreateForm}
          ModelName="createForm1"
          Model="TestModel"
        />
        <h1>websocket:更新的值</h1>
        {this.props["orderList"]}
        <CreateForm
          FormData={this.state.formData2}
          CreateForm={this.props.CreateForm2}
          ModelName="createForm2"
          Model="TestModel"
        />
      </React.Fragment>
    );
  }
}

export default AntDemo;
