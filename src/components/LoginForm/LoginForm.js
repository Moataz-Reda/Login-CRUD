import { Alert, Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import { setLoggedInUser } from '../../actions';
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isVaildEmail, setIsVaildEmail] = useState(true);

  const [password, setPassword] = useState("");

  const [invaildLogin, setInvaildLogin] = useState(false);

  const isVaildEmailFun = (email) => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setIsVaildEmail(true);
    } else {
      setIsVaildEmail(false);
    }
  }

  const handleLogin = () => {
    let loggedInUser = props.users.filter((user) => user.email === email)[0];
    if (loggedInUser && loggedInUser.password === password) {
      setInvaildLogin(false);
      props.setLoggedInUser(loggedInUser);
      navigate('/home');
    } else {
      setInvaildLogin(true);
    }
  }

  const keyPress = (e) => {
    if (e.keyCode === 13 && (email && password && isVaildEmail)) {
      handleLogin();
    }
  }

  return (
    <>
      <TextField
        sx={{ m: 1 }}
        id="email"
        label="Email"
        type="email"
        required
        variant="outlined"
        onChange={(e) => {
          isVaildEmailFun(e.target.value)
          setEmail(e.target.value)
        }}
        value={email}
        error={!isVaildEmail}
        helperText={!isVaildEmail && "Enter vaild email"}
        onKeyDown={keyPress}
      />
      <TextField
        sx={{ m: 1 }}
        id="password"
        label="Password"
        type="password"
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        onKeyDown={keyPress}
      />
      {invaildLogin && <Alert severity="error">Invaild email or password</Alert>}
      <Box textAlign='center' sx={{ marginTop: '20px' }}>
        <Button
          variant="contained"
          disabled={!email || !password || !isVaildEmail}
          onClick={() => handleLogin()}>
          Login
        </Button>
      </Box>
    </>
  )
}

const mapStateToProps = ({ users, loggedInUser }) => {
  return { users, loggedInUser }
}

export default connect(mapStateToProps, { setLoggedInUser })(LoginForm);