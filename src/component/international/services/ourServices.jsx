// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import robot from "../../../assets/images/IServicesS4.svg"; // Fallback image

// const OurServices = () => {
//   const [services, setServices] = useState([]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch(`${BASE_URL}api/getAllService`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log("Fetched Services:", data);
//         setServices(data.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching services:", error);
//         setError(error.message);
//       });
//   }, []);

//   // Pass the selected service data to the details page
//   const handleNavigate = (service) => {
//     navigate("/serviceDetail", { state: { service } });
//   };

//   return (
//     <div className="OurServices p-20">
//       <div className="container mx-auto">
//         <h2 className="lg:text-6xl md:text-5xl text-4xl text-brown poppins-bold mb-16">
//           Our Services
//         </h2>
//         {error && <p className="text-red-500">Error: {error}</p>}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {services.length > 0 ? (
//             services.map((service) => {
//               const imageUrl = service.thumbnailImage
//                 ? `${BASE_URL}${service.thumbnailImage.replace("\\", "/")}`
//                 : robot;

//               return (
//                 <div
//                   key={service._id}
//                   className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
//                   onClick={() => handleNavigate(service)} // Pass service data
//                 >
//                   <div className="flex justify-center relative">
//                     {/* Black overlay */}
//                     <div className="absolute inset-0 bg-black opacity-40"></div>

//                     {/* Text Content */}
//                     <div className="absolute mt-10 z-10">
//                       <h3 className="text-3xl text-white poppins-regular mb-2 text-wrap text-center">
//                         {service.name}
//                       </h3>
//                     </div>

//                     {/* Background Image */}
//                     <img
//                       className="w-full object-cover"
//                       src={imageUrl}
//                       alt={`Image representing ${service.name}`}
//                     />
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <p className="text-center text-lg">Loading services...</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OurServices;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import robot from "../../../assets/images/IServicesS4.svg"; // Fallback image

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/`;

const OurServices = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false); // State to toggle visibility
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}api/getAllService`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Services:", data);
        setServices(data.data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setError(error.message);
      });
  }, []);

  const handleNavigate = (service) => {
    navigate("/serviceDetail", { state: { service } });
  };

  return (
    <div className="OurServices p-20">
      <div className="container mx-auto">
        <h2 className="lg:text-6xl md:text-5xl text-4xl text-brown poppins-bold mb-16">
          Our Services
        </h2>
        {error && <p className="text-red-500">Error: {error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.length > 0 ? (
            (showAll ? services : services.slice(0, 6)).map((service) => {
              const imageUrl = service.thumbnailImage
                ? `${BASE_URL}${service.thumbnailImage.replace("\\", "/")}`
                : robot;

              return (
                <div
                  key={service._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                  onClick={() => handleNavigate(service)}
                >
                  <div className="flex justify-center relative">
                    <div className="absolute inset-0 bg-black opacity-40 hover:bg-black hover:opacity-20 transition-all duration-100 ease-in-out"></div>
                    <div className="absolute mt-10 z-10">
                      <h3 className="text-3xl text-white poppins-bold mb-2 text-wrap text-center">
                        {service.name}
                      </h3>
                    </div>
                    <img
                      className="w-full object-cover"
                      src={imageUrl}
                      alt={`Image representing ${service.name}`}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-lg">Loading services...</p>
          )}
        </div>

        {/* Show More / Show Less Button */}
        {services.length > 6 && (
          <div className="text-center mt-8">
            <button
              className="bg-brown text-white px-6 py-2 rounded-lg text-lg hover:bg-opacity-80 transition"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OurServices;
