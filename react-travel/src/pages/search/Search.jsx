
import store from '../../store/index'
import { useEffect, useState } from 'react'
import { SearchBar, NavBar, Toast } from 'antd-mobile'
import httpRequest from '../../utils/httpRequest';
import { withRouter, Link } from 'react-router-dom';
import { searchData } from '../../store/action'
import "./Search.scss"
import ShowLoading from '../../components/showloading/ShowLoading'
import useLoading from '../../hooks/useLoading'
import HouseList from '../../components/houseList/HouseList'



function Search(props) {
  let [searchDataList, setSearchDataList] = useState(store.getState());
  const [houseName, setHouseName] = useState("");
  const [pageNum, setPageNum] = useState(props?.location?.query?.pageNum)
  // 是否再次发送请求
  const [request, setRequest] = useState(true)

  useEffect(() => {
    store.subscribe(() => {
      setSearchDataList(store.getState())
    })
  })
  const handleSearch = async () => {
    // 按回车键发送请求
    const result = await httpRequest("/house/search", {
      ...props.location.query,
      houseName
    })
    // console.log("data", data)

    // 更新store的数据
    store.dispatch({
      ...searchData(result.data)

    })

  }

  const handleChange = (val) => {
    setHouseName(val)
  }
  // 加载更多
  useLoading("#show-loading", async (entries) => {
    if (request && entries[0].isIntersecting) {
      // 表示可以再次发送请求
      setPageNum(pageNum + 1)

      if (pageNum > 1) {
        const result = await httpRequest("/house/search", {
          ...props?.location?.query,
          houseName,
          pageNum
        })
        // console.log("result", result)
        if (Array.isArray(result.data)) {
          // 更新store的数据
          store.dispatch({
            ...searchData(result.data)
          })

          // 判断是否还要发送请求
          if (result.data.length < props?.location?.query?.pageSize) {
            setRequest(false)
          }
        } else {
          Toast.fail(result)

        }
      }
    }
  }, null)


  return (
    <div className="search" id="search">
      <NavBar
        mode="dark"
        leftContent={<Link to="/" style={{ color: '#ffffff' }}><span className="iconfont iconyemian" style={{ fontSize: "18px" }}></span></Link>}
      >
        <SearchBar placeholder="搜索民宿" onSubmit={handleSearch} onChange={(val) => { handleChange(val) }} value={houseName} />
      </NavBar>
      {
        searchDataList.searchData.length === 0 ? <div style={{ textAlign: "center", marginTop: '60px' }}>~暂无数据~</div> :
          <div className="search-list">
            <HouseList list={searchDataList.searchData} />
          </div>
      }
      {/* 上拉加载 */}
      {
        searchDataList.searchData.length === 0 ? null : <ShowLoading showLoading={request} />
      }
    </div>
  )
}

export default withRouter(Search)