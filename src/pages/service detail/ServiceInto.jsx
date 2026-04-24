import React from "react";
import { resolveBackendAssetUrl } from "../../utils/mediaUrl";

const ServiceInto = ({ service }) => {
  const bannerImage = resolveBackendAssetUrl(service?.bannerImage);

  return (
    <div className="hero" id="hero">
      <div
        className="flex-col gap-y-5 min-h-screen flex items-end justify-center p-6 bg-cover bg-center"
        style={{
          backgroundImage: bannerImage ? `url("${bannerImage}")` : undefined,
        }}
      >
        <div className="flex items-center justify-center">
          <div className="bg-muted-foreground/20 backdrop-blur-2xl text-background p-8 w-full max-w-5xl rounded-3xl border border-card/30 shadow-lg leading-none mb-10">
            <div>
              <p className="text-[3vw] md:text-[2vw] font-semibold pb-6">
                {service?.name || "Service"}
              </p>
              <h2 className="text-[5vw] md:text-[4vw] lg:text-[3.5vw] font-bold leading-[1.2] md:leading-[1.3] lg:leading-[1.2] text-wrap">
                {service?.title || "Service details"}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceInto;
