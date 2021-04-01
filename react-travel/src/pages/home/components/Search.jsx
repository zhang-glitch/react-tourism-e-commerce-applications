
import { Button, DatePicker } from 'antd-mobile'
import { useState } from 'react';
import httpRequest from '../../../utils/httpRequest';
import { withRouter } from 'react-router-dom'
import store from '../../../store/index'
import { searchData } from '../../../store/action'


function Search(props) {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const btnSearch = () => {
    httpRequest("/house/search", {
      code: "10001",
      startTime: startDate.getTime(),
      endTime: endDate.getTime(),
      pageNum: 1,
      pageSize: 8
    }).then(result => {
      console.log(result)
      // 将数据存储到store中
      store.dispatch({
        ...searchData(result.data)
      })
      // 跳转到search页面
      props.history.push({
        pathname: '/search',
        query: {
          code: "10001",
          startTime: startDate.getTime(),
          endTime: endDate.getTime(),
          pageNum: 1,
          pageSize: 8
        }
      });
    });
  }

  return (
    < div className="skip-search" >
      <DatePicker
        value={startDate}
        onChange={date => setStartDate(date)}
      >
        <Button>请选择开始时间</Button>
      </DatePicker>
      <DatePicker
        value={endDate}
        onChange={date => setEndDate(date)}
      >
        <Button>请选择结束时间</Button>
      </DatePicker>
      <Button onClick={btnSearch}>搜索</Button>
    </div >
  )
}

export default withRouter(Search)