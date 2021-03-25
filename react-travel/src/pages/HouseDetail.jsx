import React from "react";
import axios from "axios";



export default function HouseDetail() {
  const handleDetail = () => {
    axios({
      method: "post",
      url: "/api/house/detail",
      headers: {
        "token": localStorage.getItem("token")
      },
      data: {
        id: '1'
      }
    }).then(res => {
      console.log(res)
    })
  }
  return (
    <div>
      民宿详情
      <button onClick={handleDetail}>获取民宿详情</button>
    </div>
  )
}