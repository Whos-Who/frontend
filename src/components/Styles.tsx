import styled from "styled-components";

export const StyledInput = styled.input.attrs({
  type: "text",
})`
  width: 100%;
  margin-bottom: 10px;
  padding: 8px 0;
  border: 1px solid ${(props) => props.theme.colors.grayLight};
  border-radius: 3px;
  background: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};
  font-family: ${(props) => props.theme.typeface};
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: 500;
  text-align: center;

  ::placeholder {
    color: ${(props) => props.theme.colors.grayLight};
  }
`;

export const StyledPasswordInput = styled.input.attrs({
  type: "password",
})`
  width: 100%;
  margin-bottom: 10px;
  padding: 8px 0;
  border: 1px solid ${(props) => props.theme.colors.grayLight};
  border-radius: 3px;
  background: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};
  font-family: ${(props) => props.theme.typeface};
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: 500;
  text-align: center;

  ::placeholder {
    color: ${(props) => props.theme.colors.grayLight};
  }
`;

export const GameHeader = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.grayLighter};
  background: ${(props) => props.theme.colors.white};
`;

export const GameMain = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

export const GameFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px 30px 10px;
  border-top: 1px solid ${(props) => props.theme.colors.grayLighter};
  background: ${(props) => props.theme.colors.white};
`;
