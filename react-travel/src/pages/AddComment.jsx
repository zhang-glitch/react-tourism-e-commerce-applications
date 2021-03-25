import axios from 'axios';



export default function AddComment() {
  const handleClick = () => {
    axios({
      method: 'post',
      url: "/api/comment/add",
      data: {
        id: '2',
        comment: "我是第一次添加评论"
      },
      headers: {
        "token": localStorage.getItem("token")
      }
    }).then(res => {
      console.log("comment", res)
    })
  }

  const handleComment = () => {
    axios({
      method: 'post',
      url: "/api/comment/lists",
      data: {
        id: '1',
        // 第几页
        pageNum: 1,
        // 每页个数
        pageSize: 8,
      },
      headers: {
        "token": localStorage.getItem("token")
      }
    }).then(res => {
      console.log("commentList", res)
    })
  }

  const handleHasOrder = () => {
    axios({
      method: 'post',
      url: "/api/orders/hasOrder",
      data: {
        id: '1',
      },
      headers: {
        "token": localStorage.getItem("token")
      }
    }).then(res => {
      console.log("hasOrder", res)
      if (res) {
        axios({
          method: 'post',
          url: "/api/orders/addOrder",
          data: {
            id: '1'
          },
          headers: {
            "token": localStorage.getItem("token")
          }
        }).then(res => {
          console.log("addOrder", res)
        })
      }
    })
  }

  const handleDelOrder = () => {
    axios({
      method: 'post',
      url: "/api/orders/delOrder",
      data: {
        id: 2
      },
      headers: {
        "token": localStorage.getItem("token")
      }
    }).then(res => {
      console.log("delRoder", res)
    })
  }

  const handleAllList = () => {
    axios({
      method: 'post',
      url: "/api/orders/orderList",
      data: {
        isPay: 0,
        pageSize: 8,
        pageNum: 1
      },
      headers: {
        "token": localStorage.getItem("token")
      }
    }).then(res => {
      console.log("list", res)
    })
  }


  const handlePay = () => {
    axios({
      method: 'post',
      url: "/api/orders/pay",
      data: {
        id: 4
      },
      headers: {
        "token": localStorage.getItem("token")
      }
    }).then(res => {
      console.log("pay", res)
    })
  }
  return (
    <div>
      添加评论页面
      <button onClick={handleClick}>添加评论</button>
      <button onClick={handleComment}>获取评论</button>
      <button onClick={handleHasOrder}>判断是否有订单 </button>
      <button onClick={handleDelOrder}>取消订单</button>
      <button onClick={handleAllList}>获取全部订单</button>
      <button onClick={handlePay}>支付订单</button>
    </div >
  )
}