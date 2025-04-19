// import { AiOutlineRight } from 'react-icons/ai';  // Import the slimmer icon

// const CourseDescription = () => {
//   return (
//     <div className="bg-background lg:px-24 py-5  ">
//       <div className="bg-white p-8 py-10 shadow-xl rounded-md">
//         {/* Course Description */}
//         <div className="py-5">
//           <h1 className="font-bold text-xl">Course Description</h1>
//           <p className=" text-wrap text-lightblack">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue
//             semper turpis, ac viverra velit tristique vitae. Sed vel felis ac
//             neque euismod rutrum. Donec vulputate, lectus at tristique suscipit,
//             ligula velit cursus purus, in condimentum metus dolor in urna. Donec
//             at turpis vel nunc aliquet iaculis. Sed congue semper turpis, ac
//             viverra velit tristique vitae. Sed vel felis ac neque euismod
//             rutrum.
//           </p>
//         </div>
//         {/* Learn  */}
//         <div className="flex flex-row justify-between">
//           {/* left */}
//           <div className="space-y-4 flex-1">
//             <h1 className="text-xl font-bold">
//               What you will learn in this course?
//             </h1>
//             <p className="text-lightblack text-wrap">
//               Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//               eiusmod tempor incididunt ut labore et dolore magna aliqua Quis
//               ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
//               accumsan.
//             </p>
//             <p className="text-lightblack text-wrap">
//               Morem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//               eiusmod tempor incididunt ut labore et dolore magna aliquaQuis
//               ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
//               accumsan.Dorem ipsum dolor sit amet, consecteturadipiscing elit,
//               sed do eiusmod tempor{" "}
//             </p>
//           </div>
//           {/* right */}
//           <div className="flex-1 py-10 space-y-5 ">
//             <div className="flex flex-row space-x-5 items-center">
//               <div className=" bg-yellow  rounded-full h-4 w-4  " >
//               <p className="text-center items-center"> <AiOutlineRight/> </p>
//               </div>
//               <p className="text-xl font-bold">
//                 Work with Color & Gradient & Grid
//               </p>
//             </div>
//             <div className="flex flex-row space-x-5 items-center">
//               <div className=" bg-yellow  rounded-full h-4 w-4  " >
//               <p className="text-center items-center"> <AiOutlineRight/>  </p>
//               </div>
//               <p className="text-xl font-bold">
//                 Work with Color & Gradient & Grid
//               </p>
//             </div>
//             <div className="flex flex-row space-x-5 items-center">
//               <div className=" bg-yellow  rounded-full h-4 w-4  " >
//               <p className="text-center items-center">  <AiOutlineRight/>  </p>
//               </div>
//               <p className="text-xl font-bold">
//                 Work with Color & Gradient & Grid
//               </p>
//             </div>
//             <div className="flex flex-row space-x-5 items-center">
//               <div className=" bg-yellow  rounded-full h-4 w-4  " >
//               <p className="text-center items-center">  <AiOutlineRight/>  </p>
//               </div>
//               <p className="text-xl font-bold">
//                 Work with Color & Gradient & Grid
//               </p>
//             </div>
//           </div>
//         </div>
//         {/* card */}
//         <div className='p-5 rounded-md shadow-md' >
//         </div>
//       </div>
//     </div>
//   );
// };
// export default CourseDescription;

import { AiOutlineRight } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { TiMediaRecord } from "react-icons/ti";
import { IoLockClosedSharp } from "react-icons/io5";
import ReviewsComponent from "../../../pages/RoboGenius/Robogeniusreview";

const CourseDescription = () => {
  return (
    <>
    <div className="bg-background lg:px-24 py-8 rounded-3xl">
      <div
        className="bg-white p-8 py-10 shadow-xl rounded-md"
        data-aos="fade-up"
        data-aos-duration="2000"
        data-aos-delay="4000"
      >
        {/* Course Description */}
        <div className="py-5">
          <h1 className="font-bold text-xl mb-4">Course Description</h1>
          <p className="text-wrap text-lightblack">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue
            semper turpis, ac viverra velit tristique vitae. Sed vel felis ac
            neque euismod rutrum. Donec vulputate, lectus at tristique suscipit,
            ligula velit cursus purus, in condimentum metus dolor in urna. Donec
            at turpis vel nunc aliquet iaculis. Sed congue semper turpis, ac
            viverra velit tristique vitae. Sed vel felis ac neque euismod
            rutrum.
          </p>
        </div>
        {/* Learn */}
        <div className="lg:flex flex-row flex-wrap justify-between gap-8 ">
          {/* left */}
          <div className="space-y-4 flex-1 ">
            <h1 className="text-xl font-bold">
              What you will learn in this course?
            </h1>
            <p className="text-lightblack text-wrap">
              Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
              accumsan.
            </p>
            <p className="text-lightblack text-wrap">
              Morem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliquaQuis
              ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
              accumsan.Dorem ipsum dolor sit amet, consecteturadipiscing elit,
              sed do eiusmod tempor
            </p>
          </div>
          {/* right */}
          <div className="flex-1 py-10 space-y-8">
            <div className="flex flex-row space-x-5 items-center">
              <div className="bg-yellow rounded-full h-4 w-4 flex items-center justify-center">
                <AiOutlineRight className="text-white text-xs" />
              </div>
              <p className="text-xl font-bold">
                Work with Color & Gradient & Grid
              </p>
            </div>
            <div className="flex flex-row space-x-5 items-center">
              <div className="bg-yellow rounded-full h-4 w-4 flex items-center justify-center">
                <AiOutlineRight className="text-white text-xs" />
              </div>
              <p className="text-xl font-bold">
                Work with Color & Gradient & Grid
              </p>
            </div>
            <div className="flex flex-row space-x-5 items-center">
              <div className="bg-yellow rounded-full h-4 w-4 flex items-center justify-center">
                <AiOutlineRight className="text-white text-xs" />
              </div>
              <p className="text-xl font-bold">
                Work with Color & Gradient & Grid
              </p>
            </div>
            <div className="flex flex-row space-x-5 items-center">
              <div className="bg-yellow rounded-full h-4 w-4 flex items-center justify-center">
                <AiOutlineRight className="text-white text-xs" />
              </div>
              <p className="text-xl font-bold">
                Work with Color & Gradient & Grid
              </p>
            </div>
          </div>
        </div>
        {/* Course Sections */}
        <div className="bg-gray-100 bg-pin ">
          <div className="space-y-4">
            <div
              className="p-5 bg-white rounded-md mb-12"
              style={{
                boxShadow:
                  "0 4px 6px rgba(0, 0, 0, 0.1), 0 -4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="flex justify-between items-center ">
                <div className="flex items-center space-x-2">
                  {/* <AiOutlineRight className="text-yellow" /> */}
                  <p className="text-wrap font-bold mb-4">
                    Section 1: Introduction to Emotional Boundaries
                  </p>
                </div>
                <div className="flex gap-12">
                  <p className="text-yellow">Demo</p>
                  <p>06:48</p>
                </div>
              </div>
              <div className="mt-2 space-y-6 text-gray-700  ">
              <div className="flex justify-between items-center space-x-2">
                  <div className="flex items-center  ">
                    <div className="flex items-center gap-2">
                      <TiMediaRecord className="text-yellow text-base" />
                      <p className="text-sm leading-none">
                       <span className="font-bold mr-2">
                        Video Section : 
                       </span>
                        Introduction to Emotional Boundaries
                      </p>
                    </div>
                  </div>
                  <span className="text-yellow text-sm">View Here</span>
                </div>
                <div className="flex justify-between items-center space-x-2">
                  <div className="flex items-center  ">
                    <div className="flex items-center gap-2">
                      <TiMediaRecord className="text-yellow text-base" />
                      <p className="text-sm leading-none">
                      <span className="font-bold mr-2">
                        Section Book : 
                       </span>
                        Introduction to Emotional Boundaries
                      </p>
                    </div>
                  </div>
                  <span className="text-yellow text-sm">Download Here</span>
                </div>
                <div className="flex justify-between items-center space-x-2">
                  <div className="flex items-center  ">
                    <div className="flex items-center gap-2">
                      <TiMediaRecord className="text-yellow text-base" />
                      <p className="text-sm leading-none">
                      <span className="font-bold mr-2">
                        PDF : 
                       </span>
                        Introduction to Emotional Boundaries
                      </p>
                    </div>
                  </div>
                  <span className="text-yellow text-sm">Download PDF</span>
                </div>
                <div className="flex justify-between items-center space-x-2">
                  <div className="flex items-center  ">
                    <div className="flex items-center gap-2">
                      <TiMediaRecord className="text-yellow text-base" />
                      <p className="text-sm leading-none">
                      <span className="font-bold mr-2">
                        Quiz : 
                       </span>
                        Introduction to Emotional Boundaries
                      </p>
                    </div>
                  </div>
                  <span className="text-yellow text-sm">Start Quiz</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-[#F0F0F0] rounded-md shadow-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                <p className="text-wrap font-bold ">
                    Section 2: Introduction to Emotional Boundaries
                  </p>
                </div>
                <div className="flex items-center gap-6">

                <p>04:11</p>
                <IoLockClosedSharp  className="text-yellow"/>
                </div>
              </div>
            </div>
            <div className="p-4 bg-[#F0F0F0] rounded-md shadow-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                <p className="text-wrap font-bold ">
                    Section 3: Introduction to Emotional Boundaries
                  </p>
                </div>
                <div className="flex items-center gap-6">

                <p>04:11</p>
                <IoLockClosedSharp  className="text-yellow"/>
                </div>
              </div>
            </div>
            <div className="p-4 bg-[#F0F0F0] rounded-md shadow-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                <p className="text-wrap font-bold ">
                    Section 4: Introduction to Emotional Boundaries
                  </p>
                </div>
                <div className="flex items-center gap-6">

                <p>04:11</p>
                <IoLockClosedSharp  className="text-yellow"/>
                </div>
              </div>
            </div>
            <div className="p-4 bg-[#F0F0F0] rounded-md shadow-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                <p className="text-wrap font-bold ">
                    Section 5: Introduction to Emotional Boundaries
                  </p>
                </div>
                <div className="flex items-center gap-6">

                <p>04:11</p>
                <IoLockClosedSharp  className="text-yellow"/>
                </div>
              </div>
            </div>
            <div className="p-4 bg-[#F0F0F0] rounded-md shadow-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                <p className="text-wrap font-bold ">
                    Section 6: Introduction to Emotional Boundaries
                  </p>
                </div>
                <div className="flex items-center gap-6">

                <p>04:11</p>
                <IoLockClosedSharp  className="text-yellow"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Upload Your Project */}
      </div>
    </div>
      <ReviewsComponent/>
    </>
  );
};

export default CourseDescription;
