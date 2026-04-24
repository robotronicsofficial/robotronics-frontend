import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AOS_OPTIONS } from "../utils/motion";

const useAos = () => {
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;

    const loadAos = async () => {
      const { default: AOS } = await import("aos");

      if (!cancelled) {
        AOS.init(AOS_OPTIONS);
      }
    };

    void loadAos();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      void import("aos").then(({ default: AOS }) => {
        AOS.refreshHard();
      });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [location.pathname]);
};

export default useAos;
