import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Button, { ButtonType } from "../components/Button";
import { StyledInput, StyledPasswordInput } from "../components/Styles";
import { BACKEND_URL } from "../constants";
import { useAppDispatch } from "../redux/hooks";
import { setUserCredentials } from "../redux/userSlice";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
`;

const AccountText = styled.span`
  margin: 15px 0;
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: 500;
  color: ${(props) => props.theme.colors.grayDark};
`;

const Login: React.FC = () => {
  const dispatch = useAppDispatch();

  const history = useHistory();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // TODO: Handle error UI response when invalid login
  const handleLogin = async () => {
    const headers = {
      "Content-Type": "application/json",
    };
    const data = {
      email: email,
      password: password,
    };
    const loginResponse = await axios.post(`${BACKEND_URL}/login`, data, {
      headers,
    });
    if (!loginResponse.data.statusCode) {
      const {
        token,
        user: { email: userEmail, username, id },
      } = loginResponse.data;
      dispatch(
        setUserCredentials({
          id: id,
          username: username,
          email: userEmail,
          token: token,
        })
      );
      history.replace("");
    } else {
      setErrorMessage(`Login failed, ${loginResponse.data.message}`);
    }
  };

  return (
    <Wrapper>
      <h1>Login</h1>
      <StyledInput
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
      <StyledPasswordInput
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <Button onClick={handleLogin} type={ButtonType.Host}>
        Login
      </Button>
      <AccountText>
        Don&lsquo;t have an account? &nbsp;
        <Link to="/signup">Signup</Link>
      </AccountText>
      {errorMessage && <span>{errorMessage}</span>}
    </Wrapper>
  );
};

export default Login;
