

import httpRequest from '../../../utils/httpRequest';
import { useEffect, useState } from 'react';
import { Flex, Card } from 'antd-mobile'
import './Hot.scss'
import { Link } from 'react-router-dom'
export default function Hot() {
  const [hotList, setHotList] = useState([]);
  useEffect(async () => {
    let { data } = await httpRequest('/house/hot');
    // 将数据分成两份
    data && setHotList([data.slice(0, 2), data.slice(2)])
  }, [])
  return (
    <div className="hot">
      <div className="flex-container">
        {
          hotList.map((element, index) => {
            return (
              <Flex key={index} className="top-hot">
                {
                  element.map(item => {
                    return (
                      <Flex.Item key={item.id}>
                        <Card>
                          <Card.Body>
                            <div className="item-wrapper">
                              <Link to={"/house/" + item.id} >
                                <div className="img" style={{ backgroundImage: `url(${item.imgs[0].url})` }}></div>
                              </Link>
                              <div className="title">{item.name}</div>
                              <div className="info">{item.info}</div>
                              <div className="price">￥ {item.price}</div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Flex.Item>
                    )
                  })
                }
              </Flex>
            )
          })
        }
      </div>
    </div >
  )
}