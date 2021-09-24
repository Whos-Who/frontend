import React, { useEffect } from "react";
import styled, { useTheme } from "styled-components";

import { SnackBarType } from "../constants/types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectPlayerId } from "../redux/playerSlice";
import { removeSnackBar } from "../redux/snackBarsSlice";

type WrapperProps = {
  $primaryColor: string;
  $secondaryColor: string;
};

const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  margin-top: 10px;
  padding: 5px 15px;
  border-radius: 3px;
  border: 2px solid ${(props) => props.$secondaryColor};
  background: ${(props) => props.$primaryColor};
  color: ${(props) => props.theme.colors.isabelline};
  font-size: ${(props) => props.theme.fontSizes.sm};
  box-shadow: 0px 1px 5px rgba(0, 1, 0, 0.3);
`;

interface Props {
  snackBar: SnackBar;
}

const TIME = 2000;

const SnackBar: React.FC<Props> = function (props) {
  const { snackBar } = props;
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const playerId = useAppSelector(selectPlayerId);
  const { players } = useAppSelector((state) => state.gameState);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(removeSnackBar({ id: snackBar.id }));
    }, TIME);

    return () => clearTimeout(timeout);
  }, []);

  let prefix = "";

  if (snackBar.clientId && snackBar.clientId != "") {
    // Ignore snackbars pertaining to yourself
    if (snackBar.clientId === playerId) {
      dispatch(removeSnackBar({ id: snackBar.id }));
      return null;
    }
    prefix = players[snackBar.clientId].username;
  }

  let primaryColor;
  let secondaryColor;

  switch (snackBar.type) {
    case SnackBarType.Positive:
      primaryColor = theme.colors.emerald;
      secondaryColor = theme.colors.emeraldDark;
      break;
    case SnackBarType.Negative:
      primaryColor = theme.colors.terraCotta;
      secondaryColor = theme.colors.terraCottaDark;
      break;
    case SnackBarType.Default:
    default:
      primaryColor = theme.colors.blue;
      secondaryColor = theme.colors.blueDark;
      break;
  }

  return (
    <Wrapper $primaryColor={primaryColor} $secondaryColor={secondaryColor}>
      {prefix}
      {snackBar.message}
    </Wrapper>
  );
};

export default SnackBar;
