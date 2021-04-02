import HouseList from "../../components/houseList/HouseList";
import PropTypes from 'prop-types'
import ShowLoading from "../../components/showloading/ShowLoading";

export default function OrdersItem(props) {
  const { list, isLoading, hiddenText } = props
  return (
    <>
      {
        list && <HouseList list={list} />
      }
      {/* 上拉加载更多 */}
      <ShowLoading showLoading={isLoading} hiddenText={hiddenText} />
    </>
  )
}

OrdersItem.defaultProps = {
  hiddenText: false
}

OrdersItem.propTypes = {
  list: PropTypes.array,
  isLoading: PropTypes.bool,
  hiddenText: PropTypes.bool
}