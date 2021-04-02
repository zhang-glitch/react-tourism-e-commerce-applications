import { Tabs } from 'antd-mobile'
import { useEffect, useState } from 'react'
import useLoading from '../../hooks/useLoading'
import httpRequest from '../../utils/httpRequest'
import OrdersItem from './OrdersItem'

export default function Orders() {

  // 注意这里使用的是sub,不能是key.
  const [tabs] = useState([
    { title: '未支付', sub: 0 },
    { title: '支付', sub: 1 },
  ])

  const [orderList, setOrderList] = useState([])
  const [size] = useState(8)
  const [num, setNum] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  // 这个是判断，第一次请求来的数据是否小于8个，小于就隐藏文字
  const [hiddenText, setHiddenText] = useState(true)
  const [isPay, setIsPay] = useState(0)

  const requestOrder = async (isPay, size, num) => {
    const { data } = await httpRequest("/orders/orderList", {
      isPay,
      pageSize: size,
      pageNum: num
    })
    if (data) {
      data.forEach((item, index) => {
        data[index] = {
          ...item.house,
          ordersId: item.id
        }
      });
    }

    // 只有第一次请求，数量较少才不现实文字的
    if (num === 1) {
      // 判断是否隐藏文字
      if (Array.isArray(data) && data.length < size) {
        setHiddenText(true)
      } else {
        setHiddenText(false)
        setIsLoading(true)
      }
    }
    return data
  }

  useEffect(async () => {
    // 请求未支付的数据,只是开始的时候去发送请求
    const data = await requestOrder(0, size, num)
    setOrderList(data)
  }, [])

  // 切换tabs，来发送请求
  const handleTabs = async (tab, index) => {
    // 未支付
    if (index === 0) {
      setNum(1)
      // 改变setIsPay
      setIsPay(index)
      const data = await requestOrder(index, size, num)
      setOrderList(data)
    } else if (index === 1) {
      setNum(1)
      // 改变setIsPay
      setIsPay(index)
      const data = await requestOrder(index, size, num)
      setOrderList(data)
    }
  }

  // 上拉加载更多
  useLoading("#show-loading", async (entries) => {
    if (entries[0].isIntersecting) {
      // 再次请求
      setNum(num + 1);
      if (num > 1) {
        const data = await requestOrder(isPay, size, num)
        if (Array.isArray(data)) {
          // 第一次请求的数据没有
          setOrderList([...orderList, ...data])
          if (data.length >= size) {
            // 设置loading为false。
            setIsLoading(true);
          } else {
            setIsLoading(false)
          }
        }
      }
    }
  }, null)
  return (
    <div className="orders">
      <Tabs
        tabs={tabs}
        onChange={handleTabs}
      >
        <div style={{ backgroundColor: '#fff', padding: '1px' }}>
          {
            orderList && <OrdersItem list={orderList} isLoading={isLoading} hiddenText={hiddenText} />
          }
        </div>
        <div style={{ backgroundColor: '#fff', padding: '1px' }}>
          {
            orderList && <OrdersItem list={orderList} isLoading={isLoading} hiddenText={hiddenText} />
          }
        </div>
      </Tabs>
    </div>
  )
}