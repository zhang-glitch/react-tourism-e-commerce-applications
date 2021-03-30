import { useState } from 'react';
import { withRouter } from 'react-router-dom'
import Footer from '../footer/Footer.jsx'

function Layout(props) {
  const [pathname, setPathname] = useState(props.location.pathname)
  const path = ['/', '/orders', '/user']
  const show = path.includes(pathname);
  return (
    <>
      <Footer show={show} />
    </>
  )
}

export default withRouter(Layout)