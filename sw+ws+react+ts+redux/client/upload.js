/*
 * @Author: Gavin Chan 
 * @Date: 2018-01-17 15:43:29 
 * @Last Modified by: Gavin Chan
 * @Last Modified time: 2018-08-06 14:53:09
 */
const qiniu = require("qiniu");
const fs = require("fs");
const rd = require("rd");
const path = require("path");
const os = require("os");
const chalk = require("chalk");
const env = process.env.NODE_ENV;

// 七牛配置
const ak = (qiniu.conf.ACCESS_KEY = "bXYqJXBrhXTr6tzGC78MlguHXuz6CoX7nhqI5_zd");
const sk = (qiniu.conf.SECRET_KEY = "2SPVLWPdxQ8u6to_9aWK9H97CcpuuMravEZJyiNU");
const bucket = "testupload"; //test bucket
const mac = new qiniu.auth.digest.Mac(ak, sk);

chalk.green("node环境变量：", process.env.NODE_ENV);
console.log("-------------------------");

const options = {
  scope: bucket
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);

const config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z2;
const formUploader = new qiniu.form_up.FormUploader(config);
const bucketManager = new qiniu.rs.BucketManager(mac, config);

// 获取目录下所有文件路径和文件夹
const files = rd.readSync("./build/static/");
// 过滤文件夹
const uploadFiles = files.filter(file => {
  return !fs.statSync(file).isDirectory();
});
const filesType = [
  "js",
  "css",
  "png",
  "jpg",
  "gif",
  "svg",
  "tff",
  "eot",
  "woff"
];
// 过滤文件类型
const localFiles = uploadFiles.filter(file => {
  const dir = file.split(".");
  const fileSuffix = dir[dir.length - 1];
  return filesType.includes(fileSuffix);
});

// @param options 列举操作的可选参数
//  prefix    列举的文件前缀
//  marker    上一次列举返回的位置标记，作为本次列举的起点信息
//  limit     每次返回的最大列举文件数量
//  delimiter 指定目录分隔符
// 查看存储空间信息
bucketManager.listPrefix(bucket, null, function(error, respBody, respInfo) {
  // console.log('查看存储空间信息:'+error)
  // console.log('-------------------------')
  // console.log('响应信息',respBody)
  // console.log('-------------------------')
  // console.log('响应信息详情',respInfo)
  // console.log('-------------------------')
  // 如果有文件存在则删除
  if (respBody.items.length > 0) {
    const arrFiles = respBody.items.map(item => {
      return qiniu.rs.deleteOp(bucket, item.key);
    });

    bucketManager.batch(arrFiles, function(err, respBody, respInfo) {
      if (err) {
        console.log(err);
      } else {
        console.log("删除成功！");
        uploader();
        // 200 is success, 298 is part success
        if (parseInt(respInfo.statusCode / 100) === 2) {
          respBody.map(item => {
            if (item.code !== 200) {
              // console.log('-------------------------');
              // console.log(item.key + "\tsuccess");
            } else {
              // console.log('-------------------------')
              // console.log(item.key + "\t" + item.data.error);
            }
          });
        } else {
          console.log(respInfo.deleteusCode);
          console.log(respBody);
        }
      }
    });
  } else {
    console.log("空间中没有文件,直接开始上传");
    console.log("-------------------------");
    console.log("-------------------------");
    uploader();
  }
});

const mineTypes = {
  js: "application/javascript",
  css: "text/css",
  jpg: "image/jpeg",
  png: "image/png",
  gif: "image/gif"
};

const getMIME = file => {
  const fileSuffix = file.split(".")[1];
  if (fileSuffix in mineTypes) return mineTypes[fileSuffix];
};

const uploader = () => {
  // 上传文件
  // const fileList = getFileNames()
  const funcFileList = () => {
    return localFiles.map(function(file) {
      console.log(file);
      const extname = path.extname(file);
      console.log(extname);
      const basename = path.basename(file);
      if (extname === ".js") {
        return `static/js/${basename}`;
      } else if (extname === ".css") {
        return `static/css/${basename}`;
      } else {
        return `static/media/${basename}`;
      }
    });
  };
  let successNum = 0;
  let failNum = 0;
  const fileList = funcFileList();
  console.log("文件", fileList);
  console.log("文件路径", localFiles);
  fileList.map((key, i) => {
    let localFile = localFiles[i];
    localFile = localFile.replace(/\\/g, "\\\\");
    const putExtra = new qiniu.form_up.PutExtra();
    // const mime = getMIME(key)
    // putExtra.mimeType = mime
    formUploader.putFile(uploadToken, key, localFile, putExtra, function(
      err,
      ret
    ) {
      if (!err) {
        console.log("上传文件：【" + i + "】" + ret.key);
        console.log("-------------------------");
        successNum += 1;
        // ret.key & ret.hash
      } else {
        failNum += 1;
        console.log(err);
      }
      if (i === fileList.length - 1) {
        setTimeout(() => {
          console.log("文件总数：", fileList.length);
          console.log("上传成功总数：", successNum);
          console.log("上传失败总数：", failNum);
        }, 3000);
      }
      // http://docs.qiniu.com/api/put.html#error-code
    });
  });
};
