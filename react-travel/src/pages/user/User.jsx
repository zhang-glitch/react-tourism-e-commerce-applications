import { List, Button, Toast } from 'antd-mobile'
import { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import httpRequest from '../../utils/httpRequest'
import './User.scss'
import store from '../../store/index'


function User(props) {

  const [serverList] = useState([
    "用户协议",
    "常见问题",
    "联系客服"
  ])

  const [user, setUser] = useState(store.getState());
  useEffect(() => {
    store.subscribe(() => {
      setUser(store.getState())
    })
  })

  const handleLogOut = async () => {
    const result = await httpRequest("/user/logout")
    if (result.data === "OK") {
      Toast.success("退出成功");
      // 跳转到登录页面
      props.history.push("/login");
    } else {
      Toast.success("退出失败");
      throw new Error(result)
    }
  }

  return (
    <div className="user">
      <div className="user-header">
        <div className="edit" onClick={() => props.history.push("/edit")}>编辑</div>
        {
          user?.user ?
            <>
              <div className="user-img" style={{ backgroundImage: user.user.avatar ? `url(${user.user.avatar})` : `url(${'../../assets/image/yay.jpg'})` }}></div>
              <div className="user-phone">{user.user.phone}</div>
              <div className="user-name">{user.user.username}</div>
            </> : null
        }
      </div>
      <div className="user-seaver">
        <List>
          {
            serverList.map((item, index) => {
              return (
                <List.Item key={index} arrow='horizontal'>{item}</List.Item>)
            })
          }
        </List>
      </div>
      <div className="logout">
        <Button onClick={handleLogOut}>退出登录</Button>
      </div>
    </div>
  )
}

export default withRouter(User)