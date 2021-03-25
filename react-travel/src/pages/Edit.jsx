import React from 'react';
import axios from 'axios';

export default function Edit() {

  const handleClick = () => {
    axios({
      url: '/api/user/edit',
      method: 'post',
      data: {
        username: 'zl大物',
      },
      headers: { "token": localStorage.getItem("token") }
    }).then(res => {
      console.log("edit", res)
    })
  }

  return (
    <div>
      编辑页面
      <button onClick={handleClick}>编辑</button>
    </div>
  )
}