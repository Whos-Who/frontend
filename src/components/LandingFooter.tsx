import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getIsUserLoggedIn, getUsername, logoutUser } from "../redux/userSlice";
import Button, { ButtonType } from "./Button";

const DefaultWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px 0;
  width: 100%;
  text-align: center;
  justify-content: space-around;
`;

const LogoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 0;
  width: 100%;
  text-align: center;
  justify-content: center;
`;

const Text = styled.p`
  color: ${(props) => props.theme.colors.blue};
`;

const Username = styled.span`
  color: ${(props) => props.theme.colors.blue};
`;

const LandingFooter: React.FC = () => {
  const doesUserExist = useAppSelector(getIsUserLoggedIn);
  const username = useAppSelector(getUsername);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const navigateToLoginPage = () => {
    history.push("/login");
  };

  const navigateToSignupPage = () => {
    history.push("/signup");
  };

  const navigateToManageDeck = () => {
    history.push("/decks");
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (doesUserExist) {
    return (
      <LogoutWrapper>
        <h4>
          Welcome,&nbsp;
          <Username>{username}</Username>
        </h4>
        <Button onClick={navigateToManageDeck} type={ButtonType.Host}>
          Manage Decks
        </Button>
        <Text onClick={handleLogout}>Sign out</Text>
      </LogoutWrapper>
    );
  }

  return (
    <DefaultWrapper>
      <Text onClick={navigateToLoginPage}>Log in</Text>
      <Text onClick={navigateToSignupPage}>Sign up</Text>
    </DefaultWrapper>
  );
};

export default LandingFooter;
