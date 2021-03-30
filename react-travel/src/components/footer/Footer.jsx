
import { TabBar } from 'antd-mobile'
import React, { useState } from 'react';
import './Footer.scss'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

function Footer(props) {
  const [selectedTab, setSelectedTab] = useState("home")
  const [items, setItems] = useState([
    {
      title: "首页",
      key: "home",
      iconName: "iconfont iconyemian",
      link: '/'
    },
    {
      title: "订单",
      key: "order",
      iconName: "iconfont iconorder",
      link: '/orders'
    },
    {
      title: "我的",
      key: "profile",
      iconName: "iconfont iconxiyuan04",
      link: '/user'
    },
  ])

  return (
    <div className="footer">
      <TabBar
        unselectedTintColor="#000000"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={!props.show}
      >
        {
          items.map((item) => (
            <TabBar.Item
              title={item.title}
              key={item.key}
              icon={<div style={{
                width: '22px',
                height: '22px'
              }}
                className={item.iconName}
              />
              }
              selectedIcon={<div style={{
                width: '22px',
                height: '22px',
                color: '#33A3F4'
              }}
                className={item.iconName}
              />
              }
              selected={selectedTab === item.title}
              onPress={() => {
                props.history.push(item.link)
                setSelectedTab(item.title)
              }}
            >
            </TabBar.Item>)
          )
        }
      </TabBar>
    </div>
  );
}

Footer.defaultProps = {
  show: true
}

Footer.propTypes = {
  show: PropTypes.bool
}

export default withRouter(Footer)