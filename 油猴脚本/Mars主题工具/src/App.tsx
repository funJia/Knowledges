import React from 'react';
import './App.css';
import ColorBlock from "./ColorBlock";
import { Table } from 'antd';


class App extends React.Component {
  columns = [
    {
      title: '颜色变量',
      dataIndex: 'name',
      key: 'name',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: '颜色',
      key: 'background',
      dataIndex: 'background',
      render: (text: any, record: any) => {
        return <ColorBlock data-name={record.name} background={text} onChange={this.onChange} ></ColorBlock >
      }
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 200
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate'
    }
  ];

  constructor(props: any) {
    super(props);
    const thisTheme = {
      "cfg": {
        "@primary-color": "red",
        "@btn-primary-bg": "#0083FF",
        "@primary-color-1": "#383D49",
        "@primary-color-2": "red",
        "@primary-color-3": "#21252C",
        "@primary-color-4": "#383D49",
        "@primary-color-5": "#FF5E5E",
        "@primary-color-6": "#FFF530",
        "@primary-color-7": "#33FF8A",
        "@primary-color-8": "#F8CE1E",
        "@primary-color-9": "#383D49",
        "@primary-color-10": "#E04343",
        "@primary-color-11": "#0096F0",
        "@primary-color-12": "#BE1F1F",
        "@primary-color-13": "#68C52C",
        "@primary-color-14": "#EF5D3E",
        "@primary-color-15": "#FFC83D",
        "@primary-color-16": "#000",
        "@primary-color-17": "#09BDFF",
        "@primary-color-18": "#979797",
        "@primary-color-19": "#989898",
        "@primary-color-20": "#595f6e",
        "@primary-color-21": "#2D3036",
        "@primary-color-22": "#454545",
        "@primary-color-23": "#2D3036",
        "@primary-color-24": "#86869f",
        "@primary-color-25": "#979797",
        "@primary-color-26": "#2C6EDB",
        "@primary-color-27": "#0083FF",
        "@primary-color-28": "#222328",
        "@primary-color-29": "#383D49",
        "@primary-color-30": "#292D37",
        "@primary-color-31": "#040507",
        "@primary-color-32": "#222328",
        "@primary-color-33": "#222328",
        "@primary-color-34": "#ff5757",
        "@primary-color-35": "#f9db12",
        "@primary-color-36": "#15ec71",
        "@primary-color-37": "#595f6e",
        "@primary-color-38": "#595f6e",
        "@primary-color-39": "#595f6e",
        "@primary-color-40": "#595f6e",
        "@primary-color-41": "#595f6e",
        "@primary-color-42": "#2D74FF",
        "@primary-color-255": "#FFF",
        "@primary-color-0": "#000",
        "@primary-color-1-60": "fade(@primary-color-1, 60)",
        "@primary-color-2-20": "fade(@primary-color-2, 20)",
        "@primary-color-2-60": "fade(@primary-color-2, 60)",
        "@primary-color-2-80": "fade(@primary-color-2, 80)",
        "@primary-color-5-60": "fade(@primary-color-5, 60)",
        "@primary-color-13-60": "fade(@primary-color-13, 60)",
        "@primary-color-16-90": "fade(@primary-color-16, 90)",
        "@primary-color-16-76": "fade(@primary-color-16, 76)",
        "@primary-color-27-2425": "fade(@primary-color-27, 24.25)",
        "@primary-color-255-50": "fade(@primary-color-255, 50)",
        "@primary-color-0-64": "fade(@primary-color-0, 64)",
        "@primary-color-2-linear": "linear-gradient(270deg, fade(@primary-color-2, 0) 0%, fade(@primary-color-2, 100) 50%, fade(@primary-color-2, 0) 100%)"
      }
    };
    (window as any).pickerColors = thisTheme.cfg;
  }

  loopBlock = () => {
    const data = (window as any).pickerColors;
    return Object.keys(data).map((item: any, index: number) => {
      return {
        name: item,
        background: data[item]
      }
      //   return <ColorBlock key={index} data-name={item} background={data[item]} onChange={this.onChange}></ColorBlock>
    });
  }

  onChange = (rbg: any) => {
    if ((window as any).pickerColorChange) {
      (window as any).pickerColorChange(rbg);
    }
  }

  render() {
    return (
      <div className="App" >
        <Table columns={this.columns} dataSource={this.loopBlock()}
          pagination={false}
        />
      </div>
    );
  }
}

export default App;
