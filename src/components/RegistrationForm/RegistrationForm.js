import { Alert, Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNewUser, setLoggedInUser } from '../../actions'

const RegistrationForm = (props) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const [isVaildEmail, setIsVaildEmail] = useState(true);

  const [password, setPassword] = useState("");
  const [isVaildPassword, setIsVaildPassword] = useState(true);

  const [lowerVaildated, setLowerVaildated] = useState(false);
  const [upperVaildated, setUpperVaildated] = useState(false);
  const [specialVaildated, setSpecialVaildated] = useState(false);
  const [lengthVaildated, setLengthVaildated] = useState(false);

  const [isDublicateEmail, setIsDublicateEmail] = useState(false);

  const isVaildEmailFun = (email) => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setIsVaildEmail(true);
    } else {
      setIsVaildEmail(false);
    }
  }

  const isVaildPasswordFun = (password) => {
    const lower = new RegExp('(?=.*[a-z])');
    const upper = new RegExp('(?=.*[A-Z])');
    // eslint-disable-next-line
    const special = new RegExp('(?=.*[!@#-_\$%\^&\*])');
    const length = new RegExp('(?=.{8,})');

    setLowerVaildated(lower.test(password) ? true : false);
    setUpperVaildated(upper.test(password) ? true : false);
    setSpecialVaildated(special.test(password) ? true : false);
    setLengthVaildated(length.test(password) ? true : false);

    if (lowerVaildated && upperVaildated && specialVaildated && lengthVaildated) {
      setIsVaildPassword(true);
    } else {
      setIsVaildPassword(false);
    }
  }

  const registerNewUser = () => {
    const foundUserEmail = props.users?.filter((user) => user.email === email)[0];
    if (foundUserEmail) {
      setIsDublicateEmail(true);
    } else {
      setIsDublicateEmail(false);
      const newUser = { username, email, password };
      props.setNewUser(newUser);
      props.setLoggedInUser(newUser);
      navigate('/home');
    }
  }

  return (
    <>
      <TextField
        sx={{ m: 1 }}
        id="username"
        label="Username"
        required
        variant="outlined"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        value={username}
      />
      <TextField
        sx={{ m: 1 }}
        id="email"
        label="Email"
        type="email"
        required
        variant="outlined"
        onChange={(e) => {
          isVaildEmailFun(e.target.value);
          setEmail(e.target.value);
        }}
        value={email}
        error={!isVaildEmail}
        helperText={!isVaildEmail && "Enter vaild email"}
      />
      <TextField
        sx={{ m: 1 }}
        id="password"
        label="Password"
        type="password"
        required
        onChange={(e) => {
          isVaildPasswordFun(e.target.value);
          setPassword(e.target.value);
        }}
        value={password}
        error={!isVaildPassword}
        helperText={!isVaildPassword && "Password should contain minimum 8 characters with at least 1 Uppercase and 1 special character"}
      />
      {isDublicateEmail && <Alert severity="error">
        This email is already taken, please try another one
      </Alert>}
      <Box textAlign='center' sx={{ marginTop: '20px' }}>
        <Button
          variant="contained"
          onClick={() => registerNewUser()}
          disabled={!username || !email || !password || !isVaildEmail || !isVaildPassword}>
          Register
        </Button>
      </Box>
    </>
  )
}

const mapStateToProps = ({ users }) => {
  return { users: users }
}

export default connect(mapStateToProps, { setNewUser, setLoggedInUser })(RegistrationForm);