

import httpRequest from '../../utils/httpRequest'
import { useState } from 'react';
import { InputItem, NavBar, Button, Toast } from 'antd-mobile'
import { Link, withRouter } from 'react-router-dom'
import '../register/Register.scss';
import store from '../../store/index'
import { user } from '../../store/action'


function Login(props) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {

    const result = await httpRequest('/user/login', {
      username,
      password
    })
    if (result?.data) {
      Toast.success("登录成功");
      // 跳转到首页
      props.history.push("/")
      // 将数据存储到redux中
      store.dispatch({
        ...user({
          ...result.data,
          psw: password
        })
      })
    } else {
      Toast.fail("用户名或者密码错误");
    }
    setPassword("");
    setUsername("");
  }



  return (
    <div className="login">
      <NavBar
        mode="dark"
        leftContent={<Link to="/" style={{ color: '#ffffff' }}><span className="iconfont iconyemian" style={{ fontSize: "18px" }}></span></Link>}
        rightContent={[
          <span style={{ marginRight: '16px' }} className="login-btn" key="login "><Link to="/register" style={{ color: '#ffffff' }}>注册</Link></span>
        ]}
      >民宿登录</NavBar>

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
        <Button type="primary" onClick={handleLogin}>点击登录</Button>
      </div>
    </div>
  )
}

export default withRouter(Login);