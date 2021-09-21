import axios from "axios";
import { StatusCodes } from "http-status-codes";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import Button, { ButtonType, ErrorMessage } from "../components/Button";
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

const Signup: React.FC = () => {
  const dispatch = useAppDispatch();

  const history = useHistory();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [matchError, setMatchError] = useState<boolean>(false);
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errorMessage != null) {
      setErrorMessage(null);
    }
    if (matchError) {
      setMatchError(false);
    }
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errorMessage != null) {
      setErrorMessage(null);
    }
    if (matchError) {
      setMatchError(false);
    }
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errorMessage != null) {
      setErrorMessage(null);
    }
    if (matchError) {
      setMatchError(false);
    }
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (errorMessage != null) {
      setErrorMessage(null);
    }
    if (matchError) {
      setMatchError(false);
    }
    setConfirmPassword(e.target.value);
  };

  const handleSignup = async () => {
    if (
      username.length == 0 ||
      email.length == 0 ||
      password.length == 0 ||
      confirmPassword.length == 0
    ) {
      setErrorMessage("All fields must be filled!");
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
        const statusCode = err.response.status;
        if (statusCode == StatusCodes.CONFLICT) {
          setErrorMessage("Username already exists!");
        } else {
          setErrorMessage("Sign up failed!");
        }
      })
      .finally(() => {
        setIsSigningUp(false);
      });
  };

  return (
    <Wrapper>
      <StyledInput
        inputType="text"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
        $error={errorMessage != null && username.length == 0}
      />
      <StyledInput
        inputType="text"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        $error={errorMessage != null && email.length == 0}
      />
      <StyledInput
        inputType="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        $error={errorMessage != null && (password.length == 0 || matchError)}
      />
      <StyledInput
        inputType="password"
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
      <ErrorMessage>&nbsp;{errorMessage}&nbsp;</ErrorMessage>
    </Wrapper>
  );
};

export default Signup;
