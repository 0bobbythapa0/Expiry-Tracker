import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useContext } from 'react';
import Home from './components/Home';
import AddItems from './components/AddItems';
import Expired from './components/Expired';
import Unexpired from './components/Unexpired';
import Login from './components/Login';
import SignIn from './components/Signin';
import ProtectedRoute from './components/ProtectedRoute';
import AuthContext from './context/AuthContext';
import './App.css'; // App-specific styles



function App() {
  const { isAuthenticated, logout, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-left">
            <h1 className="website-name">Expiry Tracker</h1>
          </div>
          <ul className="navbar-right">
            <li><Link to="/">Home</Link></li>
            {isAuthenticated ? (
              <>
                <li><Link to="/add-items">Add Items</Link></li>
                <li><Link to="/expired">Expired</Link></li>
                <li><Link to="/unexpired">Unexpired</Link></li>
                <li><button onClick={logout}>Log Out</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Log In</Link></li>
                <li><Link to="/sign-in">Sign In</Link></li>
              </>
            )}
          </ul>
        </nav>

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/add-items" element={<ProtectedRoute><AddItems /></ProtectedRoute>} />
            <Route path="/expired" element={<ProtectedRoute><Expired /></ProtectedRoute>} />
            <Route path="/unexpired" element={<ProtectedRoute><Unexpired /></ProtectedRoute>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
