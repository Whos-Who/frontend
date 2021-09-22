import axios from "axios";
import { StatusCodes } from "http-status-codes";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import Button, { ButtonType } from "../components/Button";
import {
  AccountText,
  ErrorMessage,
  PageTitle,
  StyledInput,
  StyledLink,
} from "../components/Styles";
import { BACKEND_URL } from "../constants";
import { useTrackPage } from "../hooks/GoogleAnalytics";
import { useAppDispatch } from "../redux/hooks";
import { setUserCredentials } from "../redux/userSlice";

const Wrapper = styled.form`
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
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useTrackPage();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errorMessage != null) {
      setErrorMessage(null);
    }
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errorMessage != null) {
      setErrorMessage(null);
    }
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    if (email.length == 0 || password.length == 0) {
      setErrorMessage("Fields cannot be empty!");
      return;
    }
    const headers = {
      "Content-Type": "application/json",
    };
    const data = {
      email: email,
      password: password,
    };
    setIsLoggingIn(true);
    await axios
      .post(`${BACKEND_URL}/login`, data, {
        headers,
      })
      .then((response) => {
        const {
          token,
          user: { email: userEmail, username, id },
        } = response.data;
        dispatch(
          setUserCredentials({
            id: id,
            username: username,
            email: userEmail,
            token: token,
          })
        );
        setIsLoggingIn(false);
        history.replace("");
      })
      .catch((err) => {
        const statusCode = err?.response?.status || "";
        if (statusCode == StatusCodes.UNAUTHORIZED) {
          setErrorMessage("Invalid credentials!");
        } else {
          setErrorMessage("Login failed!");
        }
        setIsLoggingIn(false);
      });
  };

  return (
    <Wrapper>
      <PageTitle>Log in</PageTitle>
      <StyledInput
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        $error={errorMessage != null}
      />
      <StyledInput
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={handlePasswordChange}
        $error={errorMessage != null}
      />
      <Button
        onClick={handleLogin}
        type={ButtonType.Host}
        isLoading={isLoggingIn}
      >
        Login
      </Button>
      <AccountText>
        <span>
          Don&apos;t have an account?&nbsp;
          <StyledLink to="/signup">Sign up</StyledLink>
        </span>
        <span>
          Or&nbsp;
          <StyledLink to="">play as guest</StyledLink>
        </span>
      </AccountText>
      <ErrorMessage>&nbsp;{errorMessage}&nbsp;</ErrorMessage>
    </Wrapper>
  );
};

export default Login;
