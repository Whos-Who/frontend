import { useEffect } from "react";
import ReactGA from "react-ga";

export const initializeGoogleAnalytics = (): void => {
  useEffect(() => {
    ReactGA.initialize("UA-207607889-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
};

export const useTrackPage = (): void => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });
};
