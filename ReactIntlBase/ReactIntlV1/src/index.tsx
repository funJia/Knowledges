import ReactDOM from 'react-dom';
import React from 'react';
import App from './component/App';
import { LocaleProvider } from 'antd';

import { addLocaleData, IntlProvider } from 'react-intl';

const appLocale = (window as any).appLocale;

import moment from 'moment';
// 需要运行时获取语言包
require("moment/locale/"+appLocale.momentLocale)
moment.locale(appLocale.momentLocale);


addLocaleData(appLocale.data);

ReactDOM.render(
  <LocaleProvider locale={appLocale.antd}>
    <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
      <App />
    </IntlProvider>
  </LocaleProvider>,
  document.getElementById('root')
);
