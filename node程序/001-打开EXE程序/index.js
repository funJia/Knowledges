const YAML = require('yamljs');

// Load yaml file using YAML.load

config = YAML.load('./config.yml');
const exec= require("child_process").exec;
const func=()=>
    config.AutoStart.forEach(exePath => {
        exec(exePath,(err,data)=>{
            console.log(err);
            console.log(data);
        }); 
    });
 
func();