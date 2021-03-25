import React from "react";
import axios from "axios"

export default function Hot() {
  const handleClick = () => {
    axios({
      url: '/api/house/hot',
      method: 'post',
      // 只要是需要登录才能访问的页面，都需要加上token

      headers: {
        "token": localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res)
    })
  }
  return (
    <div>
      热门城市页面
      <button onClick={handleClick}>hot</button>
    </div>
  )
}