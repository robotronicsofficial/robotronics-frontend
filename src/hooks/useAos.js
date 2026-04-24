import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import { AOS_OPTIONS } from "../utils/motion";

const useAos = () => {
  const location = useLocation();

  useEffect(() => {
    AOS.init(AOS_OPTIONS);
  }, []);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      AOS.refreshHard();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [location.pathname]);
};

export default useAos;
