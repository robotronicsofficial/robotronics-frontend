// import React from "react";
// import ceo5 from './path/to/ceo5.jpg'; // Replace with the actual path to your image
// import star from './path/to/star.png'; // Replace with the actual path to your star image

import c5 from "../../assets/images/ceo5.svg";

import shopStar from "../../assets/images/shopStar.svg";

const ReviewsComponent = () => {
  const reviews = [
    {
      name: "Ahmed Saimoon",
      role: "CEO, Avito",
      review:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    },
    {
      name: "Ahmed Saimoon",
      role: "CEO, Avito",
      review:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    },
    {
      name: "Ahmed Saimoon",
      role: "CEO, Avito",
      review:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    },
    {
      name: "Ahmed Saimoon",
      role: "CEO, Avito",
      review:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    },
  ];

  return (
    <>
      <div className="bg-[#ebe5e2]">
      <div className="w-full px-24">
        <div className="mx-4 ">
          <h1 className="text-4xl poppins-medium text-brown text-center w-full  py-8">See what others are achieving through learning</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 px-24 ">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="lg:p-5 border border-gray-200 rounded-2xl"
          >
            <div className="flex">
              <img className="lg:p-5" src={c5} alt="CEO" />
              <div className="flex flex-col">
                <p className="text-brown text-sm lg:text-base font-bold poppins-bold">
                  {review.name}
                </p>
                <p className="text-brown text-sm poppins-regular">
                  {review.role}
                </p>
                <img className="" src={shopStar} alt="" />
              </div>
            </div>
            <div>
              <p className="py-2 text-brown lg:text-base text-sm text-wrap poppins-regular">
                {review.review}
              </p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </>
  );
};

export default ReviewsComponent;
