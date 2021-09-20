export interface Theme {
  typeface: string;

  colors: {
    black: string;
    venus: string;
    grayDark: string;
    grayLight: string;
    grayLighter: string;
    isabelline: string;
    white: string;
    terraCotta: string;
    terraCottaDark: string;
    emerald: string;
    emeraldDark: string;
    blue: string;
    blueDark: string;
    rose: string;
  };

  fontSizes: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };

  fontWeights: {
    light: string;
    regular: string;
    bold: string;
  };
}

const theme: Theme = {
  typeface: "Inter, sans-serif",
  colors: {
    black: "#323031",
    venus: "#938F8D",
    grayDark: "#999999",
    grayLight: "#CCCCCC",
    grayLighter: "#E6E6E6",
    isabelline: "#FFF9F5",
    white: "#FFFFFF",
    terraCotta: "#E26D5A",
    terraCottaDark: "#DA472F",
    emerald: "#62C370",
    emeraldDark: "#42AD52",
    blue: "#6665DD",
    blueDark: "#3C3BD4",
    rose: "#C98686",
  },
  fontSizes: {
    sm: "0.83em",
    md: "1em",
    lg: "1.2em",
    xl: "1.44em",
    xxl: "2.99em",
  },

  fontWeights: {
    light: "300",
    regular: "500",
    bold: "700",
  },
};

export default theme;
