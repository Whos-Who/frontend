export interface Theme {
  typeface: string;

  colors: {
    isabelline: string;
    black: string;
    gray: string;
    terraCotta: string;
    emerald: string;
    blue: string;
    rose: string;
    white: string;
  };
}

const theme: Theme = {
  typeface: "Inter",
  colors: {
    isabelline: "#FFF9F5",
    black: "#323031",
    gray: "#938F8D",
    terraCotta: "#E26D5A",
    emerald: "#62C370",
    blue: "#6665DD",
    rose: "#C98686",
    white: "#FFFFFF",
  },
};

export default theme;
