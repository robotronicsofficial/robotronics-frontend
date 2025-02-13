import React from "react";
import robo from "../../assets/imagesContent/servicedetailbanner/robo.png"

const ServiceBody = () => {
  return (
    <>
      <div className=" min-h-[65vw] flex gap-5 p-20">
        <div className="h-[65vw] w-[46vw] flex items-center justify-start">
          <div className="h-[40vw] w-full ">
            <h2 className="text-[#E26400] mb-3 uppercase font-bold text-[1vw]">
              OverView
            </h2>
            <p className="text-wrap text-[1.5vw] leading-8 mb-8 pr-6">
              At Devsinc, we deliver expert Microsoft Dynamics 365 ERP solutions
              that streamline business operations, enhance decision-making, and
              ensure seamless integration across your organization. Our services
              are tailored to unlock maximum efficiency and adaptability,
              driving transformative growth.
            </p>
            <h2 className="text-[#E26400] mb-3 capatalize font-bold text-[1.5vw] ">
              What we are good at:
            </h2>
            <ul className="list-disc pl-5 space-y-3 text-gray-800 text-[1.2vw] text-wrap pr-6">
              <li>
                <span className="font-bold">Workflow Optimization:</span>{" "}
                Simplify complex processes and improve operational efficiency.
              </li>
              <li>
                <span className="font-bold">Data-Driven Insights:</span> Utilize
                advanced analytics to make informed business decisions.
              </li>
              <li>
                <span className="font-bold">Cross-Functional Integration:</span>{" "}
                Achieve seamless connectivity across departments for unified
                operations.
              </li>
              <li>
                <span className="font-bold">Scalable Solutions:</span> Adapt to
                evolving business needs with flexible, enterprise-grade ERP.
              </li>
              <li>
                <span className="font-bold">Custom Implementation:</span> Tailor
                Dynamics 365 to align with your unique organizational goals.
              </li>
            </ul>
          </div>
        </div>
        <div className="h-[65vw] w-[46vw] bg-green-500 rounded-xl overflow-hidden">
          <img
            src="https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83dcf/674878518ecc1a87218c19ac_overview%20image-p-1080.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="min-h-[50vw]  px-20 py-10">
        <h2 className="text-[3vw] leading-none mb-10">
          What Makes <br />
          Devsinc Your ERP Partner?
        </h2>
        <div className="h-[40vw] w-full ">
            <img className="w-full h-full object-contain" src={robo} alt="" />
            {/* <img className="w-full h-full object-contain" src={robo} alt="" /> */}

        </div>
      </div>
    </>
  );
};

export default ServiceBody;
