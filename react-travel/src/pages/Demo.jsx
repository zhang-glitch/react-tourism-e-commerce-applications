import axios from 'axios';

import React from 'react';

export default function Demo() {


  const getDetil = () => {
    axios({
      url: '/api/user/detail',
      method: 'post',
      data: {
        username: 'llm',
        password: "1212121"
      },
      // headers: { 'Authorization': localStorage.getItem("token") }
      headers: { "token": localStorage.getItem("token") }
    }).then(res => {
      console.log(res)
    })
  }
  return (<div>
    详情页面
    <button onClick={getDetil}>获取详情信息</button>
  </div>)
}