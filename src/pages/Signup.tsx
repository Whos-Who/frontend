import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

import Button, { ButtonType } from "../components/Button";
import { StyledInput } from "../components/Styles";
import { BACKEND_URL } from "../constants";

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
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

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

  const handleSignup = async () => {
    if (password !== confirmPassword) {
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
    console.log(signupResponse);
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
      <StyledInput
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <StyledInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
      <Button onClick={handleSignup} type={ButtonType.Host}>
        Signup
      </Button>
    </Wrapper>
  );
};

export default Signup;
