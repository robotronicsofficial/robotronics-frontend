// marquees.jsx
import React from "react";
import Marquee from "../component/marquee";

// Import image assets
import logo1 from "../assets/imagesContent/schoollogos/logo1.jpg";
import logo2 from "../assets/imagesContent/schoollogos/logo2.png";
import logo3 from "../assets/imagesContent/schoollogos/logo3.png";
import logo4 from "../assets/imagesContent/schoollogos/logo4.jpg";
import logo5 from "../assets/imagesContent/schoollogos/logo5.png";
import logo6 from "../assets/imagesContent/schoollogos/logo6.jpg";
import logo7 from "../assets/imagesContent/schoollogos/logo7.png";
import logo8 from "../assets/imagesContent/schoollogos/logo8.jpg";
import logo9 from "../assets/imagesContent/schoollogos/logo9.jpg";
import logo10 from "../assets/imagesContent/schoollogos/logo10.jpg";
import logo11 from "../assets/imagesContent/schoollogos/logo11.png";


function Marquees({direction}) {
  var images = [
    [
      logo1,
      logo2,
      logo3,
      // logo4,
      logo5,
      logo6,
      logo7,
      logo8,
      logo9,
      logo10,
      logo11
    ]
  ];

  return (
    <div className=" w-full relative overflow-hidden bg-[#e5ddd9]">
      {images.map((item, index) => (
        <Marquee
          key={index}
          direction={direction}
          imagesurls={item}
        />
      ))}
    </div>
  );
}

export default Marquees;
