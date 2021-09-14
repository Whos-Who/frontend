import React from "react";

import PrimaryLogo from "../assets/PrimaryLogo.svg";
import SecondaryLogo from "../assets/SecondaryLogo.svg";

interface Props {
  width: number;
  height: number;
  primary?: boolean;
}

const Logo: React.FC<Props> = (props: Props) => {
  const { width, height, primary } = props;

  if (primary) {
    return <img src={PrimaryLogo} width={width} height={height} />;
  } else {
    return <img src={SecondaryLogo} width={width} height={height} />;
  }
};

export default Logo;
