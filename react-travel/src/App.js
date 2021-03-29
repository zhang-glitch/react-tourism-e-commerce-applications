import './assets/style/base.scss'
import AppRouter from './AppRouter'
import Footer from './components/footer/Footer.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Router>
        <AppRouter />
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
