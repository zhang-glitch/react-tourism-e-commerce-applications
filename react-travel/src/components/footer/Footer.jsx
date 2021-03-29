
import { TabBar } from 'antd-mobile'
import { useState } from 'react';
import './Footer.scss'
import { withRouter } from 'react-router-dom'

function Footer(props) {
  // 是否隐藏
  let [hidden, setHidden] = useState(false);
  const [selectedTab, setSelectedTab] = useState("home")
  console.log("props", props)

  return (
    <div className="footer">
      <TabBar
        unselectedTintColor="#000000"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={hidden}
      >
        <TabBar.Item
          title="首页"
          key="home"
          icon={<div style={{
            width: '22px',
            height: '22px'
          }}
            className="iconfont iconyemian"
          />
          }
          selectedIcon={<div style={{
            width: '22px',
            height: '22px',
            color: '#33A3F4'
          }}
            className="iconfont iconyemian"
          />
          }
          selected={selectedTab === 'home'}
          onPress={() => {
            setSelectedTab("home")
            props?.history?.push("/")
          }}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={
            <div style={{
              width: '22px',
              height: '22px'
            }}

              className="iconfont iconorder"
            />
          }
          selectedIcon={
            <div style={{
              width: '22px',
              height: '22px',
              color: '#33A3F4'
            }}
              className="iconfont iconorder"
            />
          }
          title="订单"
          key="order"
          selected={selectedTab === 'order'}
          onPress={() => {
            setSelectedTab("order")
            props?.history?.push("/orders")
          }}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={
            <div style={{
              width: '22px',
              height: '22px'
            }}
              className="iconfont iconxiyuan04"
            />
          }
          selectedIcon={
            <div style={{
              width: '22px',
              height: '22px',
              color: '#33A3F4'
            }}
              className="iconfont iconxiyuan04"
            />
          }
          title="我的"
          key="profile"
          selected={selectedTab === 'profile'}
          onPress={() => {
            setSelectedTab("profile")
            props?.history?.push("/user")
          }}
        >
        </TabBar.Item>
      </TabBar>
    </div>
  );
}

export default withRouter(Footer)