import React from "react";
import axios from "axios"

export default function Other() {
  const handleClick = () => {
    axios({
      url: '/api/user/list',
      method: 'get'
    }).then(res => {
      console.log(res)
    })
  }
  return (
    <div>
      接口不存在页面
      <button onClick={handleClick}>other</button>
    </div>
  )
}