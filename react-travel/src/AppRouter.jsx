import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Orders from './pages/order/Orders'
import Register from './pages/register/Register'
import House from './pages/house/House'
import Search from './pages/search/Search'
import User from './pages/user/User'
import Edit from './pages/user/Edit'


export default function AppRouter() {
  return (
    <Router>
      <Route path="/" exact component={Home} ></Route>
      <Route path="/orders" exact component={Orders} ></Route>
      <Route path="/login" exact component={Login} ></Route>
      <Route path="/register" exact component={Register} ></Route>
      <Route path="/house" exact component={House} ></Route>
      <Route path="/search" exact component={Search} ></Route>
      <Route path="/user" exact component={User} ></Route>
      <Route path="/edit" exact component={Edit} ></Route>
    </Router>
  )
}