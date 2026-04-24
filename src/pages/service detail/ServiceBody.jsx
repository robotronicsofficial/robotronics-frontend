import React from "react";
import robo from "../../assets/imagesContent/servicedetailbanner/robo.png";
import { resolveBackendAssetUrl } from "../../utils/mediaUrl";

const ServiceBody = ({ service }) => {
  const goodAtItems = Array.isArray(service?.whatWeAreGoodAt) ? service.whatWeAreGoodAt : [];
  const sideImage = resolveBackendAssetUrl(service?.sideImage, robo);

  return (
    <>
      <div className="grid gap-10 px-6 py-20 lg:grid-cols-2 lg:px-20">
        <div className="flex items-center justify-start">
          <div className="w-full">
            <h2 className="mb-3 text-sm font-bold uppercase text-accent">
              OverView
            </h2>
            <p className="mb-8 max-w-3xl text-wrap text-lg leading-8 lg:text-xl">
              {service?.overview || "Overview coming soon."}
            </p>
            <h2 className="mb-3 text-xl font-bold capitalize text-accent lg:text-2xl">
              What we are good at:
            </h2>
            <ul className="flex flex-col gap-y-3 pl-5 text-wrap text-base text-muted-foreground lg:text-lg">
              {goodAtItems.length > 0 ? goodAtItems.map((item, idx) => (
                <li key={idx}>{item}</li>
              )) : <li>No details available yet.</li>}
            </ul>
          </div>
        </div>
        <div className="aspect-[4/5] overflow-hidden rounded-xl bg-success">
          <img className="h-full w-full object-cover"
            src={sideImage}
            alt="Service Image"
          />
        </div>
      </div>
      <div className="px-6 py-10 lg:px-20">
        <h2 className="mb-10 text-4xl leading-none lg:text-5xl">
          What Makes <br />
          Devsinc Your ERP Partner?
        </h2>
        <div className="aspect-video w-full">
          <img className="w-full h-full object-contain" src={robo} alt="" />
          {/* <img className="w-full h-full object-contain" src={robo} alt="" /> */}
        </div>
      </div>
    </>
  );
};

export default ServiceBody;
