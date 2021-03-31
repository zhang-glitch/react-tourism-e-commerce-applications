
import { NavBar } from 'antd-mobile';
import './Header.scss';
import { Link } from 'react-router-dom'
import store from '../../../store/index';
import React from 'react';


export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: store.getState(),
      isLogin: false
    }
  }

  componentDidMount() {
    store.subscribe(() => this.setState({
      user: store.getState(),
      isLogin: false
    }))
    if (this.state.user?.user?.username) {
      this.setState(state => {
        return {
          isLogin: true,
          user: state.user
        }
      })
    }
  }

  render() {
    return (
      <div className="header" >
        <NavBar
          mode="dark"
          rightContent={[
            <div key="unLogin" style={{ display: this.state.isLogin ? "none" : "inline" }}>
              <span style={{ marginRight: '16px' }} className="login-btn" ><Link to="/login">登录</Link></span>
              <span className="register-btn" ><Link to="/register" >注册</Link></span>
            </div>,
            <div key="login" style={{ display: this.state.isLogin ? "inline" : "none" }}>{this.state.user?.user?.username}</div>
          ]}
        >民宿</NavBar>
      </div>
    )
  }
}
