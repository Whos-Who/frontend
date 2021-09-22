import axios from "axios";
import { StatusCodes } from "http-status-codes";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Button, { ButtonType } from "../components/Button";
import { ErrorMessage, StyledInput } from "../components/Styles";
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
  margin-top: 15px;
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
  const [isLoggingIn, setIsLoggingIn] = useState(false);

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
        const statusCode = err.response.status;
        if (statusCode == StatusCodes.UNAUTHORIZED) {
          setErrorMessage("Invalid credentials!");
        } else {
          setErrorMessage("Login failed!");
        }
      })
      .finally(() => {
        setIsLoggingIn(false);
      });
  };

  return (
    <Wrapper>
      <StyledInput
        inputType="text"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        $error={errorMessage != null}
      />
      <StyledInput
        inputType="password"
        placeholder="Password"
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
        Don&rsquo;t have an account? &nbsp;
        <Link to="/signup">Sign Up</Link>
      </AccountText>
      <ErrorMessage>&nbsp;{errorMessage}&nbsp;</ErrorMessage>
    </Wrapper>
  );
};

export default Login;
