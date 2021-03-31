
import { withRouter } from 'react-router-dom'
import Footer from '../footer/Footer.jsx'

function Layout(props) {
  const path = ['/', '/orders', '/user']
  const show = path.includes(props.location.pathname);
  return (
    <>
      <Footer show={show} />
    </>
  )
}

export default withRouter(Layout)