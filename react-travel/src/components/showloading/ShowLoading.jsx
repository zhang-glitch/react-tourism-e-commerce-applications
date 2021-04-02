
import PropTypes from 'prop-types'
import './ShowLoading.scss'

export default function ShowLoading(props) {
  const { showLoading, hiddenText } = props
  return (
    <div className="show-loading">
      {
        hiddenText ? null :
          (showLoading ? <div style={{ textAlign: "center", fontSize: "18px" }} id="show-loading">loading...</div> : <div style={{ textAlign: "center", fontSize: "18px" }}>~没数据了~</div>)
      }
    </div>
  )
}
ShowLoading.defaultProps = {
  showLoading: true,
  hiddenText: false,
};

ShowLoading.propTypes = {
  showLoading: PropTypes.bool,
  hiddenText: PropTypes.bool
};