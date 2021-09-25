import axios from "axios";
import { StatusCodes } from "http-status-codes";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import Button, { ButtonType } from "../components/Button";
import {
  AccountText,
  ErrorMessage,
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

const Signup: React.FC = () => {
  const dispatch = useAppDispatch();

  const history = useHistory();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [matchError, setMatchError] = useState<boolean>(false);
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);

  useTrackPage();

  const resetErrors = () => {
    if (errorMessage != null) {
      setErrorMessage(null);
    }
    if (matchError) {
      setMatchError(false);
    }
    if (invalidEmail) {
      setInvalidEmail(false);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetErrors();
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetErrors();
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetErrors();
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    resetErrors();
    setConfirmPassword(e.target.value);
  };

  const isValidEmail = () => {
    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    return pattern.test(email);
  };

  const handleSignup = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (
      username.length == 0 ||
      email.length == 0 ||
      password.length == 0 ||
      confirmPassword.length == 0
    ) {
      setErrorMessage("All fields must be filled!");
      return;
    }
    if (!isValidEmail()) {
      setInvalidEmail(true);
      setErrorMessage("Invalid email!");
      return;
    }
    if (password !== confirmPassword) {
      setMatchError(true);
      setErrorMessage("Passwords do not match!");
      return;
    }
    const headers = {
      "Content-Type": "application/json",
    };
    const data = {
      username: username,
      email: email,
      password: password,
    };
    setIsSigningUp(true);
    await axios
      .post(`${BACKEND_URL}/register`, data, {
        headers,
      })
      .then((response) => {
        const {
          token,
          user: { email: userEmail, username: userUsername, id },
        } = response.data;
        dispatch(
          setUserCredentials({
            id: id,
            username: userUsername,
            email: userEmail,
            token: token,
          })
        );
        setIsSigningUp(false);
        history.replace("");
      })
      .catch((err) => {
        const statusCode = err?.response?.status || "";
        if (statusCode == StatusCodes.CONFLICT) {
          setErrorMessage("Email already exists!");
          setInvalidEmail(true);
        } else {
          setErrorMessage("Sign up failed!");
        }
        setIsSigningUp(false);
      });
  };

  return (
    <Wrapper>
      <h1>Sign up</h1>
      <StyledInput
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
        $error={errorMessage != null && username.length == 0}
      />
      <StyledInput
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        $error={errorMessage != null && (email.length == 0 || invalidEmail)}
      />
      <StyledInput
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        $error={errorMessage != null && (password.length == 0 || matchError)}
      />
      <StyledInput
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        $error={
          errorMessage != null && (confirmPassword.length == 0 || matchError)
        }
      />
      <Button
        onClick={handleSignup}
        type={ButtonType.Host}
        isLoading={isSigningUp}
      >
        Sign Up
      </Button>
      <AccountText>
        <span>
          Already have an account?&nbsp;
          <StyledLink to="/login">Log in</StyledLink>
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

export default Signup;
