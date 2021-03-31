import axios from 'axios';

export default function httpRequest(requestUrl = "", requestData = {}) {
  const instance = axios.create({
    baseURL: '/api',
    timeout: 5000,
    method: 'post'
  });

  const includeUrl = ["/user/register", "/user/login"]

  instance.interceptors.request.use(config => {
    // 在发送请求之前携带token
    if (includeUrl.includes(config.url)) {
      return config
    } else {
      config.headers = {
        "token": localStorage.getItem("token")
      }
      return config;
    }
  })

  instance.interceptors.response.use(config => {
    if (config.data.status === 200) {
      // 保存token
      if (config.data.data.token) {
        localStorage.setItem("token", config.data.data.token)
      }
      return config.data
    } else if (config.data.status === 500) {
      return config.data.errMsg
    } else if (config.data.status === 1001) {
      return config.data.data
    } else {
      return config.data.errMsg
    }
  })


  return instance({
    url: requestUrl,
    data: requestData
  })
}