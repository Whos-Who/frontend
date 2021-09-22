import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getIsUserLoggedIn, getUsername, logoutUser } from "../redux/userSlice";
import Button, { ButtonType } from "./Button";
import { StyledLink } from "./Styles";

const DefaultWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px 0 40px;
  width: 100%;
  text-align: center;
  justify-content: space-around;
`;

const LogoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 15px 0 30px;
  text-align: center;

  h4 {
    margin: 0 0 10px;
  }

  p {
    margin: 20px 0 0;
    color: ${(props) => props.theme.colors.grayDark};
    font-size: ${(props) => props.theme.fontSizes.md};
    font-weight: 500;
    cursor: pointer;

    &:hover {
      color: ${(props) => props.theme.colors.black};
    }
  }
`;

const Username = styled.span`
  color: ${(props) => props.theme.colors.blue};
  font-size: ${(props) => props.theme.fontSizes.md};
`;

const LandingFooter: React.FC = () => {
  const doesUserExist = useAppSelector(getIsUserLoggedIn);
  const username = useAppSelector(getUsername);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const navigateToManageDeck = () => {
    history.push("/decks");
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      dispatch(logoutUser());
    }
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
        <p onClick={handleLogout}>Sign out</p>
      </LogoutWrapper>
    );
  }

  return (
    <DefaultWrapper>
      <StyledLink to="/login">Log in</StyledLink>
      <StyledLink to="/signup">Sign up</StyledLink>
    </DefaultWrapper>
  );
};

export default LandingFooter;
