import React from "react";
import ReactLoading from "react-loading";
import styled, { useTheme } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  text-align: center;
`;

const Loader: React.FC = function () {
  const theme = useTheme();

  return (
    <Wrapper>
      <ReactLoading
        type="spin"
        height={20}
        width={20}
        color={theme.colors.grayDark}
      />
    </Wrapper>
  );
};

export default Loader;
