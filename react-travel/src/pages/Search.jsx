import React from 'react';
import axios from "axios"

export default function Search() {

  const handleSearch = () => {
    axios({
      method: "post",
      url: "/api/house/search",
      data: {
        code: ["10001"],
        endTime: "2020-10-20 13:37:54",
        pageNum: 1,
        pageSize: 8,
        startTime: "2020-08-10 13:37:59",
        houseName: "东城民宿"
      },
      headers: {
        "token": localStorage.getItem("token")
      }
    })
  }
  return (
    <div>
      搜索页面
      <button onClick={handleSearch}>搜索</button>
    </div>
  )
}