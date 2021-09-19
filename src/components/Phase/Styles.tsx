import styled from "styled-components";

export const Question = styled.h3<{ $isBlack?: boolean }>`
  margin: 0;
  color: ${(props) =>
    props.$isBlack ? props.theme.colors.black : props.theme.colors.blue};
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: 700;
`;
