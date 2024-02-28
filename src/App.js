import logo from './logo.svg';
import './App.css';
import Medicine from './components/admin/Medicine';
import Login from './components/Login';
import { Router } from 'react-router-dom';
import RouterPage from './components/RouterPage';


function App() {
  return (
    <div className="App">
      <RouterPage/>
    </div>
  );
}

export default App;
