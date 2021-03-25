import axios from 'axios';

import React from 'react';

export default function Register() {


  const handleRegister = () => {
    axios({
      url: '/api/user/register',
      method: 'post',
      data: {
        username: "pp",
        password: "123456"
      }
    }).then(res => {
      console.log(res)
    })
  }

  return (<div>
    注册页面
    <button onClick={handleRegister}>注册</button>
  </div>)
}