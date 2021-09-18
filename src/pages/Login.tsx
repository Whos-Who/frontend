import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

import Button, { ButtonType } from "../components/Button";
import { StyledInput } from "../components/Styles";
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

const Login: React.FC = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

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
      <StyledInput
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <Button onClick={handleLogin} type={ButtonType.Host}>
        Login
      </Button>
    </Wrapper>
  );
};

export default Login;
