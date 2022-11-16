//import logo from './logo.svg';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Navigation from './components/Navigation';
import CreateCategories from './components/CreateCategories';
import CreateProducts from './components/CreateProducts';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Navigation/>
      <div className="container p-4">
      <Route path="/categorias" component={CreateCategories}/>
      <Route path="/productos" component={CreateProducts}/>
      </div>
    
    </Router>
  
  
    );
}

export default App;
