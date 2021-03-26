import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Orders from './pages/order/Orders'
import Register from './pages/register/Register'
import House from './pages/house/House'
import Search from './pages/search/Search'


export default function AppRouter() {
  return (
    <Router>
      <Route path="/" exact component={Home} ></Route>
      <Route path="/orders" component={Orders} ></Route>
      <Route path="/login" component={Login} ></Route>
      <Route path="/register" component={Register} ></Route>
      <Route path="/house" component={House} ></Route>
      <Route path="/search" component={Search} ></Route>
    </Router>
  )
}