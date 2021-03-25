import React from "react";
import axios from 'axios';


export default function Login() {
  const handleClick = () => {
    axios({
      url: '/api/user/login',
      method: 'post',
      data: {
        username: 'pp',
        password: "123456"
      }
    }).then(res => {
      localStorage.setItem("token", res.data.data.token)
    })
  }

  const handleLogOut = () => {
    axios({
      url: '/api/user/logout',
      method: 'post'
    }).then(res => {
      localStorage.clear();
      console.log("logout", res)
    })
  }
  return (
    <div>

      登录页面
      <button onClick={handleClick}>登录</button>
      <button onClick={handleLogOut}>退出登录</button>
    </div>
  )
}