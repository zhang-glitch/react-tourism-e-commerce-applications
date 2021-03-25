
import AddComment from './pages/AddComment'
import Demo from './pages/Demo'
import Edit from './pages/Edit'
import Hot from './pages/Hot'
import HouseDetail from './pages/HouseDetail'
import Login from './pages/Login'
import Other from './pages/Other'
import Register from './pages/Register'
import Search from './pages/Search'
function App() {
  return (
    <div className="App">
      <Register></Register>
      <Demo></Demo>
      <Login></Login>
      <Edit></Edit>
      <Other></Other>
      <Hot></Hot>
      <Search></Search>
      <HouseDetail></HouseDetail>
      <AddComment></AddComment>
    </div>
  );
}

export default App;
