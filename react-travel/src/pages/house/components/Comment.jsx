import { useEffect, useState } from "react"
import httpRequest from "../../../utils/httpRequest"
import PropTypes from 'prop-types'
import './Comment.scss'
import { Card, Modal, Button, TextareaItem, Toast } from 'antd-mobile'
import useLoading from '../../../hooks/useLoading'
import ShowLoading from '../../../components/showloading/ShowLoading'


export default function Comment(props) {
  const [size, setSize] = useState(8);
  const [num, setNum] = useState(1)
  const { id } = props
  const [list, setList] = useState([])
  const [open, setOpen] = useState(false)
  const [commentContent, setCommentContent] = useState("")
  // hiddenText。如果请求条数小于8条，则不显示，反之显示
  const [hiddenText, setHiddenText] = useState(false)
  const [isLoad, setIsLoad] = useState(true)

  const requestList = async (num) => {
    const { data } = await httpRequest('/comment/lists', {
      id,
      pageSize: size,
      pageNum: num
    })

    if (Array.isArray(data)) {
      if (num === 1) {
        setList(data)
      } else {
        setList([...list, ...data])
      }
    }

    if (data.length < size) {
      setHiddenText(true)
    } else {
      setHiddenText(false)
    }

    return data
  }


  useEffect(async () => {
    requestList(1)
  }, [])

  // 添加评论
  const addComment = async () => {
    const result = await httpRequest("/comment/add", {
      houseId: id,
      comment: commentContent
    })
    // console.log("result", result)
    if (result.status === 200) {
      Toast.success("添加成功")
      setCommentContent("")
    } else {
      Toast.fail("添加失败")
      setCommentContent("")
    }
    // 关闭model
    setOpen(false)
    // 再次请求
    // requestList(num)
  }

  useLoading("#show-loading", async entries => {
    if (entries[0].isIntersecting) {
      setNum(num + 1);
      if (num > 1) {
        const data = await requestList(num)
        if (data.length !== size) {
          // 如果请求数据小于8条，则表示不再进行下次请求
          setIsLoad(false)
        } else {
          setIsLoad(true)
        }
      }
    }
  }, null)

  return (
    <div className="comment">
      <Card>
        <Card.Header title={<div style={{ fontSize: '18px', fontWeight: 600 }}>评论展示</div>}></Card.Header>
        {list?.map(item => (
          <div className='comment-wrapper' key={item?.id}>
            <div className="comment-img">
              <img alt='user' className='avatar' src={item?.user?.avatar} />
            </div>
            <div className='comment-info'>
              <div className='info-top'>
                <span className="info-top-name">{item?.user?.username}</span>
                <span className="info-top-time">{new Date(item?.createTime).toLocaleDateString()}</span>
              </div>
              <div className="comment-content">{item?.msg}</div>
            </div>
          </div>
        ))}
      </Card>
      <ShowLoading hiddenText={hiddenText} showLoading={isLoad}></ShowLoading>
      <div className="add-comment" onClick={() => setOpen(true)}>
        评论
      </div>
      <Modal
        popup
        visible={open}
        animationType="slide-up"
      >
        <TextareaItem
          placeholder="请输入评论内容"
          rows={5}
          onChange={(val) => setCommentContent(val)}
          value={commentContent}
        />
        <Button onClick={addComment}>添加评论</Button>
      </Modal>
    </div>
  )
}

Comment.propTypes = {
  id: PropTypes.string
}
