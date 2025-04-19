import { useEffect } from "react";
import "aos/dist/aos.css"; // Import CSS for AOS
import Aos from "aos";

const Shopintro = () => {
  useEffect(() => {
    Aos.init(); // Initialize AOS library
  }, []);

  return (
    <>
      <div className="shophero relative w-full" id="shophero">
      </div>
    </>
  );
};
export default Shopintro;