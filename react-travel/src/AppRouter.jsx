import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import Login from './pages/login/Login.jsx'
import Orders from './pages/order/Orders.jsx'
import Register from './pages/register/Register.jsx'
import House from './pages/house/House.jsx'
import Search from './pages/search/Search.jsx'
import User from './pages/user/User.jsx'
import Edit from './pages/user/Edit.jsx'
import Layout from './components/layout/Layout.jsx'

export default function AppRouter() {
  return (
    <Router>
      <Route path="/" exact component={Home} ></Route>
      <Route path="/orders" component={Orders} ></Route>
      <Route path="/login" component={Login} ></Route>
      <Route path="/register" component={Register} ></Route>
      <Route path="/house" component={House} ></Route>
      <Route path="/search" component={Search} ></Route>
      <Route path="/user" component={User} ></Route>
      <Route path="/edit" component={Edit} ></Route>
      <Layout />
    </Router>
  )
}
