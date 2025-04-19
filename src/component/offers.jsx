import img from "../assets/logo/online-test 1.svg";
import img2 from "../assets/logo/exam 1.svg";
import img3 from "../assets/logo/certification 1.svg";

import logoo1 from "../assets/imagesContent/logos/logoo1.png"
import logoo2 from "../assets/imagesContent/logos/logoo2.png"
import logoo3 from "../assets/imagesContent/logos/logoo3.png"


import { useEffect } from "react";
import Aos from "aos";

const Offers = () => {
  useEffect(() => {
    Aos.init(); // Initialize AOS library
  }, []);

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-5 lg:gap-8 bg-yellow lg:p-10 p-5" 
    data-aos="fade-up" 
    data-aos-duration="2000">
 
 {/* First Card */}
 <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 flex-1" data-aos="fade-up">
   <div className="flex justify-center sm:justify-start">
     <div className="h-24 w-24 sm:h-32 sm:w-32 bg-lightyellow flex items-center justify-center rounded-3xl p-4 lg:p-5">
       <img src={logoo1} alt="Innovations icon" className="w-full h-auto object-contain" />
     </div>
   </div>
   <div className="text-center sm:text-left">
     <h3 className="text-white poppins-bold text-xl sm:text-2xl">
       Innovations
     </h3>
     <p className="text-white poppins-medium text-xs xs:text-sm sm:text-base mt-2 sm:mt-3 max-w-[280px] xs:max-w-none mx-auto sm:mx-0 text-wrap">
       Innovation in robotics refers to the ability to develop new ideas, techniques or technologies that improve or redefine robotic systems.
     </p>
   </div>
 </div>

 {/* Second Card */}
 <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 flex-1" data-aos="fade-up">
   <div className="flex justify-center sm:justify-start">
     <div className="h-24 w-24 sm:h-32 sm:w-32 bg-lightyellow flex items-center justify-center rounded-3xl p-4 lg:p-5">
       <img src={logoo2} alt="Critical Thinking icon" className="w-full h-auto object-contain" />
     </div>
   </div>
   <div className="text-center sm:text-left">
     <h3 className="text-white poppins-bold text-xl sm:text-2xl">
       Critical Thinking
     </h3>
     <p className="text-white poppins-medium text-xs xs:text-sm sm:text-base mt-2 sm:mt-3 max-w-[280px] xs:max-w-none mx-auto sm:mx-0 text-wrap">
       Critical thinking skills in robotics involve analyzing and evaluating problems logically to make informed decisions.
     </p>
   </div>
 </div>

 {/* Third Card */}
 <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 flex-1" data-aos="fade-up">
   <div className="flex justify-center sm:justify-start">
     <div className="h-24 w-24 sm:h-32 sm:w-32 bg-lightyellow flex items-center justify-center rounded-3xl p-4 lg:p-5">
       <img src={logoo3} alt="Problem Solving icon" className="w-full h-auto object-contain" />
     </div>
   </div>
   <div className="text-center sm:text-left">
     <h3 className="text-white poppins-bold text-xl sm:text-2xl">
       Problem Solving
     </h3>
     <p className="text-white poppins-medium text-xs xs:text-sm sm:text-base mt-2 sm:mt-3 max-w-[280px] xs:max-w-none mx-auto sm:mx-0 text-wrap">
       Problem-solving ability in robotics focuses on identifying challenges and developing practical solutions through systematic approaches.
     </p>
   </div>
 </div>
</div>
  );
};

export default Offers;
