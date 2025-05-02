// import React from "react";

import reviewImg1 from "../../assets/imagesContent/review/ksa.jpg";
import reviewImg2 from "../../assets/imagesContent/review/pak.jpg";
import reviewImg3 from "../../assets/imagesContent/review/uae.jpg";
import reviewImg4 from "../../assets/imagesContent/review/uk.jpg";

import shopStar from "../../assets/images/shopStar.svg";

const ReviewsComponent = () => {
  const reviews = [
    {
      name: "Omar Al Harbi",
      role: "Age 13, UAE",
      image: reviewImg3,
      review:
        "RoboGenius changed the way I learn! The coding lessons are super fun, and I love collecting certificates after completing each module. The quizzes keep me on my toes, and I’m already building small robotics projects at home!",
    },
    {
      name: "Ahmed Mansoor",
      role: "Age 12, Lahore",
      image: reviewImg2,
      review:
        "I joined the Pro Plan and it was totally worth it. I can attend webinars, access so many courses, and get help through live chat whenever I'm stuck. Plus, the PRO badge makes me feel like a real tech genius!",
    },
    {
      name: "Nasser Al Shammari",
      role: "Age 9, KSA",
      image: reviewImg1,
      review:
        "The RoboGenius platform is just like Netflix but for learning! I’ve completed courses on AI and E-commerce, and I even helped my dad set up his online store. The platform is easy to use on my tablet too!",
    },
    {
      name: "Oliver Bennett",
      role: "Age 10, UK",
      image: reviewImg4,
      review:
        "I love RoboGenius because it makes learning feel like a game. The videos are fun and the projects are cool. My parents can even see my progress from their dashboard — they’re so proud of me!",
    },
  ];

  return (
    <div className="bg-[#ebe5e2]">
      <div className="w-full px-6 sm:px-12 lg:px-24">
        <div className="mx-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-brown text-center py-6 sm:py-8 poppins-bold">
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
                src={review.image}
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
  );
};

export default ReviewsComponent;
