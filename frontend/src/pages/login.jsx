import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth'; 
import '../styles/login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const response = await login(data);

      localStorage.setItem('token', response.token); 

      navigate('/payment');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Your Account</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" placeholder="Enter your email" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter your password" required />

        <button type="submit">Sign In</button>
      </form>

      <div className="login-footer">
        Don't have an account? <a href="/signup">Sign up</a>
      </div>
    </div>
  );
};

export default Login;
