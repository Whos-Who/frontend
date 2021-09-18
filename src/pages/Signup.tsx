import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
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

const Signup: React.FC = () => {
  const dispatch = useAppDispatch();

  const history = useHistory();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  // TODO: Handle error UI response when invalid signup
  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Password and Confirm Password are not equal");
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
    const signupResponse = await axios.post(`${BACKEND_URL}/register`, data, {
      headers,
    });
    if (signupResponse.status === 201) {
      const {
        token,
        user: { email: userEmail, username: userUsername, id },
      } = signupResponse.data;
      dispatch(
        setUserCredentials({
          id: id,
          username: userUsername,
          email: userEmail,
          token: token,
        })
      );
      history.replace("");
    } else {
      setErrorMessage(`Signup failed, ${signupResponse.data.message}`);
    }
  };

  return (
    <Wrapper>
      <h1>Signup</h1>
      <StyledInput
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
      />
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
      <StyledPasswordInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
      <Button onClick={handleSignup} type={ButtonType.Host}>
        Signup
      </Button>
      {errorMessage && <span>{errorMessage}</span>}
    </Wrapper>
  );
};

export default Signup;
