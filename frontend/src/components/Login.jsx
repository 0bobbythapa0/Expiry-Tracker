


import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Logins from '../Logins.json';
import Lottie from 'lottie-react';
import AuthContext from '../context/AuthContext'; // Import AuthContext
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext); // Get login function from context
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.token) {
      login(data.token); // Call login function with token
      navigate('/'); // Redirect to home
    } else {
      alert('Invalid login credentials');
    }
  };

  return (
    <div className="main-container">
      <div className='login-lottie'>
        <Lottie animationData={Logins} />
        </div>
    <div className="login-container">
      <h1>Log In</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
    </div>
  );
};

export default Login;
