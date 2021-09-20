import styled from "styled-components";

export const Question = styled.h3<{ $isBlack?: boolean }>`
  margin: 0;
  color: ${(props) =>
    props.$isBlack ? props.theme.colors.black : props.theme.colors.blue};
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: 700;
`;

export const SectionHeading = styled.h4`
  margin: 15px 20px 0;
  color: ${(props) => props.theme.colors.black};
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: 700;
`;

export const AnswerOption = styled.div<{ $isSelected: boolean }>`
  display: inline-block;
  width: 160px;
  height: 120px;
  padding: 12px;
  border-radius: 5px;
  background: ${(props) => props.theme.colors.white};
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.15),
    ${(props) =>
      props.$isSelected
        ? `
          inset 0px 0px 0px 2px ${props.theme.colors.blue}
        `
        : `
          inset 0px 0px 0px 1px ${props.theme.colors.grayLight}
        `};
  overflow-y: auto;
  overflow-wrap: break-word;
  white-space: normal;
  cursor: pointer;

  :not(:last-child) {
    margin-right: 10px;
  }
`;

export const PlayerOption = styled.div<{ $isSelected: boolean }>`
  padding: 8px 20px;
  border-radius: 5px;
  background: ${(props) => props.theme.colors.white};
  font-weight: 700;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.15),
    ${(props) =>
      props.$isSelected
        ? `
          inset 0px 0px 0px 2px ${props.theme.colors.blue}
        `
        : `
          inset 0px 0px 0px 1px ${props.theme.colors.grayLight}
        `};
  cursor: pointer;
`;
