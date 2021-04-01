
import PropTypes from 'prop-types'
import './ShowLoading.scss'

export default function ShowLoading(props) {

  return (
    <div className="show-loading" id="show-loading">
      {
        props.showLoading ? <div style={{ textAlign: "center", fontSize: "18px" }}>loading...</div> : <div style={{ textAlign: "center", fontSize: "18px" }}>~没数据了~</div>
      }
    </div>
  )
}
ShowLoading.defaultProps = {
  showLoading: true,
};

ShowLoading.propTypes = {
  showLoading: PropTypes.bool
};