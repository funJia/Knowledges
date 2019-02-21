import antdZh from 'antd/lib/locale-provider/zh_CN';
//import antdEn from 'antd/lib/locale-provider/en_US';
import appLocaleData from 'react-intl/locale-data/zh';
import zhMessages from '../locales/zh.json';

window.appLocale = {
  messages: {
    ...zhMessages,
  },
  antd: antdZh,
  locale: 'zh-Hans-CN',
  momentLocale:'zh-cn',
  data: appLocaleData,
};

// import antdEn from 'antd/lib/locale-provider/en_US';
// import appLocaleData from 'react-intl/locale-data/en';
// import enMessages from '../locales/en.json';

// window.appLocale = {
//   messages: {
//     ...enMessages,
//   },
//   antd: antdEn,
//   locale: 'en-US',
//   data: appLocaleData,
// };
