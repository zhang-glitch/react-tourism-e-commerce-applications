
import { NavBar } from 'antd-mobile'
import Banner from './components/Banner'
import Comment from './components/Comment'
import HouseInfo from './components/HouseInfo'
import { Link, withRouter } from 'react-router-dom'
import { useEffect, useState } from 'react'
import httpRequest from '../../utils/httpRequest'

function House(props) {

  const [bannerList, setBannerList] = useState([])
  const [houseInfo, setHouseInfo] = useState({})
  const id = props.match.params.id
  useEffect(async () => {
    const { data } = await httpRequest("/house/detail", {
      id
    })
    // console.log("result", data)
    setBannerList(data.imgs)
    setHouseInfo(data)
  }, [])
  return (
    <div className="house">
      <NavBar
        mode="dark"
        leftContent={<Link to="/" style={{ color: '#ffffff' }}><span className="iconfont iconyemian" style={{ fontSize: "18px" }}></span></Link>}
      >民宿详情</NavBar>
      <Banner bannerList={bannerList}></Banner>
      <HouseInfo houseInfo={houseInfo}></HouseInfo>
      <Comment id={id}></Comment>
    </div>
  )
}

export default withRouter(House)