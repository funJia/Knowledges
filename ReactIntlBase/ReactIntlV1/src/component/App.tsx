import React, { Component } from 'react';
import './App.css';
import { injectIntl, FormattedMessage, defineMessages } from 'react-intl';

const messages = defineMessages({
  label: {
    id: 'InjectExample.button',
    defaultMessage: '弹窗',
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
        </div>
      </div>
    );
  }
}

export default injectIntl(App, {
  withRef: true,
});
