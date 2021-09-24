import React from "react";
import styled from "styled-components";

import SnackBar from "./SnackBar";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const List = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
`;

interface Props {
  snackBars: SnackBar[];
}

const SnackBarsList: React.FC<Props> = function (props) {
  const { snackBars } = props;

  return (
    <Overlay>
      <List>
        {snackBars.map((snackBar) => (
          <SnackBar key={snackBar.id} snackBar={snackBar} />
        ))}
      </List>
    </Overlay>
  );
};
export default SnackBarsList;
