import { useEffect, useState } from "react";

import LeftNav from "./leftNav";
import Intro from "../dashboard/intro";

// import { useNavigate } from "react-router-dom";
// import { FaUserCircle } from "react-icons/fa";
// import PinModal from "./popUps/PinModal"

const UserInfoIntro = () => {
  // const navigate = useNavigate();
  // const [step, setStep] = useState(0);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const [user, setUser] = useState({});
  const [editingField, setEditingField] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  // const [cards, setCards] = useState([]);

  const userData = sessionStorage.getItem("id");

  // const handleHomeClick = () => {
  //   navigate("/"); // Navigate to the home page
  // };

  useEffect(() => {
    if (userData) {
      fetch(`http://localhost:8080/find/${userData}`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data.data);
          setUpdatedData({
            name: data.data.username || "",
            email: data.data.email || "",
            phone: data.data.phone || "",
          });
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, [userData]);

  const handleFieldEdit = (field) => {
    setEditingField(field);
  };

  const handleInputChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleUpdateField = (field) => {
    const fieldValue = updatedData[field];
    // console.log(fieldValue);

    fetch("http://localhost:8080/patchMe", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userData,
        [field]: fieldValue,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.updatedUser) {
          setUser(data.updatedUser);
          setEditingField(null);
          // setIsSuccessModalOpen(true);
        }
      })
      .catch((error) => console.error("Error updating user:", error));
  };


  return (
    <div className="bg-background ">
      {console.log(user)}
      <div>
        <Intro />
      </div>
      <div
        className="lg:flex flex-row"
        data-aos="fade-up"
        data-aos-duration="2000"
        data-aos-delay="4000"
      >
        <div className="lg:w-1/3 w-2/3">
          <LeftNav />
        </div>
        <div className="w-full lg:p-10 p-6">
          <div>
            <p className="text-2xl poppins-bold mb-2">My Info</p>
            <p className="text-xl poppins-light">Contact Details</p>
          </div>
          <form action="">
            {/* Name */}
            <div>
              <ol className="list-reset flex flex-col text-gray-600">
                <div className="py-5 flex flex-col space-y-5">
                  <div>
                    <div className="space-y-5">
                      <p className="text-lightblack poppins-bold">Your Name</p>
                      <div className="flex flex-row poppins-light justify-between">
                        {editingField !== "name" ? (
                          <>
                            <p className="text-lightblack poppins-regular">
                              {user.username}
                            </p>
                            <a
                              className="hover:text-yellow text-brown poppins-bold"
                              href="#"
                              onClick={() => handleFieldEdit("name")}
                            >
                              Edit
                            </a>
                          </>
                        ) : (
                          <>
                            <input
                              type="text"
                              name="name"
                              value={updatedData.name}
                              onChange={handleInputChange}
                              className="text-lightblack poppins-regular"
                            />
                            <button
                              type="button"
                              className="px-4 py-2 bg-yellow-500 text-yellow rounded-md"
                              onClick={() => handleUpdateField("name")}
                            >
                              Save
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="w-full border text-sm border-lin"></div>
                  </div>
                  {/* Email */}
                  <div>
                    <div className="space-y-5">
                      <p className="text-lightblack poppins-bold">Your Email</p>
                      <div className="flex flex-row poppins-light justify-between">
                        {editingField !== "email" ? (
                          <>
                            <p className="text-lightblack poppins-light">
                              {user.email}
                            </p>
                            <a
                              className="hover:text-yellow text-brown font-bold"
                              href="#"
                              onClick={() => handleFieldEdit("email")}
                            >
                              Edit
                            </a>
                          </>
                        ) : (
                          <>
                            <input
                              type="email"
                              name="email"
                              value={updatedData.email}
                              onChange={handleInputChange}
                              className="text-lightblack poppins-regular"
                            />
                            <button
                              type="button"
                              className="px-4 py-2 bg-yellow-500 text-yellow rounded-md"
                              onClick={() => handleUpdateField("email")}
                            >
                              Save
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="w-full border text-sm border-lin"></div>
                  </div>
                  {/* Phone */}
                  <div>
                    <div className="space-y-5">
                      <p className="text-lightblack poppins-bold">
                        Phone Number
                      </p>
                      <div className="flex flex-row poppins-light justify-between">
                        {editingField !== "phone" ? (
                          <>
                            <p className="text-lightblack">{user.phone}</p>
                            <a
                              className="hover:text-yellow text-brown font-bold"
                              href="#"
                              onClick={() => handleFieldEdit("phone")}
                            >
                              Change
                            </a>
                          </>
                        ) : (
                          <>
                            <input
                              type="text"
                              name="phone"
                              value={updatedData.phone}
                              onChange={handleInputChange}
                              className="text-lightblack poppins-regular"
                            />
                            <button
                              type="button"
                              className="px-4 py-2 bg-yellow-500 text-yellow rounded-md"
                              onClick={() => handleUpdateField("phone")}
                            >
                              Save
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="w-full border text-sm border-lin"></div>
                  </div>
                  {/* password */}
                  <div>
                    <div className="space-y-5">
                      <p className="text-lightblack poppins-bold">
                        Password
                      </p>
                      <div className="flex flex-row poppins-light justify-between">
                        {editingField !== "password" ? (
                          <>
                            <p className="text-lightblack">{user.password}</p>
                            <a
                              className="hover:text-yellow text-brown font-bold"
                              href="#"
                              onClick={() => handleFieldEdit("password")}
                            >
                              Change
                            </a>
                          </>
                        ) : (
                          <>
                            <input
                              type="text"
                              name="phone"
                              value={updatedData.password}
                              onChange={handleInputChange}
                              className="text-lightblack poppins-regular"
                            />
                            <button
                              type="button"
                              className="px-4 py-2 bg-yellow-500 text-yellow rounded-md"
                              onClick={() => handleUpdateField("password")}
                            >
                              Save
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="w-full border text-sm border-lin"></div>
                  </div>
                </div>
              </ol>
            </div>
          </form>

          {/* Address Text */}
          <div className="flex flex-row justify-between">
            <p className="text-base poppins-bold lg:text-xl text-brown">
              Parent
            </p>
          </div>

          {/* Cards Section */}
          {/* Cards Section */}
          <div className="flex flex-wrap lg:p-5">
            <div key={user._id} className="w-full md:w-1/2 p-3">
              <div className="flex flex-col space-y-5 bg-white rounded-xl p-5 shadow-lg w-[25vw]">
                <div className="space-y-5">
                  {/* Display user data dynamically from the fetched 'user' object */}
                  <p className="text-lightblack poppins-bold">
                    {user.username}
                  </p>
                  <p className="text-lightblack poppins-bold">{user.email}</p>
                  <p className="text-lightblack poppins-bold">{user.phone}</p>

                  {/* <div className="flex flex-row space-x-5">
                    <button
                      className="text-sm lg:text-base poppins-light border border-lin rounded-lg px-3 py-2"
                      onClick={handleHomeClick}
                    >
                      Home
                    </button>
                    <button className="text-sm lg:text-base poppins-light border border-lin rounded-lg px-3 py-2">
                      Default billing address
                    </button>
                  </div> */}

                  {/* <div className="flex flex-row space-x-5">
                    <a className="text-sm lg:text-base px-3 py-2 poppins-bold cursor-pointer">
                      Remove
                    </a>
                    <a className="text-sm lg:text-base px-3 py-2 poppins-bold cursor-pointer">
                      Edit
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default UserInfoIntro;