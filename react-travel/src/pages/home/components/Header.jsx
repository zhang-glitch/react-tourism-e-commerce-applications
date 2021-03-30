
import { NavBar } from 'antd-mobile';
import './Header.scss';
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className="header">
      <NavBar
        mode="dark"
        rightContent={[
          <span style={{ marginRight: '16px' }} className="login-btn" key="login "><Link to="/login">登录</Link></span>,
          <span className="register-btn" key="register"><Link to="/register" >注册</Link></span>,
        ]}
      >民宿</NavBar>
    </div>
  )
}