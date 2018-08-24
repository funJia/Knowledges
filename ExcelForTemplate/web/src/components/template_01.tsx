import * as React from "react";
import { Input, Button, Table } from "antd";

class Template_01 extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [
        {
          key: "-1"
        },
        {
          key: "1",
          name: "John Brown",
          brand: 32,
          num: 1,
          address: "New York No. 1 Lake Park",
          price: 0,
          total: 0
        },
        {
          sum: 0
        }
      ]
    };
  }

  additem = () => {
    let data = this.state.data;
    data.splice(data.length - 1, 1);
    this.setState({
      data: [
        ...data,
        {
          key: "1",
          name: "John Brown",
          brand: 32,
          num: 1,
          address: "New York No. 1 Lake Park",
          price: 0,
          total: 0
        },
        {
          sum: 0
        }
      ]
    });
  };

  // 获取数据
  getData = () => {
    let data = [...this.state.data];
    data.splice(0, 1);
    data.splice(data.length - 1, 1);
    return data;
  };

  render() {
    const renderContent = (value, row: any, index, field) => {
      const changeValue = e => {
        // value = e.target.value;
        let data = this.state.data;
        const _index = data.indexOf(row);
        if (_index) {
          data[_index][field] = e.target.value;
          if (field === "price" || field === "num") {
            data[_index]["total"] =
              parseFloat(data[_index]["price"]) * parseInt(data[_index]["num"]);
            data[data.length - 1]["sum"] = data.reduce((previous, current) => {
              if (current.total) return (previous += current.total);
              return previous;
            }, 0);
          }
          this.setState({
            data
          });
        }
      };
      const obj: any = {
        children: (
          <Input
            placeholder="请输入信息"
            value={value}
            onChange={changeValue}
          />
        ),
        props: {}
      };
      if (index === 0 || index === this.state.data.length - 1) {
        obj.props.colSpan = 0;
      }
      return obj;
    };

    const columns = [
      {
        title: "序号",
        render: (text, row, index) => {
          if (index === 0) {
            return {
              children: <a href="javascript:;">办公电脑配置</a>,
              props: {
                colSpan: 7
              }
            };
          } else if (index === this.state.data.length - 1) {
            return {
              children: (
                <a href="javascript:;">
                  合计：
                  {row.sum}
                </a>
              ),
              props: {
                colSpan: 7
              }
            };
          }
          return {
            children: <span>{index}</span>,
            props: {
              colSpan: 1
            }
          };
        }
      },
      {
        title: "名称",
        dataIndex: "age",
        render: (value, row, index) => renderContent(value, row, index, "age")
      },
      {
        title: "品牌",
        dataIndex: "tel",
        render: (value, row, index) => renderContent(value, row, index, "tel")
      },
      {
        title: "数量",
        dataIndex: "num",
        render: (value, row, index) => renderContent(value, row, index, "num")
      },
      {
        title: "单位",
        dataIndex: "address",
        render: (value, row, index) =>
          renderContent(value, row, index, "address")
      },
      {
        title: "单价",
        dataIndex: "price",
        render: (value, row, index) => renderContent(value, row, index, "price")
      },
      {
        title: "小计",
        dataIndex: "total",
        render: (value, row, index) => renderContent(value, row, index, "total")
      }
    ];

    return (
      <React.Fragment>
        <Button type="primary" onClick={this.additem}>
          添加数据
        </Button>
        <Table columns={columns} dataSource={this.state.data} bordered />
      </React.Fragment>
    );
  }
}

export default Template_01;
