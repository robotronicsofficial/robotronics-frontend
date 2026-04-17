import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="bg-background">
      <div className="flex flex-col h-svh items-center justify-center space-y-10"data-aos="fade-up" data-aos-duration="2000" data-aos-delay="4000">
        <div className="flex flex-row justify-center space-x-5 items-center  ">
          <h1 className=" text-6xl poppins-extrabold text-gray-600">404</h1>
          <h2 className=" text-6xl poppins-extrabold text-gray-600"> Not Found</h2>
        </div>
        <div className="text-center space-y-10" >
          <p className="text-xl poppins-light text-gray-600">
            Your visited page was not found. you may go home page.
            <br />
            <br />
            <Link to="/" className="inline-flex bg-yellow poppins-light rounded-md p-2 text-brown px-10 py-2">
              Back to Home page
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Error;
