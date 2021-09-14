import ReactGA from "react-ga";

export const initializeGoogleAnalytics = (): void => {
  ReactGA.initialize("UA-207607889-1");
};

export const trackPage = (): void => {
  ReactGA.pageview(window.location.pathname + window.location.search);
};
