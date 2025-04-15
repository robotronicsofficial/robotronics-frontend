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
      <div className="w-full px-6 sm:px-12 lg:px-24">
  <div className="mx-4">
    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-brown text-center py-6 sm:py-8">
      See what others are achieving through learning
    </h1>
  </div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 lg:px-12 xl:px-24">
  {reviews.map((review, index) => (
    <div
      key={index}
      className="p-4 sm:p-5 lg:p-6 border border-gray-200 rounded-2xl hover:shadow-sm transition-shadow"
    >
      <div className="flex gap-3 sm:gap-4 lg:gap-6">
        <img 
          className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full object-cover self-start"
          src={c5} 
          alt={review.name} 
        />
        <div className="flex-1 flex flex-col gap-1 sm:gap-2">
          <div>
            <p className="text-brown text-sm sm:text-base lg:text-lg font-bold poppins-bold">
              {review.name}
            </p>
            <p className="text-brown text-xs sm:text-sm poppins-regular">
              {review.role}
            </p>
          </div>
          <img 
            className="w-16 sm:w-20 lg:w-24" 
            src={shopStar} 
            alt={`${review.name}'s rating`} 
          />
        </div>
      </div>
      <p className="mt-2 sm:mt-3 text-brown text-xs sm:text-sm lg:text-base text-wrap poppins-regular">
        {review.review}
      </p>
    </div>
  ))}
</div>
      </div>
    </>
  );
};

export default ReviewsComponent;
