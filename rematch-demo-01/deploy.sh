echo -e "\033[32m shell参数：$* \033[0m"
test_api_host="http://supplierapi.cattrip.net/V1" 
prod_api_host="http://192.168.100.144:8888/V1"
prod_cdn_host="http://p2l14jpes.bkt.clouddn.com/"
if [[ ${1} == 'prod' ]]
then 
  echo -e "\033[32m 正式环境部署 \033[0m"
  echo -e "\033[32m API_HOST: $prod_api_host \033[0m"
  echo -e "\033[32m CDN_HOST: $prod_cdn_host \033[0m"
  echo ' '
  REACT_APP_API_HOST=$prod_api_host REACT_APP_CDN_URL=$prod_cdn_host npm run build && npm run upload
else
  echo -e "\033[32m 测试环境部署 \033[0m"
  echo -e "\033[32m API_HOST: $test_api_host \033[0m"
  echo ' '
  REACT_APP_API_HOST=$test_api_host npm run build
  echo -e "\033[32m 构建完成! \033[0m"
  echo ' '
  cd build
  tar zcvf ../deploy.tar.gz ./static ./favicon.ico ./index.html
  cd ../
  echo -e "\033[32m 压缩成deploy.tar.gz \033[0m"
  echo ' '
  npm run sftp
fi
