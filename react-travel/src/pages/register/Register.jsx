
import httpRequest from '../../utils/httpRequest'
import { useEffect, useState } from 'react';
import { InputItem, NavBar, Button, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'
import './Register.scss'

export default function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async () => {
    const result = await httpRequest('/user/register', {
      username,
      password
    })
    if (result?.data) {
      Toast.success("注册成功");
    } else {
      Toast.fail("用户已存在");
    }
    setPassword("");
    setUsername("");
  }



  return (
    <div className="register">
      <NavBar
        mode="dark"
        rightContent={[
          <span style={{ marginRight: '16px' }} className="login-btn" key="login "><Link to="/login" style={{ color: '#ffffff' }}>登录</Link></span>
        ]}
      >民宿注册</NavBar>

      <div className="register-wrapper">
        <InputItem
          placeholder="请输入用户名"
          value={username}
          onChange={(val) => { setUsername(val) }}
        >用户名</InputItem>
        <InputItem
          type="password"
          placeholder="请输入密码"
          value={password}
          onChange={(val) => { setPassword(val) }}
        >密码</InputItem>
        <Button type="primary" onClick={handleRegister}>点击注册</Button>
      </div>
    </div>
  )
}