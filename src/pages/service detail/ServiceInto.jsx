import React from "react";

const ServiceInto = ({ service }) => {
  // Ensure the image URL is correctly formatted
  const imageUrl = `${import.meta.env.VITE_BACKEND_URL}/${service.sideImage.replace(/\\/g, "/")}`;

  return (
    <div className="hero" id="hero">
      <div
        className="space-y-5 min-h-screen flex items-end justify-center p-6 bg-cover bg-center"
        style={{
          backgroundImage: `url("${imageUrl}")`,
        }}
      >
        <div className="flex items-center justify-center">
          <div className="bg-[#6f6e6b]/20 backdrop-blur-2xl text-white p-8 w-[90vw] md:w-[80vw] rounded-3xl border border-white/30 shadow-lg leading-none mb-10">
            <div>
              <p className="text-[3vw] md:text-[2vw] font-semibold pb-6">
                {service.name}
              </p>
              <h2 className="text-[5vw] md:text-[4vw] lg:text-[3.5vw] font-bold leading-[1.2] md:leading-[1.3] lg:leading-[1.2] text-wrap">
                {service.title}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceInto;
