
import { ImagePicker, Card, InputItem, Button } from 'antd-mobile'
import { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import store from '../../store/index'
import httpRequest from '../../utils/httpRequest'
import './Edit.scss'
import { user } from "../../store/action"
function Edit(props) {

  const [files, setFiles] = useState([])
  const [users, setUsers] = useState(store.getState());
  useEffect(() => {
    store.subscribe(() => {
      setUsers(store.getState())
    })
  })
  const [phone, setPhone] = useState(users?.user?.phone);
  const [sign, setSign] = useState(users?.user?.sign);

  const handleUpdate = async () => {
    const { data } = await httpRequest("/user/edit", {
      phone,
      sign,
      avatar: files[0]?.url
    })
    if (data === "编辑成功") {
      props.history.push("/user")

      if (users?.user?.username) {
        const result = await httpRequest("/user/login", {
          username: users?.user?.username,
          password: users?.user?.psw
        })
        // 更新store的数据
        store.dispatch({ ...user(result.data) })
      }
    }
  }
  return (
    <div className="edit">
      <Card>
        <div className="edit-img">
          <ImagePicker
            onChange={(files) => { setFiles(files) }}
            files={files}
          />
        </div>
        <div className="edit-phone">
          <InputItem
            type="phone"
            placeholder="电话"
            value={phone}
            onChange={(val) => { setPhone(val) }}
          >手机号码：</InputItem>
        </div>
        <div className="edit-sign">
          <InputItem
            placeholder="签名"
            value={sign}
            onChange={(val) => { setSign(val) }}
          >签名：</InputItem>
        </div>
      </Card>
      <Button className="btn-edit" onClick={handleUpdate}>点击修改</Button>
    </div>
  )
}

export default withRouter(Edit)