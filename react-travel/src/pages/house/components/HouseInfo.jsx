
import { Card, Toast } from 'antd-mobile'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import httpRequest from '../../../utils/httpRequest'
import './HouseInfo.scss'
import { withRouter } from 'react-router-dom'

function HouseInfo(props) {
  const { houseInfo } = props
  const time = (timeStrap) => {
    const res = new Date(timeStrap).toLocaleDateString()
    return res
  }
  // 判断是否有订单
  const [isPre, setIsPre] = useState(false)

  // 存储订单id,用于取消订单
  const [orderId, setOrderId] = useState();
  useEffect(async () => {
    // 先判断是否存在该订单，未存在添加订单，否则显示已预订
    const result = await httpRequest("/orders/hasOrder", {
      id: props.match.params.id
    })

    if (result.data === "订单已存在") {
      setIsPre(true)
    } else {
      setIsPre(false)
    }
  }, [])

  const handlePre = async () => {
    // 先判断是否存在该订单，未存在添加订单，否则显示已预订
    if (isPre) {
      // 取消预订
      const result = await httpRequest("/orders/delOrder", {
        id: orderId
      })
      if (result?.data?.isSuccess) {
        Toast.success("取消预定成功")
        setIsPre(false)
      }
    } else {
      // 添加预定
      const result = await httpRequest("/orders/addOrder", {
        id: props.match.params.id
      })

      if (result?.data?.isSuccess) {
        // 添加订单id
        setOrderId(result.data.id)
        Toast.success("预定成功")
        setIsPre(true)
      }

    }
  }
  return (
    <div className="house-info">
      <Card className="house-info-wrapper">
        <h2 className="house-name">{houseInfo.name}</h2>
        <p className="house-info-name">简介: {houseInfo.info}</p>
        <div className="house-price">价格:   {houseInfo.price}</div>
        <div className="house-publish">发布时间: {time(houseInfo.publishTime)}</div>
        <div className="house-start">开始出租: {time(houseInfo.startTime)}</div>
        <div className="house-end">结束出租: {time(houseInfo.endTime)}</div>
        <button className="pre-btn" onClick={handlePre}>{isPre ? '已预订' : '点击预定'}</button>
      </Card>
    </div>
  )
}

HouseInfo.propTyes = {
  houseInfo: PropTypes.object
}

export default withRouter(HouseInfo)