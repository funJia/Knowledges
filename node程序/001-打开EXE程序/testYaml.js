YAML = require('yamljs');

// Load yaml file using YAML.load

nativeObject = YAML.load('./config.yml');

 

// jsonstr = JSON.stringify(nativeObject);

// jsonTemp = JSON.parse(jsonstr, null);

console.log(nativeObject)

// console.log(jsonstr);

// console.log(jsonTemp.Config.Srvc);
