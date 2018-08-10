const chalk = require("chalk");
const signale = require("signale");
const rd = require("rd");
const Client = require("ssh2").Client;
const fs = require("fs");
const path = require("path");

const config = {
  host: "47.98.177.153",
  port: "2233",
  user: "root",
  password: "OSJN239S@#"
};

const filename = path.basename("./deploy.tar.gz");
const localPath = rd.readSync("./deploy.tar.gz");
const remoteTarPath = "/data/www/" + filename;
const remoteDir = "/data/www/m.cattrip.net";

signale.note("本地路径:" + chalk.green(localPath));
signale.note("服务器路径:" + chalk.green(remoteTarPath));
signale.start("开始上传");
signale.time();
// 上传deply.tar.gz
UploadFile(config, localPath + "", remoteTarPath + "", (err, result) => {
  if (typeof err !== "undefined") {
    signale.error(chalk.red(err));
  } else {
    signale.success("上传tar包成功！即将解压到指定目录....");
    // 解压tar包到代码存放的目录
    Extract(config, remoteTarPath, remoteDir, cb);
  }
});

function cb() {
  signale.timeEnd("执行时间");
}

/**
 * 描述：上传文件
 * 参数：server 远程电脑凭证；localPath 本地路径；remotePath 远程路径；then 回调函数
 * 回调：then(err, result)
 */
function UploadFile(server, localPath, remotePath, then) {
  Connect(server, conn => {
    conn.sftp((err, sftp) => {
      if (err) {
        then(err);
      } else {
        sftp.fastPut(localPath, remotePath, function(err, result) {
          conn.end();
          then(err, result);
        });
      }
    });
  });
}

function Connect(server, then) {
  const conn = new Client();
  conn
    .on("ready", () => {
      signale.success("已连接到服务器！");
      then(conn);
    })
    .on("error", err => {
      console.log(chalk.red("连接错误!") + err);
    })
    .on("end", () => {
      // console.log(chalk.green("连接结束!"));
    })
    .on("close", had_error => {
      // console.log(chalk.green("关闭连接！"));
    })
    .connect(server);
}

/**
 * @description 解压服务器下的tar包
 * @param {*} server 服务器配置
 * @param {*} filePath 指定解压的包
 * @param {*} targetPath 指定解压目录
 */
function Extract(server, filePath, targetPath, cb) {
  Connect(server, conn => {
    signale.note(
      chalk.green("执行: tar -zxvf " + filePath + " -C " + targetPath)
    );
    signale.note(chalk.green("解压文件中....."));
    conn.exec("tar -zxvf " + filePath + " -C " + targetPath, (err, stream) => {
      if (err) throw err;
      stream
        .on("close", (code, signal) => {
          signale.success(chalk.green("archive is extract successfully."));
          cb();
          conn.end();
        })
        .on("data", data => {
          console.log("info: ".green, `${data}`);
        })
        .stderr.on("data", function(data) {
          console.log("error: ".red, `${data}`);
        });
    });
  });
}
