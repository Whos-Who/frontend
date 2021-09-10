export interface Theme {
  typeface: string;

  colors: {
    isabelline: string;
    black: string;
  };
}
const theme: Theme = {
  typeface: "Inter",
  colors: {
    isabelline: "#FFF9F5",
    black: "#323031",
  },
};

export default theme;
