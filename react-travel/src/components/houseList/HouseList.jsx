
import { Flex, Card, Toast } from 'antd-mobile'
import PropTypes from 'prop-types'
import './HouseList.scss'
import { Link } from 'react-router-dom'
import httpRequest from '../../utils/httpRequest'
export default function HouseList(props) {
  const { list } = props

  const handlePay = async (id) => {
    const result = await httpRequest("/orders/pay", {
      id: +id
    })

    if (result?.data?.isSuccess) {
      Toast.success("支付成功")
      // 重新刷新页面

    } else {
      Toast.fail("支付失败")
    }
  }
  return (
    <div className="house-list">
      {
        list && list.map((item, index) => {
          return (
            <Flex style={{ margin: '10px' }}
              key={index}
            >
              <Flex.Item>
                <Card>
                  <Card.Body>
                    <div className="item-wrapper">
                      <div className="img-wrapper">
                        <Link to={"/house/" + item.id} >
                          <img src={item.imgs[0].url} alt="" />
                        </Link>
                      </div>
                      <div className="item-info">
                        <div className="title">{item.name}</div>
                        {
                          item.startTime ? null : <div className="info">{item.info}</div>
                        }
                        <div className="price-pay">
                          <div className="price">￥ {item.price}</div>
                          {/* 这里的事件获取不到item，只能将item.ordersId绑定在id上，然后通过事件对象取出 */}
                          {
                            (item.startTime && props.type === "0") ? <div className="pay-btn" id={item.ordersId} onClick={(e) => { handlePay(e.target.id) }}>去支付</div> : null
                          }
                        </div>

                        {
                          item.startTime ? <div className="time">{new Date(item.startTime).toLocaleDateString()}</div> : null
                        }
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Flex.Item>
            </Flex>
          )
        })
      }
    </div >
  )
}

HouseList.propTypes = {
  list: PropTypes.array,
  type: PropTypes.string
}