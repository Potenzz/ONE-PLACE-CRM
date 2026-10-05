import React, {useState} from 'react';
import axios from 'axios';
import './Styles/login.css';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = () => {
    setErrorMsg("");
    if (isLogin) {
      axios.post("http://localhost:5000/login", {
        username,
        password
      }, {withCredentials: true}).then(res => {
        if (res.data === 'success') {
          window.location.href = '/';
        }
      }).catch(err => {
        setErrorMsg("Invalid login credentials!");
      })
    } else {
      axios.post("http://localhost:5000/newuser", {
        userDetails: { username, password, role: 'admin' }
      }).then(() => {
        // Auto log in after registration
        axios.post("http://localhost:5000/login", {
          username,
          password
        }, {withCredentials: true}).then(res => {
          if (res.data === 'success') {
            window.location.href = '/';
          }
        }).catch(err => {
          setErrorMsg("Account created, but auto-login failed (username might already exist). Please try logging in manually.");
        });
      }).catch(err => {
        setErrorMsg("Error creating account.");
      })
    }
  };

  return (
    <div className="bodyWrap">
      <div className="contentLoginWrap">
        <div className="loginSide">
          <div className="loginWrap" style={{ transition: "all 0.5s ease" }}>
            <h1>{isLogin ? "Log in" : "Sign Up"}</h1>
            {errorMsg && <p style={{color: 'red', fontWeight: 'bold'}}>{errorMsg}</p>}
            <div className="input-group">
              <input type="text" className="input" value={username} onChange={e => setUsername(e.target.value)} required="required"/>
              <label className={`${username.length > 0 ? "focusLabel" : ""}`}>Username</label>
            </div>
            <div className="input-group">
              <input type="password" className="input password" value={password} onChange={e => setPassword(e.target.value)} required="required"/>
              <label className={`${password.length > 0 ? "focusLabel" : ""}`}>Password</label>
            </div>
            <button onClick={handleSubmit}>{isLogin ? "Login" : "Register"}</button>
            
            <p 
              style={{marginTop: '35px', cursor: 'pointer', color: '#EF5F63', fontWeight: 'bold', fontSize: '14px', transition: '0.3s'}} 
              onClick={() => { setIsLogin(!isLogin); setUsername(""); setPassword(""); setErrorMsg(""); }}
              onMouseOver={(e) => e.target.style.color = '#5F0000'}
              onMouseOut={(e) => e.target.style.color = '#EF5F63'}
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
            </p>
          </div>
        </div>
        <div className="infoSide">
          <div className="loginWrap">
            <h2>{isLogin ? "Hello again!" : "Welcome!"}</h2>
            <p>{isLogin ? "Log in to your account to get access to app." : "Create a brand new admin account to manage your CRM seamlessly."}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
