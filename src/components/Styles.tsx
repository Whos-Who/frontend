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
