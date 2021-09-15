export interface Theme {
  typeface: string;

  colors: {
    black: string;
    venus: string;
    grayDark: string;
    grayLight: string;
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
}

const theme: Theme = {
  typeface: "Inter, sans-serif",
  colors: {
    black: "#323031",
    venus: "#938F8D",
    grayDark: "#999999",
    grayLight: "#CCCCCC",
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
};

export default theme;
