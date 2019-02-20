import React, { Component } from 'react';
import './App.css';
import {  FormattedMessage, defineMessages } from 'react-intl';
import {Button,DatePicker} from "antd";

const messages = defineMessages({
  label: {
    id: 'InjectExample.button',
    defaultMessage: '弹窗',
  },
  "commit": {
    id: 'InjectExample.commit',
    defaultMessage: '提交',
  },
});

class App extends Component<any,any> {
  render() {
    return (
      <div className="App">
        <div><a>中文</a>
          <a>english</a>
        </div>
        <div>
          <label><FormattedMessage {...messages.label} /></label>
          <Button><FormattedMessage {...messages.commit} /></Button>
          <DatePicker/>
        </div>
      </div>
    );
  }
}

export default App;
